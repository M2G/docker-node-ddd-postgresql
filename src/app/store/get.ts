/*eslint-disable*/
/**
  * function for store post.
  */
export default ({ storeRepository }: any) => {
  const all = () =>
     Promise.resolve()
      .then(() =>
        storeRepository.getAll({
          attributes: [
            'store_id', 'name', 'city_id'
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
