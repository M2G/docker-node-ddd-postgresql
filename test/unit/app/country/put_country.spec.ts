/*eslint-disable*/
import updateUsecase from 'app/country/put';

describe('App -> Country -> Put', () => {
  const countryId = 1;
  const countryName = "Country 1";
  let useCase: { update: any; };

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        update: (data: any) => data
      }

      useCase = updateUsecase({
        countryRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        country_id: countryId,
        country_name: countryName,
      }

      const lists = await useCase.update({ id: countryId, body });
      expect(lists.country_id).toEqual(body.country_id);
      expect(lists.country_name).toEqual(body.country_name);
    })
  })

  describe('Fail path', () => {
    const body = {
      country_id: countryId,
      country_name: countryName,
    }
    beforeEach(() => {
      const MockRepository = {
        update: () => Promise.reject('Error')
      }

      useCase = updateUsecase({
        countryRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {

      let error
      try {
        await useCase.update({ id: countryId, body })
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error')
    })
  })

})
