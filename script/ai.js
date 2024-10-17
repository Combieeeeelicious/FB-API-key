const axios = require('axios');

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  hasPermission: 0,
  usePrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usages: "ai [prompt]",
  credits: 'JamesAi',
  cooldowns: 3,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');


  if (!input) {
    return api.sendMessage(
      "Please provide prompt",
      event.threadID,
      event.messageID
    );
  }

  api.sendMessage("🔄 Generating...", event.threadID, event.messageID);
  try {
    
    const { data } = await axios.get('https://lorex-gpt4.onrender.com/api/gpt4', {
      params: {
        prompt: input,
        uid: event.senderID
      }
    });

    
    if (data && data.response) {
      const responseMessage = `{data.response}`;
      return api.sendMessage(responseMessage, event.threadID, (err) => {
        if (err) {
          console.error("Error sending message:", err);
        }
      }, event.messageID);
    } else {
      return api.sendMessage("Unexpected response format from the API.", event.threadID, event.messageID);
    }

  } catch (error) {
   
    console.error("Error processing request:", error.message || error);
    api.sendMessage("An error occurred while processing your request. Please try again", event.threadID, event.messageID);
  }
};
