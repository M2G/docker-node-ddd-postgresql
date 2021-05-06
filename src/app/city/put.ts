/*eslint-disable*/
/**
 * this file will hold all the get use-case for post domain
 */
import City from '../../domain/city';

/**
  * function for getter post.
  */
export default ({ postRepository }: any) => {
  // code for getting all the items
  const update = ({ city_id, body }: any) =>
    new Promise(async (resolve, reject) => {
      try {
        const city = new City(body);
        await postRepository.update(city, {
          where: { city_id }
        })
        resolve(city);
      } catch (error) {
        reject(error);
      }
    });

  return {
    update
  }
}
