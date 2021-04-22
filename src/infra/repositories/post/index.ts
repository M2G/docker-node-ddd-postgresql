import toEntity from './transform';

export default ({ model }: any) => {
  const getAll = (...args: any[]) =>
    model.findAll(...args).then((entity: { dataValues: any }[]) =>
      entity.map((data: { dataValues: any }) => {
        const { dataValues } = data
        return toEntity(dataValues)
      })
    )

  const create = (...args: any[]) =>
    model.create(...args).then(({ dataValues }: any) => toEntity(dataValues))

  const update = (...args: any[]) =>
    model.update(...args)

  const destroy = (...args: any[]) =>
    model.destroy(...args)

  return {
    getAll,
    create,
    update,
    destroy
  }
}
