import React from 'react'
import PropTypes from 'prop-types'

const NewUserForm = props => {
    return (
        <div>
            <div class="card bg-light">
                <article class="card-body mx-auto" >
                    <h4 class="card-title mt-3 text-center">Create Account</h4>
                    <p class="text-center">Signup to get started</p>

                    
                    <form>
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                        </div>
                        <input name="" class="form-control" placeholder="Full name" type="text" />
                    </div> 
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                        </div>
                        <input name="" class="form-control" placeholder="Email address" type="email" />
                    </div>
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
                        </div>
                        <select class="custom-select">
                            <option selected="">+62</option>
                        </select>
                        <input name="" class="form-control" placeholder="Phone number" type="text" />
                    </div> 
                    {/* <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-building"></i> </span>
                        </div>
                        <select class="form-control">
                            <option selected=""> Select job type</option>
                            <option>Designer</option>
                            <option>Manager</option>
                            <option>Accaunting</option>
                        </select>
                    </div>  */}
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                        </div>
                        <input class="form-control" placeholder="Create password" type="password" />
                    </div> 
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                        </div>
                        <input class="form-control" placeholder="Repeat password" type="password" />
                    </div>                                       
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block"> Create Account  </button>
                    </div>       
                    <p class="text-center">Have an account? <a href="/login">Log In</a> </p>
                </form>
                </article>
                </div> 

                </div> 



    )
}

NewUserForm.propTypes = {

}

export default NewUserForm
