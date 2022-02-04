/*eslint-disable*/
/**
 * this file will hold all the get use-case for country domain
 */
import Country from 'domain/country';
import { cleanData } from 'interfaces/http/utils';

/**
  * function for getter country.
  */
export default ({ countryRepository }: any) => {
  const create = ({ ...args }: any) => {
    try {
      const country = Country(args);
      return countryRepository.create(cleanData(country));
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    create
  }
}
