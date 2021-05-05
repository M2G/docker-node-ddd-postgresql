/*eslint-disable*/
/**
  * function for getter country.
  */
export default ({ countryRepository }: any) => {
  const all = () =>
     Promise
      .resolve()
      .then(() =>
        countryRepository.getAll({
          attributes: [
            //'id', 'title', 'content', 'createdAt', 'modifiedAt'
            'id', 'title', 'content'
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
