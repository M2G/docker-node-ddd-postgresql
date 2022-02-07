/* eslint-disable */
import toEntity from './transform';

export default ({ model }: any) => {

  const getAll = async (...args: any[]): Promise<typeof toEntity> => {
    try {
      const entity = await model.findAll(...args);
      return entity?.map(({ dataValues }: any) => toEntity(dataValues));
    } catch (error) {
      throw new Error(error);
    }
  }

  const findById = async (...args: any[]): Promise<unknown> => {
    const { ...params } = args;
    try {
      const data = await model.findOne(params);
      return toEntity(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  const create = async (...args: any[]): Promise<unknown> => {
    const [{ ...params }] = args;
    try {
      const { dataValues } = await model.create(params);
      return toEntity(dataValues);
    } catch (error) {
      throw new Error(error);
    }
  }

  const update = async (...args: any[]): Promise<unknown> => {
    try {
      console.log('-------> update update update', args)
      const updateData = await model.update(...args);
      console.log('-------> updateData updateData updateData', updateData)
      const { dataValues } = updateData?.[1];
      return toEntity(dataValues);
    } catch {

      return false;
    }
  }

  const destroy = async (...args: any[]): Promise<unknown> => {
    try {
      return await model.destroy(...args);
    } catch (error) {

      throw new Error(error);
    }
  }

  return {
    getAll,
    findById,
    create,
    update,
    destroy
  }
}
