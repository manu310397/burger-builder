import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        signUpForm: {
            email: {
                label: "Email",
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            password: {
                label: "Password",
                elementType: 'input',
                elementConfig: {
                    type: 'Password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount(){
        if(!this.props.burgerBuilding && this.props.authRedirect !== '/')
            this.props.onSetAuthRedirect();
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedSignUpForm = {
            ...this.state.signUpForm,
            [controlName]: {
                ...this.state.signUpForm[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.signUpForm[controlName].validation),
                touched: true
            }
        }
        this.setState({signUpForm: updatedSignUpForm});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.signUpForm.email.value, 
                            this.state.signUpForm.password.value,
                            this.state.isSignup);
    }

    authModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render() {
        let formElementsArray = [];
        for(let key in this.state.signUpForm){
            formElementsArray.push({
                id: key,
                config: this.state.signUpForm[key]
            });
        }

        let form = formElementsArray.map(formElement => {
            return <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        label={formElement.config.label}
                        inValid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
        })

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error}</p>
            )
        }

        let authRedirect = null;
        if(this.props.isauthenticated){
            authRedirect = <Redirect to={this.props.authRedirect} />
        }
        return (
            <div className={classes.AuthData}>
            {authRedirect}
            {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                clicked={this.authModeHandler}
                btnType="Danger">SWITCH TO {this.state.isSignup?'SIGN IN':'SIGN UP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isauthenticated: state.auth.token != null,
        authRedirect: state.auth.authRedirect,
        burgerBuilding: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirect: () => dispatch(actions.setAuthRedirect('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);