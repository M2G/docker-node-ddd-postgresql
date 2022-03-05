/*eslint-disable*/
import Country from 'domain/country';
/**
 * function for remove city.
 */
export default ({ countryRepository }: any) => {
  const remove = ({ id }: number | any) => {
    try {
      const { country_id }: any = Country({ country_id: +id });
      return countryRepository.destroy({ where: { country_id } });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    remove,
  };
};
