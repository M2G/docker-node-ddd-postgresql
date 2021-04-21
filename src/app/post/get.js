/**
  * function for getter post.
  */
module.exports = ({ postRepository }) => {
  const all = () => {
    return Promise
      .resolve()
      .then(() =>
        postRepository.getAll({
          attributes: [
            //'id', 'title', 'content', 'createdAt', 'modifiedAt'
            'id', 'title', 'content'
          ]
        })
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all
  }
}
