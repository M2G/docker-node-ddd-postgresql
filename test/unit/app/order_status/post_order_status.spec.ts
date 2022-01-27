/*eslint-disable*/
import postUsecase from 'app/order_status/post';

describe('App -> Order Status -> Post', () => {
  const orderStatusId = 1;
  const updateAt = new Date().getTime();
  const saleId = "Sale 1";
  const statusNameId = "Status Name 1";
  let useCase: { create: any; };

  describe('Success path', () => {

    beforeEach(() => {
      const MockRepository = {
        create: (data: any) => data
      }

      useCase = postUsecase({
        orderStatusRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        order_status_id: orderStatusId,
        update_at: updateAt,
        sale_id: saleId,
        status_name_id: statusNameId
      }

      const lists = await useCase.create({ body });
      expect(lists.order_status_id).toEqual(body.order_status_id);
      expect(lists.update_at).toEqual(body.update_at);
      expect(lists.sale_id).toEqual(body.sale_id);
      expect(lists.status_name_id).toEqual(body.status_name_id);
    })
  })

  describe('Fail path', () => {
    const body = {
      order_status_id: orderStatusId,
      update_at: updateAt,
      sale_id: saleId,
      status_name_id: statusNameId
    }

    beforeEach(() => {
      const MockRepository = {
        create: () => Promise.reject('Error')
      }

      useCase = postUsecase({
        orderStatusRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {

      let error
      try {
        await useCase.create({ body })
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error')
    })
  })

})
