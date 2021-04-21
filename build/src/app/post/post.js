"use strict";
const { Post } = require('../../domain/post');
module.exports = ({ postRepository }) => {
    const create = ({ body }) => {
        return Promise
            .resolve()
            .then(() => {
            const post = Post(body);
            return postRepository.create(post);
        })
            .catch((error) => {
            throw new Error(error);
        });
    };
    return {
        create
    };
};
//# sourceMappingURL=post.js.map