/*eslint-disable*/
/**
 * this file will hold all the get use-case for post domain
 */
import Post from '../../domain/post';

/**
  * function for create post.
  */
export default ({ productRepository }: any) => {
  // code for getting all the items
  const create = ({ body }: any) =>
    Promise
      .resolve()
      .then(() => {
        const post = new Post(body);
        return productRepository.create(post);
      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    create
  }
}
