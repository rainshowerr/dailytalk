const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const User = require('../models/user');
const Post = require('../models/post');

router.get('/profile', isLoggedIn, async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.user.id },
			attributes: ['email', 'nick'],
		});
		if (user) {
			res.json({ user });
		} else {
			res.status(404).send('no user');
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.post('/write', isLoggedIn, async (req, res, next) => {
	const { title, content } = req.body;
	try {
		const post = await Post.create({
			UserId: req.user.id,
			title,
			content,
		});
		res.json(post);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/post/:id', async (req, res, next) => {
	const id = req.params.id;
	console.log('아이디: ', req.params.id);
	try {
		const post = await Post.findOne({
			where: { id },
			attributes: ['title', 'content', 'createdAt'],
			include: [
				{
					model: User,
					attributes: ['nick'],
				},
			],
		});
		console.log(post);
		res.json(post);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/', (req, res) => {
	res.send('HOME');
});

module.exports = router;
