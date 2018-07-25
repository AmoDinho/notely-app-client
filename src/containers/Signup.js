import React, {Component} from "react";
import {
    HelpBlock,
    FormGroup,
    FormControl,
    ControlLabel
} from 'react-bootstrap';
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";
import { Auth } from "aws-amplify";


export default class Signup extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
            newUser: null
        };
    }

    validateForm(){
        return(
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    validateConfirmationForm(){
        return this.state.confirmationCode.length > 0;
    }

    handleChange = event =>{
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    //Make a call to signup new user
    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading:true});
         //Save the new user
        try{
            const newUser = await Auth.signUp({
                username: this.state.email,
                password: this.state.password
            });
            this.setState({newUser});
        } catch(e){
            alert(e.message);
        }

        
       
        this.setState({isLoading:false});
    }

    //We try to confirm the user conf code
    handleConfirmationSubmit = async event => {
        event.preventDefault();
        
        this.setState({isLoading:true});

        try{//authenticate against the email and passwoord
            await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
            await Auth.signIn(this.state.email, this.state.password);

            this.props.userHasAuthenticated(true);
            //redirect
            this.props.history.push("/");
        }catch(e){
            alert(e.message);
            this.setState({isLoading:false});
        }
    }


    renderConfirmationForm(){
        return (
            <form onSubmit={this.handleConfirmationSubmit}>
            <FormGroup controlId="confirmationCode" bsSize="large">
            <ControlLabel>Confirmtion Code</ControlLabel>
             <FormControl
               autoFocus
               type="tel"
               value={this.state.confirmationCode}
               onChange={this.handleChange}
               />
               <HelpBlock>Please check your email for the code.</HelpBlock>
            </FormGroup>
            <LoaderButton 
               block
               bsSize = "large"
               disabled={!this.validateConfirmationForm()}
               isLoading={this.state.isLoading}
               loadingText ="Verify..."
               type="submit"
               text="Verify"
               />
            </form>
        );
    }

    renderForm(){
        return(
            <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl 
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl 
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl 
              type="password"
              value={this.state.ConfrimPassword}
              onChange={this.handleChange}
              />
            </FormGroup>
            <LoaderButton 
              block
              bsSize = "large"
              disabled={!this.validateForm()}
              isLoading={this.state.isLoading}
              loadingText ="Signing up..."
              type="submit"
              text="Sign Up"
              />
             
            </form>
        );
    }


    render(){
        return(
            <div className="SignUp">
            {this.state.newUser === null
            ? this.renderForm()
            : this.renderConfirmationForm()}
            </div>
        );
    }
}


