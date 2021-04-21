/**
 * this file will hold all the get use-case for company domain
 */
const { Post } = require('../../domain/post')

/**
  * function for getter company.
  */
module.exports = ({ postRepository }) => {
  // code for getting all the items
  const update = ({ id, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const post = Post(body)
        await postRepository.update(post, {
          where: { id }
        })

        resolve(post)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    update
  }
}
