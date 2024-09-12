import React from "react";
import { useSubscribe, useFind, useTracker } from "meteor/react-meteor-data";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import { IconButton, useTheme } from "@mui/joy";

import { UserFavorPosts } from "../../../api/userFavorPosts/collection";

export default FavoriteButton = () => {
  const postId = FlowRouter.getParam("pid");
  const theme = useTheme()

  const isLoading = useSubscribe("userFavorPost", postId);
  const userFavorPost = useTracker(() => {
    return UserFavorPosts.findOne({ postId, userId: Meteor.userId() });
  }, [postId, Meteor.userId()]);

  const handleToggleFavor = () => {
    Meteor.callAsync(
      "toggleFavorite",
      postId,
      userFavorPost?.isFavored ? false : true
    );
  };

  // 로오오오딩이 끝났는데도 왜 userFavorPost가 undefined 인지 🤔
  return (
    <IconButton
      onClick={handleToggleFavor}
      variant="plain"
      sx={{ position: "absolute", top: 30, right: 30 }}
    >
      {isLoading() ? (
        <></>
      ) : userFavorPost?.isFavored ? (
        <IoIosHeart style={{width: 40, height: 40, color: 'red'}} />
      ) : (
        <IoIosHeartEmpty style={{width: 40, height: 40, color: theme.palette.background.level3}} />
      )}
    </IconButton>
  );
};
