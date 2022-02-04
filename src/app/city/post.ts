/*eslint-disable*/
/**
 * this file will hold all the get use-case for city domain
 */
import City from 'domain/city';
import { cleanData } from 'interfaces/http/utils';

/**
  * function for create one city.
  */
export default ({ cityRepository }: any) => {
  const create = ({ ...args }: any) => {
    try {
      const city = City(args);
      return cityRepository.create(cleanData(city));
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    create
  }
}
