/*eslint-disable*/
import getUsecase from 'app/city/get';

describe('App -> City -> Get All', () => {
  let useCase: any;
  const mockData = {};

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        getAll: () => mockData
      };

      const MockRedis = {
        get: () => mockData
      };

      useCase = getUsecase({
        storeRepository: MockRepository,
        redis: MockRedis
      });
    });

    it('should display all the user on success', async () => {

      console.log('------>', useCase)

      const lists = await useCase.all({});
      expect(lists).toEqual(mockData);
    });
  });

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        getAll: async () => Promise.reject('Error')
      };
      const MockRedis = {
        get: async () => Promise.reject('Error')
      };

      useCase = getUsecase({
        storeRepository: MockRepository,
        redis: MockRedis
      });
    });

    it('should display error on rejection', async () => {
      let error;
      try {
        await useCase.all({});
      } catch (e) {
        error = e.message;
      }
      expect(error).toEqual('Error');
    });
  });
});
