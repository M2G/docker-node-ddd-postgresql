/*eslint-disable*/
import updateUsecase from 'app/order_status/put';

describe('App -> Order Status -> Put', () => {
  const orderStatusId = 1;
  const updateAt = new Date().getTime();
  const saleId = "Sale 1";
  const statusNameId = "Status Name 1";
  let useCase: { update: any; };

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        update: (data: any) => data
      }

      useCase = updateUsecase({
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

      const lists = await useCase.update({ id: orderStatusId, body });
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
        update: () => Promise.reject('Error')
      }

      useCase = updateUsecase({
        orderStatusRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {

      let error
      try {
        await useCase.update({ id: orderStatusId, body })
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error')
    })
  })

})
