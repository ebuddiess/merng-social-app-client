import React , {useEffect , useState , useContext }from 'react'
import { Icon , Label,  Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom';

import LikeQuery from '../ApolloProvider/queries/LIKE_QUERY'
import { useMutation  } from '@apollo/client';
import {AuthContext} from '../context/auth';



export default function LikeButton({post}) {
    const authCtx = useContext(AuthContext)
    const [like, setlike] = useState(false)

    useEffect(() => {

        if(authCtx.user && post.likes.find(like => like.email === authCtx.user.email)){
            setlike(true)
        }else{
            setlike(false)
        }
//eslint-disable-next-line
    }, [post.likes])

    const likeHandler = () => { 
        likePost()
    }

    const [likePost,] = useMutation(LikeQuery,{
        update(cache,result){
        },
        onError(err){
            console.log(err)
        },
        variables : { postId : post.id}
    });

    const likeButton = authCtx.user ? (
        like ? (<Button color='red'  onClick={likeHandler}>
        <Icon name='heart' />
        Like
      </Button>) :(<Button color='red'basic onClick={likeHandler}>
          <Icon name='heart' />
          Like
        </Button>)
    ) : (<Button color='teal' as={Link} to="/login" basic onClick={likeHandler}>
    <Icon name='heart' />
    Like
  </Button>)  

    return (
        <Button as='div' labelPosition='right'>
         { likeButton}   
        <Label as='a' basic color='red' pointing='left'>
          {post.likes.length}
        </Label>
      </Button>
    )
}
