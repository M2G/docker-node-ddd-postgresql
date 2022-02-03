/*eslint-disable*/
import Country from 'domain/country';
/**
 * function for remove city.
 */
export default ({ countryRepository }: any) => {

  const remove = ({ id }: number | any) => {
    try {
      const { country_id: countryId }: any = Country({ country_id: +id });
      return countryRepository.destroy({ where: { country_id: countryId } });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    remove
  }
}
