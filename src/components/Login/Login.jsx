import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const emailRef = useRef();

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

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const loggedUSer = userCredential.user;
                setError('')
                event.target.reset();
                setSuccess('User login has been succesful!')
                console.log(loggedUSer);

                // if(!loggedUSer.emailVerified){
                //     setError('Please verify your email first and then login.')
                //     return;
                // }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }

    const hadndleResetPassword = event => {
        const email = emailRef.current.value;
        console.log(email)
        if (!email) {
            alert('pls provide email')
            return
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
                alert("pls check your email")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }

    return (
        <div>
            <h1>Please login</h1>
            <form onSubmit={handleSubmit}>
                <input className='email-field' type="email" name="email" id="email" placeholder='your email'ref={emailRef} required /><br />
                <input className='pass-field' type="password" name="password" id="password"  placeholder='enter password' required /><br />
                <p><small>Forgot your password? Please <button onClick={hadndleResetPassword}>Reset password</button></small></p>
                <p className='alert-msg'>{error}</p>
                <p>{success}</p>
                <br />
                <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
                <input className='register-btn' type="submit" value="Login" />

            </form>
        </div>
    );
};

export default Login;