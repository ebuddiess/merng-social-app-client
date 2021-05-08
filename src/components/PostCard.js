import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import DeleteButton from './DeleteButton'
import LikeButton from './LikeButton'



export default function PostCard({post}) {


    
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

    <Button as='div' labelPosition='right'>
      <Button color='blue' basic  as={Link} to={`/posts/${post.id}`}>
        <Icon name='comment' />
      </Button>
      <Label as='a' basic color='blue' pointing='left'>
        {post.comments.length}
      </Label>
    </Button>

    <DeleteButton post={post} />
    
      </Card.Content>
    </Card>
    )
}
