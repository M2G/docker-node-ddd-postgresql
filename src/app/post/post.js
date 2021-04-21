/**
 * this file will hold all the get use-case for company domain
 */
const { Post } = require('../../domain/post')

/**
  * function for getter company.
  */
module.exports = ({ postRepository }) => {
  // code for getting all the items
  const create = ({ body }) => {
    return Promise
      .resolve()
      .then(() => {
        const post = Post(body)
        return postRepository.create(post)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return {
    create
  }
}
