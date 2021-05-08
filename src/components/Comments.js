import { gql, useMutation } from '@apollo/client';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { Comment, Header } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import DeleteComment from './DeleteComment';







const CommentComp = (props) => {

    const [comment,setComment] = useState("")
    const authCtx = useContext(AuthContext)
   
    const formHandler = (e) => { 
      if(!authCtx.user && !authCtx.isAuthenticated){
        alert("First Login or Register")
        props.history.push("/login")
      }else{
       e.preventDefault()
       createComment()
       setComment("")
      }
      
    }

    const onchange = (e) => { 
          setComment(e.target.value)
    }
    const [createComment, { data }] = useMutation(CREATE_COMMENT,{
      update(proxy,result){
      },

      onError(err){
          console.log(err)
      },
      variables : { body : comment   , postId : props.post.id }
  }
  )


    return (
        <Comment.Group threaded>
          <Header as='h3' dividing>
            Comments
          </Header>

          <form class="ui reply form" onSubmit={formHandler}>
            <div class="field"><textarea rows="3" value={comment} onChange={onchange}></textarea>
            </div>
            <button class="ui icon primary left labeled button">
              <i aria-hidden="true" class="edit icon"></i>Add Comment</button></form>

    {props.post.comments.map( comment => 
    
    <Comment key={comment.id}>
    <Comment.Content>
      <Comment.Author as='a'>{comment.username}</Comment.Author>
      <Comment.Metadata>
        <span>{moment(comment.createdAt).fromNow()}</span>
      </Comment.Metadata>
      <Comment.Text>{comment.body}</Comment.Text>
    </Comment.Content>
    <DeleteComment post={props.post} comment={comment} />
  </Comment>
    
  ) }

        </Comment.Group>
      )
}

export default CommentComp


const CREATE_COMMENT = gql`
mutation createComment($postId : ID! , $body : String!){
    createComment(postId: $postId , body : $body ){
    id , 
    body,
    username ,
    email,
    createdAt ,
    comments{
      id,
      body,
      username,
      createdAt,
      email
    },
    likes{
    username,
    email
  }
    }
}
`