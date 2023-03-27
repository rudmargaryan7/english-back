import errorsGenerator from "./../../utils/errorsGenerator.js";
import User from "../../modules/User.js";
import Quizes from "../../modules/Quizes.js";
import Ongoing from "../../modules/Ongoing.js";
import Course from "../../modules/Course.js";
import Lesson from "../../modules/Lesson.js";

const levelsArray = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const defaultTestUpdate = async (req, res) => {
  const { level } = req.body;
  const { user } = req;
  if (user.isLevelCompleted) {
  return res.status(200).send({ updated: false });
}
  try {
    await User.findOneAndUpdate(
      { mail: user.mail },
      {
        level,
        isLevelCompleted: true,
      }
    );
  } catch (error) {
    return res.status(400).send(error);
  }
  return res.status(200).send({ updated: true });
};

export const getDefaultTest = async (req, res) => {
  try {
    const data = await Quizes.find({ type: "user" });
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getCourseWithProgress = async (courseId, userId) => {
  const ongoing = await Ongoing.findOne({ courseId, userId });
  const course = await Course.findById(courseId);
  if (!ongoing) {
    return { course, progress: 0, isPassed: false };
  }
  const courseLessons = await Lesson.find({ courseId });
  const lessonsIds = courseLessons.map((e) => e._id);
  const prsent = 100 / lessonsIds.length;
  const passedLessonLength = lessonsIds.filter((e) =>
    ongoing.passedLessonsIds.includes(e)
  );
  return {
    course: course,
    progress: Math.floor(prsent * passedLessonLength.length),
    isPassed: ongoing.isPassed,
  };
};

export const passLesson = async (req, res) => {
  const { courseId, lessonId } = req.params;
  const { user } = req;
  try {
    const isHaveOngoindCourse = await Ongoing.findOne({
      userId: user._id,
      courseId,
    });
    const course = await Course.findById(courseId);
    if (isHaveOngoindCourse) {
      await Ongoing.findOneAndUpdate(
        { courseId, userId: user._id },
        {
          passedLessonsIds: [...isHaveOngoindCourse.passedLessonsIds, lessonId],
        }
      );
      const oldVersion = await getCourseWithProgress(courseId, user._id);
      if (oldVersion.progress === 100 && !oldVersion.isPassed) {
        if (
          course.level !== "None" &&
          levelsArray.indexOf(course.level) > levelsArray.indexOf(user.level)
        ) {
          await User.findOneAndUpdate(
            { _id: user._id },
            {
              level: course.level,
            }
          );
        }
        await Ongoing.findOneAndUpdate(
          { courseId, userId: user._id },
          {
            isPassed: true,
          }
        );
      }
      return res
        .status(200)
        .send({ data: await getCourseWithProgress(courseId, user._id) });
    }
    await Ongoing.create({
      userId: user._id,
      courseId,
      passedLessonsIds: [lessonId],
    });
    const oldVersion = await getCourseWithProgress(courseId, user._id);
    if (oldVersion.progress === 100 && !oldVersion.isPassed) {
      if (
        course.level !== "None" &&
        levelsArray.indexOf(course.level) > levelsArray.indexOf(user.level)
      ) {
        await User.findOneAndUpdate(
          { _id: user._id },
          {
            level: course.level,
          }
        );
      }
      await Ongoing.findOneAndUpdate(
        { courseId, userId: user._id },
        {
          isPassed: true,
        }
      );
    }
    return res
      .status(200)
      .send({ data: await getCourseWithProgress(courseId, user._id) });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getAllCourses = async (req, res) => {
  const { user } = req;
  try {
    const allCourses = JSON.parse(JSON.stringify(await Course.find()));
    const returnArray = [];
    for (const course of allCourses) {
      const item = await getCourseWithProgress(course._id, user._id);
      returnArray.push(item);
    }
    return res.status(200).send({ data: returnArray });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getCourseWithLessons = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    const allCoursesLessons = await Lesson.find({ courseId: id });
    const ongoing = await Ongoing.findOne({ userId: user._id, courseId: id });
    const lessons = [];
    const courseWithProgress = await getCourseWithProgress(id, user._id);

    // if (!ongoing) {
    //   return res.status(200).send({
    //     course: courseWithProgress,
    //     lessons: allCoursesLessons,
    //   });
    // }
    for (const less of allCoursesLessons) {
      lessons.push({
        ...JSON.parse(JSON.stringify(less)),
        passed: ongoing ? !!ongoing.passedLessonsIds.includes(less._id) : false,
      });
    }
    return res.status(200).send({ ...courseWithProgress, lessons });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getCourseLessonWithTest = async (req, res) => {
  const { id, lessonId } = req.params;
  const { user } = req;
  try {
    const lesson = await Lesson.findOne({ courseId: id, _id: lessonId });
    const ongoing = await Ongoing.findOne({ userId: user._id, courseId: id });
    const quizes = await Quizes.find({ lessonId });
    return res.status(200).send({
      lesson: {
        ...JSON.parse(JSON.stringify(lesson)),
        passed: ongoing
          ? !!ongoing.passedLessonsIds.includes(lesson._id)
          : false,
      },
      test: quizes,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getUserOngoingCourses = async (req, res) => {
  try {
    const { user } = req;
    const ongoingsArray = await Ongoing.find({ userId: user._id });
    const returnArray = [];
    for (const item of ongoingsArray) {
      const progress = await getCourseWithProgress(item.courseId, user._id);
      returnArray.push({
        ...JSON.parse(JSON.stringify(progress)),
      });
    }
    return res.status(200).send(returnArray);
  } catch (error) {
    return res.status(400).send(error);
  }
};
