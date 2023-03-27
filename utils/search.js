const Search = (queryData, paramName, value) => {
  const data = JSON.parse(JSON.stringify(queryData));
  const search = data.filter((e) => e[paramName].includes(value));
  return search;
};

export default Search;
