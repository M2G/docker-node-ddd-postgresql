import container from '../../../../container';
import {
 get, post, put, remove,
} from '../../../../app/post';

export default () => {
  const { cradle } = container;
  const {
 repository: {
    postRepository,
    },
  } = cradle;

  const getUseCase = get({ postRepository });
  const postUseCase = post({ postRepository });
  const putUseCase = put({ postRepository });
  const deleteUseCase = remove({ postRepository });

  return {
    deleteUseCase,
    getUseCase,
    postUseCase,
    putUseCase,
  };
};
