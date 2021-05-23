/*eslint-disable*/
/**
  * function for get status_name.
  */
export default ({ statusNameRepository }: any) => {
  const all = () =>
     Promise.resolve()
      .then(() =>
        statusNameRepository.getAll({
          attributes: [
            'status_name_id', 'status_name'
          ]
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    all
  }
}
