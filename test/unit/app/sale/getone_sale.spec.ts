/*eslint-disable*/
import getOneUseCase from 'app/sale/getOne';

describe('App -> Sale -> Get One', () => {
  const saleId = '61e3932a1c0df789e0deb729';
  let useCase: any;
  const mockData = [{
    sale_id: saleId
  }];

  describe('Success path', () => {
    beforeEach(() => {

      const MockRepository = {
        findById: () => mockData
      }

      useCase = getOneUseCase({
        saleRepository: MockRepository,
      })
    });

    it('should display the user on success', async () => {
      const user = await useCase.one({ id: saleId });
      expect(user).toEqual(mockData);
    })
  });

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        findById: () => Promise.reject('Error'),
      }

      useCase = getOneUseCase({
        saleRepository: MockRepository,
      })
    })

    it('should display error on rejection', async () => {

      let error;
      try {
        await useCase.one({ id: saleId });
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error');
    })
  })

})
