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
    const [{ user_id }] = args;
    try {
      const data = await model.findByPk(user_id);
      return toEntity(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  const create = async (...args: any[]) => {
    const [{ ...params }] = args;
    try {
      const data = await model.create(params);
      return toEntity(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  const update = async (...args: any[]) => {
    try {
      const [data] = await model.update(...args);
      return data;
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
