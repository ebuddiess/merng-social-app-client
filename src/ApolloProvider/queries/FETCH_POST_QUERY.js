import { gql } from '@apollo/client';

const FETCH_POST_QUERY = gql`
{
    getPosts{
      id , 
    body,
    username,
    email ,
    createdAt ,
    comments{
      id,
      body,
      email,
      username
    },
    likes{
    username,
    email
  }
}
}
`;

export default FETCH_POST_QUERY