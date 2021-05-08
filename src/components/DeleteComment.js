import { gql, useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';




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
