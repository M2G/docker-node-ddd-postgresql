/*eslint-disable*/
/**
 * this file will hold all the get use-case for status_name domain
 */
import StatusName from '../../domain/status_name';

/**
  * function for getter post.
  */
export default ({ statusNameRepository }: any) => {
  const create = ({ body }: any) =>
    Promise
      .resolve()
      .then(() => {
        const status_name = new StatusName(body);
        return statusNameRepository.create(status_name);
      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    create
  }
}
