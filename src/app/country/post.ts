/*eslint-disable*/
/**
 * this file will hold all the get use-case for country domain
 */
import Country from '../../domain/country';

/**
  * function for getter post.
  */
export default ({ countryRepository }: any) => {
  const create = ({ body }: any) =>
    Promise
      .resolve()
      .then(() => {
        const country = new Country(body);
        return countryRepository.create(country);
      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    create
  }
}
