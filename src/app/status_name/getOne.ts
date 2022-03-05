/*eslint-disable*/
/**
 * function for get one status.
 */

import StatusName from 'domain/status_name';

export default ({ statusNameRepository }: any) => {
  const one = ({ id }: any) => {
    try {
      const { status_name_id }: any = StatusName({
        status_name_id: +id,
      });
      return statusNameRepository.findById({ status_name_id });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    one,
  };
};
