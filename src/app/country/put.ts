/*eslint-disable*/
/**
 * this file will hold all the get use-case for post domain
 */
import Country from '../../domain/country';

/**
  * function for getter post.
  */
export default ({ countryRepository }: any) => {
  // code for getting all the items
  const update = ({ country_id, body }: any) =>
    new Promise(async (resolve, reject) => {
      try {
        const country = new Country(body);
        await countryRepository.update(country, {
          where: { country_id }
        })
        resolve(country);
      } catch (error) {
        reject(error);
      }
    });

  return {
    update
  }
}
