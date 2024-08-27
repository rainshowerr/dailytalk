exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		// 패스포트 통해서 로그인 했니
		next();
	} else {
		res.status(403).send('로그인이 필요합니다.');
	}
};

exports.isNotLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		// 패스포트 통해서 로그인 했니
		next();
	} else {
		res.json({
			message: '이미 로그인한 상태입니다.',
		});
	}
};
