export function getFirstSentence(text) {
  const regex = /.*?(\.)(?=\s[A-Z])/;
  return text.length ? regex.exec(text) : "";
}

export function serialize(data) {
  return JSON.parse(JSON.stringify(data));
}
