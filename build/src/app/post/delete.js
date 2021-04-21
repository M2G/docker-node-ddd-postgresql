"use strict";
module.exports = ({ postRepository }) => {
    const remove = ({ id }) => {
        return Promise
            .resolve()
            .then(() => postRepository.update({
            isDeleted: 1
        }, {
            where: { id }
        }))
            .catch((error) => {
            throw new Error(error);
        });
    };
    return {
        remove
    };
};
//# sourceMappingURL=delete.js.map