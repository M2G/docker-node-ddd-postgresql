/*eslint-disable*/
import updateUsecase from 'app/city/put';

describe('App -> City -> Put', () => {
  const storeId = 1;
  const storeName = "Store 1";
  const cityId = "City 1";
  let useCase: { update: any; };

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        update: (data: any) => data
      }

      useCase = updateUsecase({
        storeRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        store_id: storeId,
        store_name: storeName,
        city_id: cityId
      }

      const lists = await useCase.update({ id: storeId, body });
      expect(lists.store_id).toEqual(body.store_id);
      expect(lists.store_name).toEqual(body.store_name);
      expect(lists.city_id).toEqual(body.city_id);
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
        update: () => Promise.reject('Error')
      }

      useCase = updateUsecase({
        storeRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {

      let error
      try {
        await useCase.update({ id: storeId, body })
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error')
    })
  })

})
