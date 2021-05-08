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


export default function DeleteButton(props) {
    const {post} = props
    const authCtx = useContext(AuthContext)
    let history = useHistory()

 
    const deleteHandler = () => { 
      deletePost()
   }

   
   const [deletePost, { data }] = useMutation(DELETE_POST,{
    update(proxy,result) {

        const data = proxy.readQuery({
            query : FETCH_USER_POST ,
            variables: { // Provide any required variables here
                email: authCtx.user && authCtx.user.email,
              },
        })

        let newone ;

        newone =  data.getUserPosts.filter(singlepost => singlepost.id !== post.id)

        proxy.writeQuery({query:FETCH_USER_POST , data : {
            getUserPosts : newone
        } ,variables:{ // Provide any required variables here
            email: authCtx.user && authCtx.user.email,
          }})

        authCtx.setInfo("DELETE SUCCESSFULLY")
        history.replace("/")
    },
    onError(err){
        console.log(err)
    },
    variables : { postId : post.id}
});


    return (
        <>
    {  (authCtx.user && authCtx.user.email===post.email) && <Button as='div' labelPosition='right'>
      <Button color='red' basic onClick={deleteHandler}>
        <Icon name='trash' />
      </Button>
    </Button> }
        </>
    )
}
