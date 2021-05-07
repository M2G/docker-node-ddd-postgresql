import container from '../../../../container';
import { get, getOne, post, put, remove } from '../../../../app/city';

export default () => {
  const { cradle } = container;
  const {
 repository: {
   cityRepository
    }
  } = cradle;

  const getUseCase = get({cityRepository});
  const getOneUseCase = getOne({cityRepository});
  const postUseCase = post({cityRepository});
  const putUseCase = put({cityRepository});
  const deleteUseCase = remove({cityRepository});

  return {
    deleteUseCase,
    getOneUseCase,
    getUseCase,
    postUseCase,
    putUseCase
  };
};
