/*eslint-disable*/
import StatusName from 'domain/status_name';

/**
  * function for remove status name.
  */
export default ({ statusNameRepository }: any) => {
  const remove = ({ id }: number | any) => {
    try {
      const { status_name_id: statusNameId }: any = StatusName({
        status_name_id: +id,
      });
      return statusNameRepository.destroy({ where: { status_name_id: statusNameId } });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    remove
  }
}
