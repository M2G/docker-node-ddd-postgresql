/*eslint-disable*/
// import Post from './post';

export default ({ database }: any) => {

 const { models } = database;

   console.log('database database database database', models)

 /*
  const { test_tb } = models;
  const postModel: any = test_tb;
*/
  return {
    // postRepository: Post({ model: postModel }),
  };
};
