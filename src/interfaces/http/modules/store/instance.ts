import container from '../../../../container';
import { get, getOne, post, put, remove } from '../../../../app/store';

export default () => {
  const { cradle } = container;
  const {
 repository: {
   storeRepository
    }
  } = cradle;

  const getUseCase = get({storeRepository});
  const getOneUseCase = getOne({storeRepository});
  const postUseCase = post({storeRepository});
  const putUseCase = put({storeRepository});
  const deleteUseCase = remove({storeRepository});

  return {
    deleteUseCase,
    getOneUseCase,
    getUseCase,
    postUseCase,
    putUseCase
  };
};
