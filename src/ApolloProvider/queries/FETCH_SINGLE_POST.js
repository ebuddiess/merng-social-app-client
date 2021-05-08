import { gql } from '@apollo/client';
import { useMutation , useQuery , ApolloClient } from '@apollo/client';

const FETCH_SINGLE_POST = gql`
query getPost($postId : ID!){
    getPost(postId : $postId){
    id , 
    body,
    username ,
    email,
    createdAt ,
    comments{
      id,
      body,
      username,
      email,
      createdAt
    },
    likes{
    username,
    email
  }
}
}
`;

export default FETCH_SINGLE_POST