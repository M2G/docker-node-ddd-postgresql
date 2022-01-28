/*eslint-disable*/
import deleteUseCase from 'app/sale/delete';

describe('App -> Sale -> Delete', () => {
  const saleId = '61e3932a1c0df789e0deb729';
  let useCase: any;
  const mockData = [{
    sale_id: saleId
  }];

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        destroy: () => mockData
      };

      useCase = deleteUseCase({
        saleRepository: MockRepository
      });
    });

    it('should display the user on success', async () => {
      const user = await useCase.remove({ id: saleId });
      expect(user).toEqual(mockData);
    });
  });

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        destroy: async () => Promise.reject('Error')
      };

      useCase = deleteUseCase({
        saleRepository: MockRepository
      });
    });

    it('should display error on rejection', async () => {

      let error;
      try {
        await useCase.remove({ id: saleId });
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error');
    });
  });
});
