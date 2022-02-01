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

        console.log('city city city city', city)

        return cityRepository.create(body);
      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    create
  }
}
