/*eslint-disable*/
/**
 * this file will hold all the get use-case for city domain
 */
import City from 'domain/city';

/**
  * function for create one city.
  */
export default ({ cityRepository }: any) => {
  const create = ({ ...body }: any) =>
    Promise.resolve()
      .then(() => {
        const city = new City(body);
        return cityRepository.create(city);
      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    create
  }
}
