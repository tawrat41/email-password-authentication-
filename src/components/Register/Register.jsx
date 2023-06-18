import React from 'react';
import './Register.css'

const Register = () => {
    return (
        <div>
            <h1>Please Register</h1>
            <form>
                <input className='email-field' type="email" name="email" id="email" placeholder='your email' /><br />
                <input className='pass-field' type="password" name="password" id="password" placeholder='enter password'/><br />
                <br />
                <input className='register-btn' type="submit" value="Register" />

            </form>


        </div>
    );
};

export default Register;