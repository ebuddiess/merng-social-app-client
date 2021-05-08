import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { Grid, Message } from 'semantic-ui-react';
import FETCH_POST_QUERY from '../ApolloProvider/queries/FETCH_POST_QUERY';
import Posts from '../components/Posts';
import { AuthContext } from '../context/auth';





  function Index(props) {

    const {loading , data , refetch } = useQuery(FETCH_POST_QUERY)

    useEffect(() => {
      refetch()
      //eslint-disable-next-line
    }, [data])

    
    const authCtx = useContext(AuthContext)
    useEffect(() => {
    if(authCtx.info){
      setTimeout(() => {
        authCtx.clearinfo()
      },1000);
    }
    //eslint-disable-next-line
    },[authCtx.info])
    return (
      <>
      { authCtx.info && <Message icon='bell' color='green' content={authCtx.info} /> }
      <Grid columns={3} divided>
         <Grid.Row>
           <h1>RECENT POSTS</h1>
         </Grid.Row>
      <Grid.Row>
        { loading ? (<h1>Loading Posts</h1>) : (<Posts posts={data.getPosts} />) }
      </Grid.Row>
      </Grid>
      </>
    )
}






export default Index