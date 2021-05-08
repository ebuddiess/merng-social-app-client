
import { useQuery } from '@apollo/client';
import React from 'react';
import FETCH_SINGLE_POST from '../ApolloProvider/queries/FETCH_SINGLE_POST';
import SinglePostComp from '../components/SinglePost';







export default function SinglePost(props) {

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
