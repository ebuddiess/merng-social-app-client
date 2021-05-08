import React , {useContext} from 'react'
import { Card , Icon , Label , Image ,  Button} from 'semantic-ui-react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth'
import LikeButton from './LikeButton'
import Comments from './Comments'
import DeleteButton from './DeleteButton';



export default function SinglePost(props) {
  const {post} = props

    return (
          <Card fluid >
          <Card.Content>
          <Image
          floated='right'
          size='mini'
          src='https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png'
        />
        <Card.Header>{post.username}</Card.Header>
        <Card.Meta>{moment(post.createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {post.body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <LikeButton post={post} />

      <DeleteButton post={post} />

    <Comments post={post} />
      </Card.Content>
    </Card>
    )
}
