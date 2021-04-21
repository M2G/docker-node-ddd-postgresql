"use strict";
const container = require('../../../../container');
const { get, post, put, remove } = require('../../../../app/post');
module.exports = () => {
    const { repository: { postRepository } } = container.cradle;
    const getUseCase = get({ postRepository });
    const postUseCase = post({ postRepository });
    const putUseCase = put({ postRepository });
    const deleteUseCase = remove({ postRepository });
    return {
        getUseCase,
        postUseCase,
        putUseCase,
        deleteUseCase
    };
};
//# sourceMappingURL=instance.js.map