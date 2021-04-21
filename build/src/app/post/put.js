"use strict";
const { Post } = require('../../domain/post');
module.exports = ({ postRepository }) => {
    const update = ({ id, body }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const post = Post(body);
                await postRepository.update(post, {
                    where: { id }
                });
                resolve(post);
            }
            catch (error) {
                reject(error);
            }
        });
    };
    return {
        update
    };
};
//# sourceMappingURL=put.js.map