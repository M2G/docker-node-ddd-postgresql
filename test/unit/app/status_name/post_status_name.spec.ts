/*eslint-disable*/
import postUsecase from 'app/status_name/post';

describe('App -> StatusName -> Post', () => {
  const statusNameId = 1;
  const statusName = "Status Name 1";
  let useCase: { create: any; };

  describe('Success path', () => {

    beforeEach(() => {
      const MockRepository = {
        create: (data: any) => data
      }

      useCase = postUsecase({
        statusNameRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        status_name_id: statusNameId,
        status_name: statusName,
      }

      const lists = await useCase.create({ body });
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
        create: () => Promise.reject('Error')
      }

      useCase = postUsecase({
        statusNameRepository: MockRepository
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
