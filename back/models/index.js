const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Likes = require('./likes');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Likes = Likes;
db.Comment = Comment;

User.init(sequelize);
Post.init(sequelize);
Likes.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Post.associate(db);
Likes.associate(db);
Comment.associate(db);

module.exports = db;
