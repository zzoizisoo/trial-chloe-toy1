

import React from 'react';
import { useSubscribe, useFind, useTracker } from 'meteor/react-meteor-data'
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

import { Button } from "@mui/joy";

import { UserFavorPosts } from '../../../api/userFavorPosts/collection';

export default FavoriteButton = () => {
    const postId = FlowRouter.getParam("pid")

    const isLikeLoading = useSubscribe('postIsLikedByThisUser', postId)
    const isLikedPost = useFind(() => UserFavorPosts.find({ postId: postId, userId: Meteor.userId() }), [postId, Meteor.userId()])

    const handleToggleLike = () => {
        Meteor.callAsync( isLikedPost[0]?.isLiked ? 'unFavorite' : 'addFavorite', postId)
    }

    return <Button onClick={handleToggleLike} sx={{position: 'absolute', 'top': 0, 'right': 0}}>
        {isLikeLoading() ? <></> : isLikedPost[0]?.isLiked ? <IoIosHeart /> : <IoIosHeartEmpty />}
    </Button>
}