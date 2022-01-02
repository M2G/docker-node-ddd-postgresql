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
      throw new Error(error);
    }
  }

  const findById = async (...args: any[]) => {
    const [{ product_id }] = args;
    try {
      const data = await model.findByPk(product_id);
      return toEntity(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  const create = async (...args: any[]) => {
    const [{ ...params }] = args;
    try {
      return await model.create(params);
    } catch (error) {
      throw new Error(error);
    }
  }

  const update = async (...args: any[]) => {
    try {
      return await model.update(...args);
    } catch (error) {
      throw new Error(error);
    }
  }

  const destroy = async (...args: any[]) => {
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
