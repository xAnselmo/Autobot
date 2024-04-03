const axios = require("axios");

module.exports.config = {
	name: "sim",
	version: "1",
	hasPermission: 0,
	credits: "Grey",
	description: "Simsimi",
	usePrefix: false,
   usages: "Message",
	commandCategory: "...",
	cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
	try {
		let message = args.join(" ");
		if (!message) {
			return api.sendMessage(`Please put Message`, event.threadID, event.messageID);
		}

		const typingStatus = await api.sendMessage("𝗣𝗨𝗧𝗔𝗡𝗚 𝗜𝗡𝗔 𝗡𝗚 𝗔𝗟𝗔𝗚𝗔 𝗠𝗢𝗡𝗚 𝗔𝗦𝗢🖕😊", event.threadID);
		
		const response = await axios.get(`http://fi1.bot-hosting.net:6378/sim?query=${message}`);
		const respond = response.data.respond;

		setTimeout(() => {
			api.sendMessage(respond, event.threadID, () => {
				api.unsendMessage(typingStatus.messageID);
			});
		}, 2000);
		
	} catch (error) {
		console.error("An error occurred:", error);
		api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
	}
}; 