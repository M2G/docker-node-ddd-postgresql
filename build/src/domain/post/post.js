"use strict";
const t = require('tcomb');
const { compose } = require('ramda');
const { cleanData } = require('../helper');
const Post = t.struct({
    id: t.maybe(t.Integer),
    title: t.String,
    content: t.String,
});
module.exports = compose(cleanData, Post);
//# sourceMappingURL=post.js.map