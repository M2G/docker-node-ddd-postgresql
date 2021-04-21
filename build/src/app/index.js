"use strict";
module.exports = ({ server, database }) => {
    return {
        start: () => Promise
            .resolve()
            .then(server.start)
    };
};
//# sourceMappingURL=index.js.map