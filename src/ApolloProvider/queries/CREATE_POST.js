import { gql } from '@apollo/client';


const CREATE_POST = gql`
mutation createPost( $body : String!){
    createPost( body : $body ){
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
`

export default CREATE_POST