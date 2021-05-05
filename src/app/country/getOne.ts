/*eslint-disable*/
/**
  * function for getter country.
  */
export default ({ countryRepository }: any) => {
  const one = ({ id }: any) =>
     Promise
      .resolve()
      .then(() =>
        countryRepository.findById({
          attributes: [
            //'id', 'title', 'content', 'createdAt', 'modifiedAt'
            'id', 'title', 'content'
          ],
          where: { id }
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    one
  }
}
