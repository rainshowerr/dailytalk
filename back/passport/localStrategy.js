const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { Strategy: LocalStrategy } = require('passport-local');

module.exports = () => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email', // req.body.email
				passwordField: 'password', // req.body.password
				passReqToCallback: false, // 리퀘스트 필요없음
			},
			async (email, password, done) => {
				try {
					const exUser = await User.findOne({ where: { email } });
					if (exUser) {
						const result = await bcrypt.compare(password, exUser.password);
						// db의 패스워드와 일치한다면
						if (result) {
							done(null, exUser); // done(서버실패, 성공유저, 로직실패)
						} else {
							done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
						}
					} else {
						done(null, false, { message: '가입하지 않은 회원입니다.' });
					}
				} catch (error) {
					console.error(error);
					done(error);
				}
			}
		)
	);
};
