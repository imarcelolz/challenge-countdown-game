export function randomChars(count) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const charsLength = chars.length;

  let result = '';
  for ( let i = 0; i < count; i++ ) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }

  return result;
}
