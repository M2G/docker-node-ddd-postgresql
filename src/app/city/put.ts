/*eslint-disable*/
/**
 * this file will hold all the get use-case for post domain
 */
import Product from 'domain/city';
import { cleanData } from 'interfaces/http/utils';
/**
 * function for update city.
 */
export default ({ cityRepository }: any) => {
  const update = ({ id, ...args }: any) => {
    try {
      const post = Product(args);
      return cityRepository.update(cleanData(post), {
        where: { city_id: id },
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
