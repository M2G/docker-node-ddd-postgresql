"use strict";
const Post = require('./post');
module.exports = ({ database }) => {
    const postModel = database.models.test_tb;
    return {
        postRepository: Post({ model: postModel })
    };
};
//# sourceMappingURL=index.js.map