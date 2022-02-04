/*eslint-disable*/
/**
 * this file will hold all the get use-case for post domain
 */
import Country from 'domain/country';
import { cleanData } from 'interfaces/http/utils';

/**
  * function for getter country.
  */
export default ({ countryRepository }: any) => {
  const update = ({ id, ...args }: any) => {
    try {
      const country = Country(args);
      return countryRepository.update(cleanData(country), {
        where: { country_id: id },
        returning: true,
        plain: true
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    update
  }
}
