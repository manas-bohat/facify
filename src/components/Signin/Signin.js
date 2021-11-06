import React from "react";
import './Signin.css'

// Sign in form using tachyons

// time to make signin a smart component.

// Line 11 because signin component receives props from the app component
class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          signInEmail: '',
          signInPassword: '',
          message: ''
        }
    }
    
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignin = () => {

        const obj = {
            email: this.state.signInEmail,
            password: this.state.signInPassword
        }
        
        fetch('http://localhost:3000/signin', {
            method: 'POST', 
            headers: {  'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        }).then(response => response.json())
        .then(data => {
            if(data.id)
            {
                // this.props.resetImageUrl();
                this.props.loadUser(data);
                // second argument is for isSignedIn property
                this.props.onRouteChange('homescreen', true);
            }
            else
                this.setState({message : data});
        })
        // console.log(this.state);
    }

    onEnter = (event) => {
        if(event.which === 13)
            this.onSubmitSignin();
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset idName="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="fonto pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} onKeyPress={this.onEnter} className="fonto b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSubmitSignin} className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register', false)} className="f6 link dim black db pointer">Register</p>
                        </div>
                        <div> {this.state.message} </div>
                    </div>
                </main>
            </article>
           
        );
    }
}

export default Signin;