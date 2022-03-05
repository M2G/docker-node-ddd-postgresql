/*eslint-disable*/
/**
 * function for get one city.
 */

import City from 'domain/city';

export default ({ cityRepository }: any) => {
  const one = ({ id }: any) => {
    try {
      const { city_id }: any = City({ city_id: +id });
      return cityRepository.findById({ where: { city_id } });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    one,
  };
};
