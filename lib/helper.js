export const getFirstSentence = (text) => {
  const regex = /.*?(\.)(?=\s[A-Z])/;
  return text.length > 0 ? regex.exec(text) : "";
};
