/* eslint-disable */
import toEntity from './transform';

export default ({ model }: any) => {

  const getAll = (...args: any[]) => {
    return model.findAll(...args).then((entity: { dataValues: any }[]) => {

      console.log('entity', entity)

      return entity?.map((data: { dataValues: any }) => {
        const {dataValues} = data || {};
        return toEntity(dataValues);
      })
    })
  }

  const findById = (...args: any[]) =>
    model.findByPk(...args)
      .then(({ dataValues }: any) => toEntity(dataValues))
      .catch((error: string | undefined) => { throw new Error(error) })

  const create = (...args: any[]) => {

    return model.create(...args).then(({dataValues}: any) => {

      console.log('dataValues', dataValues)

      return toEntity(dataValues);
    })
  }

  const update = (...args: any[]) =>
    model.update(...args)
      .catch((error: string | undefined) => { throw new Error(error) })

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
