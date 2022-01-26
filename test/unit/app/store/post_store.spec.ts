/*eslint-disable*/
import postUsecase from 'app/city/post';

describe('App -> City -> Post', () => {
  const storeId = 1;
  const storeName = "Store 1";
  const cityId = "City 1";
  let useCase: { create: any; };

  describe('Success path', () => {

    beforeEach(() => {
      const MockRepository = {
        create: (data: any) => data
      }

      useCase = postUsecase({
        storeRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        store_id: storeId,
        store_name: storeName,
        city_id: cityId
      }

      const lists = await useCase.create({ body });
      expect(lists.store_name).toEqual(body.store_name);
    })
  })

  describe('Fail path', () => {
    const body = {
      store_id: storeId,
      store_name: storeName,
      city_id: cityId
    }

    beforeEach(() => {
      const MockRepository = {
        create: () => Promise.reject('Error')
      }

      useCase = postUsecase({
        storeRepository: MockRepository
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
