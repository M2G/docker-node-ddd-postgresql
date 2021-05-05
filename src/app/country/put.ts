/*eslint-disable*/
/**
 * this file will hold all the get use-case for post domain
 */
import Post from '../../domain/post';

/**
  * function for getter post.
  */
export default ({ countryRepository }: any) => {
  // code for getting all the items
  const update = ({ id, body }: any) =>
    new Promise(async (resolve, reject) => {
      try {
        const post = new Post(body);
        await countryRepository.update(post, {
          where: { id }
        })
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });

  return {
    update
  }
}
