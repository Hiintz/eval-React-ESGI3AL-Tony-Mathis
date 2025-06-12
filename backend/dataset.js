const User = require('./model/user.model.js');
const Posts = require('./model/post.model.js');

const bcrypt = require('bcrypt');


const dataset = async () => {
    // Jeu de données User
    await User.create({
        email: "admin@admin.com",
        password: bcrypt.hashSync('12345', 10),
        nickname: "Admin"
    });
    await User.create({
        email: "user1@user1.com",
        password: bcrypt.hashSync('12345', 10),
        nickname: "User1"
    });
    await User.create({
        email: "user2@user2.com",
        password: bcrypt.hashSync('12345', 10),
        nickname: "User2"
    });

    // Jeu de données Posts
    await Posts.create({
        message: "Hello World!",
        authorId: 3
    });
    await Posts.create({
        message: "This is a test post.",
        authorId: "2"
    });
    await Posts.create({
        messge: "Another post for testing.",
        authorId: 1
    });
    await Posts.create({
        message: "Post with an image.",
        authorId: 1,
        picture: "pixel-art-2025-06-101749650708067.png"
    });
}

module.exports = dataset;