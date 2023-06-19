import React, { useState } from 'react';
import './Register.css'
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from '../../firebase/firebase.config';



const auth = getAuth(app);


const Register = () => {

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = (event) => {
        // prevent page refresh
        event.preventDefault();
        setSuccess('')
        setError('')

        // get email, pass
        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log(email, password);

        // validation
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please use at least 1 uppercase letter.')
            return;
        }
        else if (!/(?=.*\d)/.test(password)) {
            setError('Please use at least 1 digit')
            return;
        }
        else if (password.length < 6) {
            setError('Please use at least six characters')
            return;
        }



        // create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const loggedUser = userCredential.user;
                console.log(loggedUser);
                setError('')
                event.target.reset();
                setSuccess('User has been created succesfully!')
                verifyEmail(loggedUser)
                // ...
            })
            .catch((error) => {
                console.log(error)
                setError(error.message)
                // ..
            });
    }

    const verifyEmail = (user) => {
        const auth = getAuth();
        sendEmailVerification(user)
            .then(() => {
                // Email verification sent!
                // ...
            });
    }

    // const handleEmailnChange = (event) => {
    //     setEmail(event.target.value)
    // }


    return (
        <div>
            <h1>Please Register</h1>
            <form onSubmit={handleSubmit}>
                <input className='email-field' type="email" name="email" id="email" placeholder='your email' required /><br />
                <input className='pass-field' type="password" name="password" id="password" placeholder='enter password' required /><br />
                <p className='alert-msg'>{error}</p>
                <p>{success}</p>
                <br />
                <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
                <input className='register-btn' type="submit" value="Register" />

            </form>


        </div>
    );
};

export default Register;