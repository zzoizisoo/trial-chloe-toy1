

import React from 'react';
import { useSubscribe, useFind, useTracker } from 'meteor/react-meteor-data'
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

import { Button } from "@mui/joy";

import { UserFavorPosts } from '../../../api/userFavorPosts/collection';

export default FavoriteButton = () => {
    const postId = FlowRouter.getParam("pid")

    const isLoading = useSubscribe('userFavorPost', postId)
    const userFavorPosts = useFind(() => UserFavorPosts.find({ postId: postId, userId: Meteor.userId() }), [postId, Meteor.userId()])

    const handleToggleFavor = () => {
        Meteor.callAsync( userFavorPosts[0]?.isFavored ? 'unFavorite' : 'addFavorite', postId)
    }

    return <Button onClick={handleToggleFavor} sx={{position: 'absolute', 'top': 0, 'right': 0}}>
        {isLoading() ? <></> : userFavorPosts[0]?.isFavored ? <IoIosHeart /> : <IoIosHeartEmpty />}
    </Button>
}