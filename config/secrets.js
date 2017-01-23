//This is where we extract all our secrets and environment variables.
module.exports = {
	db: process.env.MONGODB || process.env.MONGODB_URL,

	TOKEN_SECRET: process.env.TOKEN_SECRET
};