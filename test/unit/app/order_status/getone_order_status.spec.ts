/*eslint-disable*/
import getOneUseCase from 'app/order_status/getOne';

describe('App -> Order Status -> Get One', () => {
  const orderStatusId = 1;
  let useCase: any;
  const mockData = [{
    order_status_id: orderStatusId
  }];

  describe('Success path', () => {
    beforeEach(() => {

      const MockRepository = {
        findById: () => mockData
      }

      useCase = getOneUseCase({
        orderStatusRepository: MockRepository,
      })
    });

    it('should display the user on success', async () => {
      const user = await useCase.one({ id: orderStatusId });
      expect(user).toEqual(mockData);
    })
  });

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        findById: () => Promise.reject('Error'),
      }

      useCase = getOneUseCase({
        orderStatusRepository: MockRepository,
      })
    })

    it('should display error on rejection', async () => {

      let error;
      try {
        await useCase.one({ id: orderStatusId });
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error');
    })
  })

})
