/*eslint-disable*/
/**
  * function for getter post.
  */
export default ({ postRepository }: any) => {
  const one = ({ id }: any) =>
     Promise.resolve()
      .then(() =>
        postRepository.findById({
          attributes: [
            //'id', 'title', 'content', 'createdAt', 'modifiedAt'
            'id', 'title', 'content'
          ],
          where: { id }
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    one
  }
}
