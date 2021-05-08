/*eslint-disable*/
/**
 * this file will hold all the get use-case for post domain
 */
import Sale from '../../domain/sale';

/**
  * function for getter post.
  */
export default ({ saleRepository }: any) => {
  const create = ({ body }: any) =>
    Promise
      .resolve()
      .then(() => {
        const sale = new Sale(body);
        return saleRepository.create(sale);
      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    create
  }
}
