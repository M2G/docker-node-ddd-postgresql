/*eslint-disable*/
import deleteUseCase from 'app/city/delete';

describe('App -> City -> Delete', () => {
  const cityId = 1;
  let useCase: any;
  const mockData = [{
    city_id: cityId
  }];

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        destroy: () => mockData
      };

      useCase = deleteUseCase({
        cityRepository: MockRepository
      });
    });

    it('should display the user on success', async () => {
      const user = await useCase.remove({ id: cityId });
      expect(user).toEqual(mockData);
    });
  });

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        destroy: async () => Promise.reject('Error')
      };

      useCase = deleteUseCase({
        cityRepository: MockRepository
      });
    });

    it('should display error on rejection', async () => {

      let error;
      try {
        await useCase.remove({ id: cityId });
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error');
    });
  });
});
