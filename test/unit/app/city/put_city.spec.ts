/*eslint-disable*/
import updateUsecase from 'app/city/put';

describe('App -> City -> Put', () => {
  const cityId = 1;
  const cityName = "City 1";
  const countryId = 1;
  let useCase: { update: any; };

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        update: (data: any) => data
      }

      useCase = updateUsecase({
        cityRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        city_id: cityId,
        city_name: cityName,
        country_id: countryId
      }

      const lists = await useCase.update({ id: cityId, body });
      expect(lists.city_id).toEqual(body.city_id);
      expect(lists.city_name).toEqual(body.city_name);
      expect(lists.country_id).toEqual(body.country_id);
    })
  })

  describe('Fail path', () => {
    const body = {
      city_id: cityId,
      city_name: cityName,
      country_id: countryId
    }
    beforeEach(() => {
      const MockRepository = {
        update: () => Promise.reject('Error')
      }

      useCase = updateUsecase({
        cityRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {

      let error
      try {
        await useCase.update({ id: cityId, body })
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error')
    })
  })

})
