const getFirstSentence = (text) => {
  const regex = /.*?(\.)(?=\s[A-Z])/;
  return text.length > 0 ? regex.exec(text) : "";
};

const serialize = (data) => JSON.parse(JSON.stringify(data));

export { getFirstSentence, serialize };
