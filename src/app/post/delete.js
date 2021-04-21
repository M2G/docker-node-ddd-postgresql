/**
  * function for getter company.
  */
module.exports = ({ postRepository }) => {
  // code for getting all the items
  const remove = ({ id }) => {
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
        throw new Error(error)
      })
  }

  return {
    remove
  }
}
