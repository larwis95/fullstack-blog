const User = require('./user');
const BlogPost = require('./blogpost');
const Comments = require('./comments');

User.hasMany(BlogPost, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'userId'
});

BlogPost.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(BlogPost, {
    foreignKey: 'post_id'
});

Comments.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, BlogPost, Comments };