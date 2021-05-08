import { gql } from '@apollo/client';

const FETCH_USER_POST = gql`
query getUserPosts($email : String!){
    getUserPosts(email : $email){
        id , 
    body,
    username ,
    email,
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

export default FETCH_USER_POST