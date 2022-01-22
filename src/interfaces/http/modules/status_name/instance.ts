import container from 'container';
import {
 get, getOne, post, put, remove
} from 'app/status_name';

export default () => {
  const { cradle } = container;
  const {
 repository: {
   statusNameRepository
    }
  } = cradle;

  const getUseCase = get({statusNameRepository});
  const getOneUseCase = getOne({statusNameRepository});
  const postUseCase = post({statusNameRepository});
  const putUseCase = put({statusNameRepository});
  const deleteUseCase = remove({statusNameRepository});

  return {
    deleteUseCase,
    getOneUseCase,
    getUseCase,
    postUseCase,
    putUseCase
  };
};
