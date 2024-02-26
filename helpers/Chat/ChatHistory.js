function addToChatHistory(role, message, chatHistory, improvedQuery) {
  switch (role) {
    case "human":
      chatHistory.push([role, message, improvedQuery]);
      break;
    case "ai":
      chatHistory.push([role, message]);
      break;
  }
  return chatHistory;
}

export default addToChatHistory;
