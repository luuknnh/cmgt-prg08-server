let llmOutput;

export function get() {
  return llmOutput;
}
export function set(value) {
  llmOutput = value;
}

export default {
  get,
  set,
};
