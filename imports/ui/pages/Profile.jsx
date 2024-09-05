import { Button } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { UploadObject } from "../../../s3";
import { useTracker } from 'meteor/react-meteor-data';

import { v4 as uuidv4 } from 'uuid';

const INITIAL_PROFILE_STATE = {
    name: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: ''
}

export default () => {
    const user = useTracker(() => Meteor.user(), [])
    const [userInfo, setUserInfo] = useState(INITIAL_PROFILE_STATE)
    const [newProfileImg, setNewProfileImg] = useState(undefined)
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)

    useEffect(()=>{console.log(newProfileImg)},[newProfileImg])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value })
    }

    const handleImageChange = (e) => {
        const [file] = e.target.files
        setNewProfileImg(file)
    }

    const isSubmitAvailable = () => {
        if (Object.values(userInfo).every(val => val === '') && !newProfileImg) return false;
        // TODOS: 기존 데이터와 같은지 비교
        // 비밀번호 두 개가 동일허냐 
        if (userInfo.password !== userInfo.passwordConfirm) return false;
        return true;
    }

    const handleSubmit = async () => {
        setIsSubmitLoading(true)
        // TODOS: validation
        let res;
        try {
            if (newProfileImg) {
                const fileId = uuidv4();
                const url = await UploadObject(`userProfileImg/${fileId}.png`, newProfileImg)
                res = await Meteor.callAsync('updateUserProfile', { ...userInfo, profileImgUrl: url })
            }
            // TODOS: 암호변경도 분리해야되나? ㅁㅊ..... 왜냐면 암호화가 전혀 안될거같애 UX가 망했어
            else res = await Meteor.callAsync('updateUserProfile', userInfo)
            //비밀번호 바꾼 다음 로그아웃 시킬 거임? 일단 지금은 아님. 다른 디바이스에서만 로그아웃 하면 되지않나? 
            console.log(res)
            setUserInfo(INITIAL_PROFILE_STATE)
            setIsSubmitLoading(false)
        } catch (err) {
            console.error(err);
        }
    }

    const logout = () => {
        Meteor.logout();
        FlowRouter.go('/')
    }


    return (
        <>
            <h1> Profile</h1>

            <form>
                <div>
                    <label htmlFor="profileImg" style={{ display: 'none' }}>Profile Image</label>
                    <img src={newProfileImg ? URL.createObjectURL(newProfileImg) : user?.profile?.profileImgUrl} />
                    <input name="profileImg" type="file" accept='image/*' onChange={handleImageChange} />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input name="email" type='text' value={userInfo.email || user?.emails[0].address} disabled />
                </div>

                <div>
                    <label htmlFor="name">Name</label>
                    <input name="name" type='text' onChange={handleChange} value={userInfo.name || user?.profile?.name} />
                </div>

                <div>
                    <label htmlFor="password">New Password</label>
                    <input name="password" type='password' onChange={handleChange} value={userInfo.password} />
                </div>

                <div>
                    <label htmlFor="passwordConfirm">New Password Confirm</label>
                    <input name="passwordConfirm" type='password' onChange={handleChange} value={userInfo.passwordConfirm} />
                </div>

                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input name="phoneNumber" type='text' onChange={handleChange} value={userInfo.phoneNumber || user?.profile?.phoneNumber} />
                </div>

                <div>
                    <Button> Cancel </Button>
                    <Button onClick={handleSubmit} disabled={!isSubmitAvailable()}> {isSubmitLoading ? "Loading" : "OK"} </Button></div>
                <Button onClick={logout}>Log out</Button>
            </form>
        </>)
}