import container from '../../../../container';
import { get, getOne, post, put, remove } from '../../../../app/users';

export default () => {
  const { cradle } = container;
  const {
 repository: {
   usersRepository
    }
  } = cradle;

  const getUseCase = get({usersRepository});
  const getOneUseCase = getOne({usersRepository});
  const postUseCase = post({usersRepository});
  const putUseCase = put({usersRepository});
  const deleteUseCase = remove({usersRepository});

  return {
    deleteUseCase,
    getOneUseCase,
    getUseCase,
    postUseCase,
    putUseCase
  };
};
