import { gql } from '@apollo/client';

const LIKE_POST = gql`
mutation likePost($postId : ID!){
    likePost(postId : $postId){
    id , 
    body,
    username ,
    createdAt ,
    comments{
      id,
      body,
      username,
      createdAt
    },
    likes{
    username,
    email
  }
}
}
`;

export default LIKE_POST