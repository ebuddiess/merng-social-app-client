import React from 'react'
import { GridColumn } from 'semantic-ui-react'
import PostCard from './PostCard'


export default function Posts({posts}) {
    return (
        <>
        {posts.map(post=><GridColumn style={{marginBottom:"10px"}} key={post.id}><PostCard post={post}/></GridColumn>)}
        </>
    )
}
