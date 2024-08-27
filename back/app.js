const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { sequelize } = require('./models');
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');
const cors = require('cors');

dotenv.config();

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/page');

const passportConfig = require('./passport');

const app = express();
app.set('port', process.env.PORT || 4000);

passportConfig();

sequelize
	.sync({ force: false })
	.then(() => {
		console.log('데이터베이스 연결 성공');
	})
	.catch((err) => {
		console.error(err);
	});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // json 요청을 req.body에 담음
app.use(express.urlencoded({ extended: false })); // form 요청을 req.body에 담음
app.use(cookieParser(process.env.COOKIE_SECRET)); // { connect.sid: 12321324 }
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.COOKIE_SECRET,
		cookie: {
			httpOnly: false,
			secure: false,
		},
	})
);
app.use(passport.initialize()); // req.user req.login req.isAuthenticate req.logout
app.use(
	passport.session({
		cookie: { secure: false, httpOnly: false },
	})
); // connect.sid라는 이름으로 세션 쿠키가 브라우저로 전송
app.use(
	cors({
		origin: '*',
		credentials: true,
	})
);

app.use('/auth', authRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		error: process.env.NODE_ENV !== 'production' ? err : {},
	});
});

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 대기중');
});
