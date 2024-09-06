import React from "react";
import { AspectRatio, Typography, Card, Grid } from "@mui/joy";
import { FaEye, FaCommentAlt } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";

export default ({
  title,
  description,
  imageUrl,
  favorCount,
  commentsCount,
  viewCount,
  onClick,
}) => {
  return (
    <Grid xs={5} md={1} onClick={onClick}>
      <Card orientation="vertical" size="sm" variant="soft">
        <img
          src={imageUrl}
          //??? srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />

        <Typography level="title-lg">{title}</Typography>
        <Typography level="body-sm">{description}</Typography>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ flex: 1, display:'flex', alignItems: 'center'}}>
            <IoIosHeart /> <span>{favorCount || 0}</span>
          </div>

          <div style={{ flex: 1, display:'flex', alignItems: 'center'}}>
            <FaCommentAlt /> <span>{commentsCount || 0}</span>
          </div>

          <div style={{ flex: 1, display:'flex', alignItems: 'center'}}>
            <FaEye />
            <span>{viewCount || 0}</span>
          </div>
        </div>
      </Card>
    </Grid>
  );
};
