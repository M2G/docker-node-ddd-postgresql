/*eslint-disable*/
/**
  * function for get all status name.
  */
export default ({ statusNameRepository }: any) => {
  const all = (params: any) => {
    try {
    return statusNameRepository.getAll(params);
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    all
  }
}
