import React from 'react'
import PropTypes from 'prop-types'
import './Loginform.css'
const Loginform = props => {
    return (
        <div class="container mt-5 text-center ">
            <div class = "card card-size mx-auto">
            <form class="form-signin">
                {/* <img class="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"> */}
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div class="container">
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
                <label for="inputPassword" class="sr-only mt-2">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                </div>
                <div class="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me" /><span>Remember me</span> 
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                {/* <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p> */}
            </form>

            </div>
            
        </div>
    )
}

Loginform.propTypes = {

}

export default Loginform
