/*eslint-disable*/
import deleteUseCase from 'app/order_status/delete';

describe('App -> Order Status -> Delete', () => {
  const orderStatusId = 1;
  let useCase: any;
  const mockData = [{
    order_status_id: orderStatusId
  }];

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        destroy: () => mockData
      };

      useCase = deleteUseCase({
        orderStatusRepository: MockRepository
      });
    });

    it('should display the user on success', async () => {
      const user = await useCase.remove({ id: orderStatusId });
      expect(user).toEqual(mockData);
    });
  });

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        destroy: async () => Promise.reject('Error')
      };

      useCase = deleteUseCase({
        orderStatusRepository: MockRepository
      });
    });

    it('should display error on rejection', async () => {

      let error;
      try {
        await useCase.remove({ id: orderStatusId });
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error');
    });
  });
});
