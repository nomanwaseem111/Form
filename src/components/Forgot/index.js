import React, { useState } from 'react'
import Stack from "@mui/material/Stack"
import { Auth } from 'aws-amplify';
import swal from 'sweetalert';
import {useNavigate } from "react-router-dom"

const Index = () => {

    const navigate = useNavigate()


    const [userName, setUserName] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [code, setCode] = useState("")

    const [toggle, setToggle] = useState(false)
    async function forgotHandler(e) {
        e.preventDefault()
        try {
            const getEmail = await Auth.forgotPassword(userName);
            console.log("getEmail", getEmail);


            setUserName(userName)
            setToggle(true)

            swal({
                title: "Reset Email Sent",
                icon: "success",
                text: "We've sent further instructions to you. Please check your email.",
                button: false,
                timer: 3000,
            });


        } catch (error) {
            console.log('error signing in', error);

            swal({
                title: error,
                icon: "error",
                button: false,
                timer: 3000,
            });
        }
    }

    const updatePassword = async (e) => {
        e.preventDefault()

        console.log("UserName", userName);
        console.log("code", code);
        console.log("newPassword", newPassword);

        try {
            const updatePassword = await Auth.forgotPasswordSubmit(userName, code, newPassword);
            console.log("updatePassword", updatePassword);


            // Auth.currentAuthenticatedUser()
            // .then((user) => {
            //   return Auth.changePassword(userName, 'oldPassword', 'newPassword');
            // })
            // .then((data) => console.log(data))
            // .catch((err) => console.log(err));
            setNewPassword("")
            setConfirmPassword("")
             setCode("")
             navigate("/signin")
             

            swal({
                title: "Password Successfully Updated",
                icon: "success",
                button: false,
                timer: 3000,
            });


        } catch (error) {
            console.log('PasswordUpdated Error', error);

            //   swal({
            //     title: error,
            //     icon: "error",
            //     button: false,
            //     timer: 3000,
            //   });
        }


    }


    return (
        <>

            {
                toggle === false ?

                    <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
                        <h3 className='heading'>Enter your login email.
                            We'll send you a link to reset your password.
                        </h3>
                        <form onSubmit={forgotHandler}>
                            <input type="email" required name="forgotPassword" value={userName} onChange={(e) => setUserName(e.target.value)} className='input' placeholder='me@gmail.com' /><br />
                            <button type='submit' className='send-link' >Send Link</button>
                        </form>
                    </Stack> :

                    <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
                        <h3 className='heading'>
                            Set a new password

                        </h3>
                        <form onSubmit={updatePassword} >
                            <input type="password" required name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='input' placeholder='Enter Password' /><br /><br />
                            <input type="password" required name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='input' placeholder='Enter it again, to make sure you will never forget' /><br />
                            <input type="number" required name="code" value={code} onChange={(e) => setCode(e.target.value)} className='input' placeholder="Type your code" /><br />

                            <button type='submit' id='Update-link' >Update Password</button>
                        </form>
                    </Stack>
            }





        </>

    )
}

export default Index