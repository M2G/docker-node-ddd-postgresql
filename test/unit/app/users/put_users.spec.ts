/*eslint-disable*/
import faker from 'faker';
import updateUsecase from 'app/users/put';

describe('App -> Users -> Put', () => {
  const userId = 1;
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const password = faker.internet.password();
  const email = faker.internet.email();
  const roleId = 1;
  const verificationCode = faker.random.uuid();
  const isVerified = 1;
  const isDeleted = 0;
  const createdBy = new Date().toISOString();
  const updatedBy = new Date().toISOString();

  let useCase: { update: any; };

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        update: (data: any) => data
      }

      useCase = updateUsecase({
        usersRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        user_id: userId,
        first_name:firstName,
        last_name:lastName,
        password:password,
        role_id: roleId,
        verification_code: verificationCode,
        is_verified: isVerified,
        is_deleted: isDeleted,
        created_by: createdBy,
        updated_by: updatedBy,
        email: email,
      }

      const lists = await useCase.update({ id: userId, body });
      expect(lists.user_id).toEqual(body.user_id);
      expect(lists.first_name).toEqual(body.first_name);
      expect(lists.last_name).toEqual(body.last_name);
      expect(lists.password).toEqual(body.password);
      expect(lists.role_id).toEqual(body.role_id);
      expect(lists.verification_code).toEqual(body.verification_code);
      expect(lists.is_verified).toEqual(body.is_verified);
      expect(lists.is_deleted).toEqual(body.is_deleted);
      expect(lists.is_deleted).toEqual(body.created_by);
      expect(lists.is_deleted).toEqual(body.updated_by);
      expect(lists.is_deleted).toEqual(body.email);
    })
  })

  describe('Fail path', () => {
    const body = {
      user_id: userId,
      first_name:firstName,
      last_name:lastName,
      password:password,
      role_id: roleId,
      verification_code: verificationCode,
      is_verified: isVerified,
      is_deleted: isDeleted,
      created_by: createdBy,
      updated_by: updatedBy,
      email: email,
    }
    beforeEach(() => {
      const MockRepository = {
        update: () => Promise.reject('Error')
      }

      useCase = updateUsecase({
        usersRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {

      let error
      try {
        await useCase.update({ id: userId, body })
      } catch (e) {
        // error = e.message;
        error = e;
      }
      expect(error).toEqual('Error')
    })
  })

})
