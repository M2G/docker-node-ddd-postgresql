/*eslint-disable*/
/**
 * this file will hold all the get use-case for status_name domain
 */
import StatusName from '../../domain/status_name';

/**
  * function for getter post.
  */
export default ({ statusNameRepository }: any) => {
  const update = ({ status_name_id, body }: any) =>
    new Promise(async (resolve, reject) => {
      try {
        const status_name = new StatusName(body);
        await statusNameRepository.update(status_name, {
          where: { status_name_id }
        })
        resolve(status_name);
      } catch (error) {
        reject(error);
      }
    });

  return {
    update
  }
}
