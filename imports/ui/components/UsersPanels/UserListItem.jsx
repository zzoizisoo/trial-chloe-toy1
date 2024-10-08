import React from "react";
import ProfileImg from "../ProfileImg";
import {
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Typography,
  ListItemContent,
} from "@mui/joy";
import moment from "moment";

export const UserListItem = ({ user, handleSelectUser }) => {
  return (
    <ListItem variant="soft" sx={{ mb: 0.5 }}>
      <ListItemButton onClick={() => handleSelectUser(user)}>
        <ListItemDecorator>
          <ProfileImg size="sm" src={user.profile?.profileImgUrl} />
        </ListItemDecorator>

        <Typography level="body-md">{user.profile?.name}</Typography>

        <Typography level="body-xs" fontStyle="italic">
          {user.status?.online
            ? "Live"
            : user.status?.lastLogin
            ? moment(user.status.lastLogin.date).fromNow()
            : ""}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
};
