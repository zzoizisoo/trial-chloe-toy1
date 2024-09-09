import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Button } from "@mui/joy";
import { ProfileImg } from "../components";
import { v4 as uuidv4 } from "uuid";
import { UploadObject } from "../../../s3";

export default () => {
  const [newProfileImg, setNewProfileImg] = useState(null);

  const handleImageChange = (e) => {
    setNewProfileImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (formJson.password !== formJson.passwordConfirm) {
      console.error("password is not matching");
      return;
    }
    delete formJson.passwordConfirm;

    const newUser = { profile: {} };
    Object.entries(formJson).forEach(([key, value]) => {
      if (key === "name" || key === "phoneNumber") {
        newUser.profile[key] = value;
      } else {
        newUser[key] = value;
      }
    });

    if (newProfileImg) {
      try {
        const fileId = uuidv4();
        const url = await UploadObject(
          `userProfileImg/${fileId}.png`,
          newProfileImg
        );
        // formJson['profile.profileImgUrl'] = url
        newUser.profile.profileImgUrl = url;
      } catch (e) {
        console.error(e);
      }
    }
    
    Accounts.createUser(newUser, error => {
        if(error) console.error(error)
        else FlowRouter.go('/')
    })
  };


  return (
    <>
      <h1> SignUp Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Profile Image
          <ProfileImg
            src={newProfileImg ? URL.createObjectURL(newProfileImg) : ""}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <hr />

        <label>
          * Email
          <input name="email" type="text" required />
        </label>

        <hr />

        <label>
          * Name
          <input name="name" type="text" required />
        </label>

        <hr />

        <label>
          * Password
          <input name="password" type="password" required />
        </label>

        <hr />

        <label>
          * Password Confirm
          <input name="passwordConfirm" type="password" required />
        </label>

        <hr />

        <label>
          Phone Number
          <input name="phoneNumber" type="tel" />
        </label>

        <hr />
        <Button onClick={() => FlowRouter.go("/")}> Cancel </Button>
        <Button type="submit"> OK </Button>
      </form>
    </>
  );
};
