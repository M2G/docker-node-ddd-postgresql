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
  const update = ({ id, ...args }: any) => {
    try {
      const statusName = StatusName(args);
      return statusNameRepository.update(cleanData(statusName), {
        where: { status_name_id: id },
        returning: true,
        plain: true,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    update,
  };
};
