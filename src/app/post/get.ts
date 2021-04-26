/*eslint-disable*/
/**
  * function for getter post.
  */
export default ({ postRepository }: any) => {
  const all = () =>
     Promise
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

  return {
    all
  }
}
