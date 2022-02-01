/*eslint-disable*/
import City from 'domain/city';

/**
 * function for remove city.
 */
export default ({ cityRepository }: any) => {

  const remove = ({ id }: number | any) => {
    try {
      const { city_id: cityId }: any = City({ city_id: +id });
      return cityRepository.destroy({ where: { city_id: cityId } });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    remove
  }
}
