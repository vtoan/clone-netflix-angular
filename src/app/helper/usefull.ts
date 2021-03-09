export function copyObject(src) {
  let json = JSON.stringify(src);
  return JSON.parse(json);
}
