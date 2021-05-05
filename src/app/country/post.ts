/*eslint-disable*/
/**
 * this file will hold all the get use-case for country domain
 */
import Post from '../../domain/post';

/**
  * function for getter post.
  */
export default ({ countryRepository }: any) => {
  // code for getting all the items
  const create = ({ body }: any) =>
    Promise
      .resolve()
      .then(() => {
        // @ts-ignore
        const post = new Post(body);
        return countryRepository.create(post);
      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    create
  }
}
