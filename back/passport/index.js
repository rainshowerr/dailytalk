const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
	passport.serializeUser((user, done) => {
		console.log('serializeUser 호출');
		done(null, user.id); // user id만 추출
	});
	passport.deserializeUser((id, done) => {
		console.log('deserializeUser 호출');
		User.findOne({
			where: { id },
		})
			.then((user) => done(null, user)) // req.user 등록
			.catch((err) => done(err));
	});
	local();
};
