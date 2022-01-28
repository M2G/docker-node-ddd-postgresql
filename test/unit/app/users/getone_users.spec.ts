/*eslint-disable*/
import getOneUseCase from 'app/users/getOne';

describe('App -> Users -> Get One', () => {
  const userId = 1;
  let useCase: any;
  const mockData = [{
    user_id: userId
  }];

  describe('Success path', () => {
    beforeEach(() => {

      const MockRepository = {
        findById: () => mockData
      }

      useCase = getOneUseCase({
        usersRepository: MockRepository,
      })
    });

    it('should display the user on success', async () => {
      const user = await useCase.one({ id: userId });
      expect(user).toEqual(mockData);
    })
  });

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        findById: () => Promise.reject('Error'),
      }

      useCase = getOneUseCase({
        usersRepository: MockRepository,
      })
    })

    it('should display error on rejection', async () => {

      let error;
      try {
        await useCase.one({ id: userId });
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error');
    })
  })

})
