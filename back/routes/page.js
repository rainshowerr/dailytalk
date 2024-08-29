const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

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
		res.json(post);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/page/:id', async (req, res, next) => {
	try {
		const id = parseInt(req.params.id);
		const limit = 10; // 한 페이지에 보여줄 게시글 수
		const offset = (id - 1) * limit;

		const posts = await Post.findAll({
			order: [['createdAt', 'DESC']],
			attributes: ['id', 'title', 'createdAt'],
			include: [
				{
					model: User,
					attributes: ['nick'],
				},
			],
			limit: limit,
			offset: offset,
		});
		res.json(posts);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.post('/post/:id/comment', async (req, res, next) => {
	try {
		const comment = await Comment.create({
			UserId: req.user.id,
			PostId: req.params.id,
			content: req.body.content,
		});
		res.json(comment);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/post/:id/comment', async (req, res, next) => {
	const postId = req.params.id;
	try {
		const comments = await Comment.findAll({
			where: { PostId: postId },
			include: {
				model: User,
				attributes: ['nick'],
			},
		});
		res.json(comments);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;
