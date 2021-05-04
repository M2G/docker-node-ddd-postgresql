/*eslint-disable*/
import Post from './post';

export default ({ database }: any) => {

  console.log('database', database)

  const { models } = database;
  const { test_tb } = models;
  const postModel: any = test_tb;

  return {
    postRepository: Post({ model: postModel }),
  };
};
