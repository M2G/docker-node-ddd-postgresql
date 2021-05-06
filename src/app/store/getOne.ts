/*eslint-disable*/
/**
  * function for getter post.
  */
export default ({ storeRepository }: any) => {
  const one = ({ store_id }: any) =>
     Promise
      .resolve()
      .then(() =>
        storeRepository.findById({
          attributes: [
            'store_id', 'name', 'city_id'
          ],
          where: { store_id }
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    one
  }
}
