import React, { useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Button, Typography, Input, useTheme } from "@mui/joy";
import { FlexBox, InputProfileImg, InputProfileInfo } from "../components";
import { v4 as uuidv4 } from "uuid";
import { UploadObject } from "../../../s3";
import { FaPhone } from "react-icons/fa6";
import { AiFillMail } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";

export default () => {
  const [newProfileImg, setNewProfileImg] = useState(null);
  const [errors, setErrors] = useState({});
  const theme = useTheme();

  const handleImageChange = (e) => {
    if(e.target.files[0].size > 3000000 ){ 
      alert("이미지 사이즈는 3MB 이하로 부탁드립니다용?")
      return;
    }
    setNewProfileImg(e.target.files[0]);
  };

  const handleFormChange = ({ target }) => {
    const { name, value, form } = target;
    switch (name) {
      case "email":
        if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          setErrors({ ...errors, [name]: "invalid format" });
        } else {
          setErrors({ ...errors, [name]: "" });
        }
        break;
      case "password":
        if (value.length < 6) {
          setErrors({
            ...errors,
            [name]: "needs to be grater than 6 character",
          });
        } else if (
          !value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_]).{6,}$/)
        ) {
          setErrors({
            ...errors,
            [name]: "use at least one alphabet, number, special character",
          });
        } else {
          setErrors({ ...errors, [name]: "" });
        }
        break;
      case "passwordConfirm":
        const formData = new FormData(form);
        const { password } = Object.fromEntries(formData.entries());
        if (!password) {
          setErrors({ ...errors, [name]: "please type password first" });
        } else if (password !== value) {
          setErrors({ ...errors, [name]: "passwords are not matching" });
        } else {
          setErrors({ ...errors, [name]: "" });
        }
        break;
    }
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
        newUser.profile.profileImgUrl = url;
      } catch (e) {
        console.error(e);
      }
    }

    Accounts.createUser(newUser, (error) => {
      if (error) console.error(error);
      else FlowRouter.go("/");
    });
  };

  return (
    <>
      <Typography level="h2" textAlign="center" mb={4} mt={6} fontSize="1.5rem">
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit} onChange={handleFormChange}>
        <InputProfileImg
          src={newProfileImg ? URL.createObjectURL(newProfileImg) : ""}
          handleImageChange={handleImageChange}
          handleDeleteImage={()=>setNewProfileImg(null)}
        />

        <InputProfileInfo
          formDisplayLabel="* Email"
          name="email"
          type="text"
          icon={<AiFillMail color={theme.palette.primary[500]} />}
          error={errors.email}
          required
        />

        <InputProfileInfo
          formDisplayLabel="* Name"
          name="name"
          type="text"
          icon={<FaUser color={theme.palette.primary[500]} />}
          required
        />

        <InputProfileInfo
          formDisplayLabel="* Password"
          name="password"
          type="password"
          icon={<MdLock color={theme.palette.primary[500]} />}
          error={errors.password}
          required
        />

        <InputProfileInfo
          formDisplayLabel="* Password Confirm"
          name="passwordConfirm"
          type="password"
          icon={<MdLock color={theme.palette.primary[500]} />}
          error={errors.passwordConfirm}
          required
        />

        <InputProfileInfo
          formDisplayLabel="Phone Number"
          name="phoneNumber"
          type="tel"
          icon={<FaPhone color={theme.palette.primary[500]} />}
        />

        <FlexBox justify="center" style={{ marginTop: 50 }}>
          <Button
            sx={{ width: "6rem", mr: 1 }}
            variant="outlined"
            onClick={() => FlowRouter.go("/")}
          >
            Cancel
          </Button>
          <Button sx={{ width: "6rem", mr: 1 }} type="submit">
            OK
          </Button>
        </FlexBox>
      </form>
    </>
  );
};
