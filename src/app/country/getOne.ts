/*eslint-disable*/
import Country from 'domain/country';

/**
  * function for getter country.
  */
export default ({ countryRepository }: any) => {
  const one = ({ id }: any) => {
    try {
      const { country_id }: any = Country({ country_id: +id });
      return countryRepository.findById({ where: { country_id }});
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    one
  }
}
