/*eslint-disable*/
import getOneUseCase from 'app/city/getOne';

describe('App -> City -> Get One', () => {
  const cityId = 1;
  let useCase: any;
  const mockData = [{
    city_id: cityId
  }];

  describe('Success path', () => {
    beforeEach(() => {

      const MockRepository = {
        findById: () => mockData
      }

      useCase = getOneUseCase({
        cityRepository: MockRepository,
      })
    });

    it('should display the user on success', async () => {
      const user = await useCase.one({ id: cityId });
      expect(user).toEqual(mockData);
    })
  });

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        findById: () => Promise.reject('Error'),
      }

      useCase = getOneUseCase({
        cityRepository: MockRepository,
      })
    })

    it('should display error on rejection', async () => {

      let error;
      try {
        await useCase.one({ id: cityId });
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error');
    })
  })

})
