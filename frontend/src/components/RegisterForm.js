import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { register, emailCheck } from '../actions/user';
import store from "../store";

import axios from "axios";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
    }

    emailValidate(value) {
        return this.props.emailCheck(value);
    }

    renderField = ({ input, placeholder, type, meta: {touched, error} }) => {
        // console.log(input);
        console.log(error);
        return (
            <div className={`mt-2 ${touched && error ? "error" : ""}`}>
                
                <label className="block text-sm text-gray-00" htmlFor={input.name}>{input.name}</label>
                <input 
                    {...input}
                    type={type}
                    className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                    placeholder={placeholder}
                />
                {touched && error && <span className="">{error}</span>}
            </div>
        );
    };

    hiddenField = ({type, meta: { error }}) => {
        return (
            <div className="form-label-group">
                <input type={type} />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        );
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const username = event.target.username.value;
        const password = event.target.password.value;
        this.props.register({email, username, password});
    }

    render() {
        return (
            <>
            <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                <div className="w-full max-w-lg">
                    <div className="leading-loose">
                    <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl" onSubmit={this.handleSubmit}>
                        <p class="text-gray-800 font-medium">Register</p>
                        <Field
                            name="email"
                            type="email"
                            component={this.renderField}
                            placeholder="Email *"
                            validate={[emailValidCheck, emailDuplicateCheck]}
                        />
                        <Field
                            name="username"
                            type="text"
                            component={this.renderField}
                            placeholder="Username *"
                        />
                        <Field 
                            name="password"
                            type="password"
                            component={this.renderField}
                            placeholder="Password *"
                        />
                        <Field
                            name="non_field_errors"
                            type="hidden"
                            component={this.hiddenField}
                        />
                        <div className="mt-4">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Register
                            </button>
                        </div>
                        <a class="inline-block right-0 align-baseline font-bold text-sm text-500 hover:text-blue-800" href="login.html">
                            Already have an account ?
                        </a>
                    </form>
                    </div>
                </div>
            </div>
        </>
            
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

// email validate
const emailValidCheck = (value) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value)? (null): (<span className="block sm:inline text-red-700">please check email format check</span>)
}

const emailDuplicateCheck = async (value) => {
    return await axios.get(`/accounts/user/email/validate?email=${value}`).then((response) => {
    }).catch(response => {
        return response.data.msg === 'Email Address Available'? 
            (<span className="block sm:inline text-green-500">response.data.msg</span>): 
            (<span className="block sm:inline text-red-700">response.data.msg</span>);
    });
}

RegisterForm = connect(mapStateToProps, {register, emailCheck})(RegisterForm);

export default reduxForm({
    form: "RegisterForm"
})(RegisterForm);