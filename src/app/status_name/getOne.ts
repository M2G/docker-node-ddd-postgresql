/*eslint-disable*/
/**
 * function for get status_name.
  */
export default ({ statusNameRepository }: any) => {
  const one = ({ status_name_id }: any) =>
     Promise
      .resolve()
      .then(() =>
        statusNameRepository.findById({
          attributes: [
            'status_name_id', 'status_name'
          ],
          where: { status_name_id }
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    one
  }
}
