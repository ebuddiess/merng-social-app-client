import React , {useContext} from 'react'
import { Card , Icon , Label , Image ,  Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom';

import {AuthContext} from '../context/auth'
import LikeButton from './LikeButton'
import Comments from './Comments'
import { gql } from '@apollo/client';
import { useMutation  } from '@apollo/client';
import FETCH_USER_POST from '../ApolloProvider/queries/FETCH_USER_POST';



const DELETE_POST = gql`
mutation deletePost($postId : ID!){
    deletePost(postId:$postId)
}
`

const DELETE_COMMENT = gql`
mutation deleteComment($postId : ID! , $commentId : ID!){
    deleteComment(postId:$postId , commentId : $commentId) {
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
`


export default function DeleteButton(props) {
    const {post} = props
    const {comment} = props

    const authCtx = useContext(AuthContext)
    let history = useHistory()

    const commentHandler = () => { 
       deleteComment()
    }
   


   // DELETE COMMENT 
   
   const [deleteComment,] = useMutation(DELETE_COMMENT, {
    update(proxy,result) {
        authCtx.setInfo("DELETE SUCCESSFULLY")
    },
    onError(err){
        console.log(err)
    },
    variables : { postId : post.id , commentId : comment && comment.id }
});

    return (
        <>
    {  (authCtx.user && authCtx.user.email===comment.email) && <Button as='div' labelPosition='right'>
      <Button color='red' basic onClick={commentHandler}>
        <Icon name='trash' />
      </Button>
    </Button> }
        </>
    )
}
