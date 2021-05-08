
import {AuthContext} from '../context/auth'


import React , {useState , useContext , useEffect}  from 'react'
import { Form  , Button , Header , Label , Grid , GridColumn} from 'semantic-ui-react'
import { useMutation , useQuery , ApolloClient } from '@apollo/client';
import FetchSinglePost from '../ApolloProvider/queries/FETCH_SINGLE_POST';
import FETCH_SINGLE_POST from '../ApolloProvider/queries/FETCH_SINGLE_POST';
import SinglePostComp from '../components/SinglePost';





export default function SinglePost(props) {

    const authCtx = useContext(AuthContext)
    const postId  = props.match.params.id

    const { loading ,  data } = useQuery(FETCH_SINGLE_POST,{
        variables : {postId : postId}
    })


    if(!data && !loading){
        return (
            <h1>NO POST</h1>
        )
    }

    if(loading){
        return (
            <h1>Loading ...........</h1>
        )
    }

    return (
       <> 
       { data &&  <SinglePostComp post={data.getPost} /> }
       </>
    )
}
