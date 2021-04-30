import container from '../../../../container';
import {
 get, getOne, post, put, remove
} from '../../../../app/post';

export default () => {
  const {cradle} = container;
  const {
 repository: {
    postRepository
    }
  } = cradle;

  const getUseCase = get({postRepository});
  const getOneUseCase = getOne({postRepository});
  const postUseCase = post({postRepository});
  const putUseCase = put({postRepository});
  const deleteUseCase = remove({postRepository});

  return {
    deleteUseCase,
    getOneUseCase,
    getUseCase,
    postUseCase,
    putUseCase
  };
};
