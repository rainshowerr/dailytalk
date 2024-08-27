const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const User = require('../models/user');

router.post('/join', isNotLoggedIn, async (req, res, next) => {
	const { email, nick, password } = req.body;
	try {
		const exUser = await User.findOne({ where: { email } });
		if (exUser) {
			return res.json({
				result: 'fail',
				message: '이미 존재하는 회원입니다.',
			});
		}
		const hash = await bcrypt.hash(password, 12);
		const new_user = await User.create({
			email,
			nick,
			password: hash,
		});
		return res.json({
			result: 'success',
			message: '회원가입 되었습니다',
			userId: new_user.id,
		});
	} catch (err) {
		console.error(err);
		next(err);
	}
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
	// done이 호출되면 이부분으로 옴
	passport.authenticate('local', (authError, user, info) => {
		if (authError) {
			// 서버실패
			console.error(authError);
			next(authError);
		}
		if (!user) {
			// 로직실패
			return res.json({
				result: 'fail',
				message: '로그인 실패',
			});
		}
		return req.login(user, (loginError) => {
			// 로그인 성공
			if (loginError) {
				// 혹시 로그인 과정에서 에러가 나는 경우
				console.error(loginError);
				return next(loginError);
			}
			return res.json({
				result: 'success',
				message: '로그인 성공',
				userId: user.id,
			});
		});
	})(req, res, next);
}); // 미들웨어 확장패턴)

router.post('/logout', (req, res, next) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		} else {
			req.session.destroy();
			res.clearCookie('connect.sid', { secure: false, httpOnly: false });
			res.json({
				result: 'success',
				message: '로그아웃 되었습니다',
			});
		}
	});
});

module.exports = router;
