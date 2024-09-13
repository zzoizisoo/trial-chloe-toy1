import { Meteor } from "meteor/meteor";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { throttle } from "../../utils";
import { SearchBar } from "./SearchBar";
import { UserListItem } from "./UserListItem";
import { List } from "@mui/joy";

export default function UserList({ handleSelectUser }) {
  const [searchInput, setSearchInput] = useState("");
  const PAGINATION_SIZE = 20;
  const [pageLength, setPageLength] = useState(PAGINATION_SIZE);

  const usersProfilesLoading = useSubscribe(
    "usersProfiles",
    searchInput,
    pageLength
  );

  // 🤔 If you dont call this function, no re-render will occur when the loading state change
  // w.o this call -> pagination after setting search input is not occur
  console.log('userProfilesIsLoading?', usersProfilesLoading())

  const users = useTracker(
    () =>
      Meteor.users
        .find(
          searchInput
            ? {
                "profile.name": {
                  $regex: searchInput.replace(/[-[\]{}()*+?.,\\^$|]/g, "\\$&"),
                  $options: "i",
                },
              }
            : {},
          {
            sort: {
              "status.online": -1,
              "status.lastLogin.date": -1,
            },
            limit: pageLength,
          }
        )
        .fetch(),
    [searchInput, pageLength]
  );

  const onInputChange = (e) => {
    setSearchInput(e.target.value);
    setPageLength(PAGINATION_SIZE)
  };

  const onScroll = throttle(
    ({ target: { clientHeight, scrollHeight, scrollTop } }) => {
      const PAGING_THRESHHOLD = 100;
      console.log('-------throttled: userProfilesLoading?', usersProfilesLoading())
      if (
        !usersProfilesLoading() &&
        Math.abs(scrollTop) + clientHeight + PAGING_THRESHHOLD > scrollHeight
      ) {
        console.log('-------page length set', !usersProfilesLoading())
        setPageLength(pageLength + PAGINATION_SIZE);
      }
    },
    1000
  );

  return (
    <div style={{ flex: "1.5", display: "flex", flexDirection: "column" }}>
      <SearchBar searchInput={searchInput} onInputChange={onInputChange} />
      <List onScroll={onScroll} sx={{ overflow: "auto" }}>
        {/* Bypassing props */}
        {users &&
          users.map((u) => (
            <UserListItem
              key={u._id}
              handleSelectUser={handleSelectUser}
              user={u}
            />
          ))}
      </List>
    </div>
  );
}
