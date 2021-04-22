/*eslint-disable*/
/**
  * function for getter post.
  */
export default ({ postRepository }: any) => {
  // code for getting all the items
  const remove = ({ id }: any) => {
    return Promise
      .resolve()
      .then(() =>
        postRepository.update({
          isDeleted: 1
        }, {
          where: { id }
        })
      )
      .catch((error) => {
        throw new Error(error);
      })
  }

  return {
    remove
  }
}
