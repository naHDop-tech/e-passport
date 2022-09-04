// Create a random ID
export function generateUEID() {
  const first = (Math.random() * 46656) | 0;
  const second = (Math.random() * 46656) | 0;
  const third = ('000' + first.toString(36)).slice(-3);
  const fourth = ('000' + second.toString(36)).slice(-3);

  return third + fourth;
}