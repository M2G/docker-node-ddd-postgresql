/* eslint-disable */
import toEntity from './transform';

export default ({ model }: any) => {

  const getAll = async (...args: any[]) => {
    try {
      const entity = await model.findAll(...args);
      return entity?.map((data: { dataValues: any }) => {
        const {dataValues} = data || {};
        return toEntity(dataValues);
      });
    } catch (error) {
      throw new Error(error)
    }
  }

  const findById = async (...args: any[]) => {
    const [{ id }] = args;
    try {
      const data = await model.findByPk(id);
      return toEntity(data);
    } catch (error) {
      console.log('error', error)
      throw new Error(error)
    }
  }

  const create = async (...args: any[]) => {
    try {
      return await model.update(...args);
    } catch (error) {
      throw new Error(error)
    }
  }

  /*const create = (...args: any[]) =>
    model.create(...args).then(({ dataValues }: any) =>
      toEntity(dataValues));*/

  const update = async (...args: any[]) => {
    try {
      return await model.update(...args);
    } catch (error) {
      throw new Error(error)
    }
  }

 /* const update = (...args: any[]) =>
    model.update(...args)
      .catch((error: string | undefined) => { throw new Error(error) })*/

  const destroy = (...args: any[]) =>
    model.destroy(...args)

  return {
    getAll,
    findById,
    create,
    update,
    destroy
  }
}
