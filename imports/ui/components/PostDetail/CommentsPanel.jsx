import React from 'react'
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { CommentsCollection } from '../../../api/comments/collection';

import CommentInput from './CommentInput'
import CommentItem from './CommentItem';

export default () => {
    const postId = FlowRouter.getParam("pid")
    
    const isCommentsLoading = useSubscribe('postComments', postId)
    const comments = useFind(()=>CommentsCollection.find({postId}),[postId])

    return <div> 
        Comments
            <CommentInput />
            {!isCommentsLoading() && 
            comments && comments.map(c => <CommentItem key={c._id} comment={c}/>)
        }
        </div>
}