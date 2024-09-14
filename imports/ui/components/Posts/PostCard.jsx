import React from "react";
import {
  AspectRatio,
  Typography,
  Card,
  Grid,
  CardOverflow,
  CardContent,
} from "@mui/joy";
import { FaEye, FaCommentAlt } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import FlexBox from "../FlexBox";


export default ({ post }) => {
  const {
    _id,
    title,
    description,
    imageUrl,
    favorCount,
    commentsCount,
    viewCount,
  } = post;

  const onPostClick = () => {
    if (!Meteor.user()) return;
    FlowRouter.go(`/post/${_id}`);
  };

  return (
    <Grid xs={5} sm={2.5} md={1} onClick={onPostClick}>
      <Card
        orientation="vertical"
        size="sm"
        variant="soft"
        sx={{ height: 230, p: 2 }}
      >
        {imageUrl && (
          <CardOverflow sx={{maxHeight: '55%', overflow:'hidden'}}>
            <AspectRatio  ratio={1.5}>
              <img
                src={imageUrl}
                //??? srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
          </CardOverflow>
        )}
        <CardContent sx={{justifyContent: 'space-between'}}>
          <Typography
            level="title-md"
            sx={{
              flexGrow: 1,
              alignContent: "center",
              maxHeight: imageUrl ? '1lh' : '5lh',
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
          <Typography
            level="body-xs"
            sx={{ maxHeight: imageUrl ? '2lh' : '3lh', overflow: "hidden" }}
          >
            {description}
          </Typography>

          <FlexBox justify="flex-start">
            <Typography level="text-sm" startDecorator={<IoIosHeart />}>
              {favorCount || 0}
            </Typography>

            <Typography level="text-sm" startDecorator={<FaCommentAlt />}>
              {commentsCount || 0}
            </Typography>

            <Typography level="text-sm" startDecorator={<FaEye />}>
              {viewCount || 0}
            </Typography>
          </FlexBox>
        </CardContent>
      </Card>
    </Grid>
  );
};
