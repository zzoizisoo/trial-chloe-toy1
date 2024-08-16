import { Meteor } from 'meteor/meteor';
import React, { useState } from "react";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Button } from "@mui/joy";

export default () => { 
    const [signUpInfo, setSignUpInfo] = useState({
        email:'',
        name:'',
        password:'',
        passwordConfirm:'',
        phoneNumber:'',
        profileImgUrl:'',
    })

    const handleChange = (e) =>{ 
        const {name, value} = e.target;
        setSignUpInfo({...signUpInfo, [name]: value})
    }


    const handleSubmit = () =>{ 
        // validate if all required fields are filled -> Form의 기본 제공 기능을 쓰고싶은데! 
       if(!isFormValid){ 
            console.error('form is not valid')
       } else { 
            const {email, name, password, phoneNumber, profileImgUrl} = signUpInfo
            Accounts.createUser({
                email,
                password,
                profile:{ 
                    name,
                    profileImgUrl,
                    phoneNumber
                }
            },(err)=>{ 
                if(err) console.error(err);
                else FlowRouter.go('/')
            })
       }
    }

    const isRequiredFilled = signUpInfo.email && signUpInfo.name && signUpInfo.password && signUpInfo.passwordConfirm ? true:false

    const isFormValid = () => { 
        if(!isRequiredFilled){ 
            console.error('Required field is not filled');
            return false;
        } else if(signUpInfo.password !== signUpInfo.passwordConfirm) { 
            console.error('passwords are not matched')
            return false;
        } else return true;
    }; 
    
    
    return <>
        <h1> SignUp Page</h1>
        <form> 
            <div>
                Image Uploader Area
            </div>

            <div>
                <label htmlFor="email">* Email</label>
                <input name="email" type="text" value={signUpInfo.email} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor="name">* Name</label>
                <input name="name" type="text" value={signUpInfo.name} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor="password">* Password</label>
                <input name="password" type="password" value={signUpInfo.password} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor="passwordConfirm">* Password Confirm</label>
                <input name="passwordConfirm" type="password" value={signUpInfo.passwordConfirm} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input name="phoneNumber" type="tel" value={signUpInfo.phoneNumber} onChange={handleChange}/>
            </div>

            <Button onClick={() => FlowRouter.go('/')}> Cancel </Button>
            <Button onClick={handleSubmit} disabled={!isRequiredFilled}> OK </Button>
            <p>ok 버튼 누르기 말고 엔터도 submit 하고싶지만 일단 다음으로~~</p>
        </form>
    </>
}