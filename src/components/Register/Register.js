import React from "react";
import './Register.css'

// Sign in form using tachyons

// make this smart component as well.

// register is working on the server side, compare with sign in and make changes 
// here.
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
            message: ''
        }
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value});
    }

    onSubmitRegister = () => {
        // console.log(this.state);
        // second argument is for isSignedIn property
        // this.props.onRouteChange('homescreen', true);

        const obj = {
            name: this.state.registerName,
            email: this.state.registerEmail,
            password: this.state.registerPassword
        }
        
        fetch('https://rocky-bastion-94687.herokuapp.com/register', {
            method: 'POST', 
            headers: {  'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        }).then(response => response.json())
        .then(user => {
            if(user.id)
            {
                // this.props.resetImageUrl();
                this.props.loadUser(user);
                // second argument is for isSignedIn property
                this.props.onRouteChange('homescreen', true);
            }
            else
                this.setState({message : user});
        })

    }

    onEnter = (event) => {
        if(event.which === 13)
            this.onSubmitRegister();
    }

    render() {
        return(
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset idName="sign_up" className="ba b--transparent ph0 mh0">
                    <legend id="mine" className="fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input onChange={this.onNameChange} className="fonto pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                    </div>
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
                    <input onClick={this.onSubmitRegister} className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    </div>
                    <br/>
                    <div> {this.state.message} </div>
                </div>
            </main>
            </article>
        );
    }
}


export default Register;