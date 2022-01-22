/*eslint-disable*/
/**
 * this file will hold all the get use-case for post domain
 */
import StatusName from 'domain/status_name';
import { cleanData } from 'interfaces/http/utils';
/**
  * function for update status name.
  */
export default ({ statusNameRepository }: any) => {
  const update = ({ id, body }: any) => {
      try {
        const status = StatusName({ ...body });
        return statusNameRepository.update(cleanData(status), {
          where: { status_name_id: id },
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
