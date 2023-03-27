const errorsGenerator = (array) => {
  return array.map((e) => {
    return {
      msg: e,
    };
  });
};

export default errorsGenerator;
