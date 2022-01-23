/*eslint-disable*/
import updateUsecase from 'app/status_name/put';

describe('App -> StatusName -> Put', () => {
  const statusNameId = 1;
  const statusName = "Status Name 1";
  let useCase: { update: any; };

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        update: (data: any) => data
      }

      useCase = updateUsecase({
        statusNameRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        status_name_id: statusNameId,
        status_name: statusName,
      }

      const lists = await useCase.update({ id: statusNameId, body });
      expect(lists.status_name_id).toEqual(body.status_name_id);
      expect(lists.status_name).toEqual(body.status_name);
    })
  })

  describe('Fail path', () => {
    const body = {
      status_name_id: statusNameId,
      status_name: statusName,
    }
    beforeEach(() => {
      const MockRepository = {
        update: () => Promise.reject('Error')
      }

      useCase = updateUsecase({
        statusNameRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {

      let error
      try {
        await useCase.update({ id: statusNameId, body })
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error')
    })
  })

})
