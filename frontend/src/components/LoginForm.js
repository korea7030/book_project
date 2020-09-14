import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { login } from '../actions/user';
import { Link, Redirect } from 'react-router-dom';


class LoginForm extends Component {
    renderField = ({ input, placeholder, type, meta: {touched, error} }) => {
        // console.log(input);
        return (
            <div className={`mb-4 ${touched && error ? "error" : ""}`}>
                
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
        const password = event.target.password.value;
        this.props.login({email, password});
        // console.log(event.target.elements);
        // console.log(event.target.email);
    }

    render() {
        if (this.props.isAuthenticated) {
            let user = this.props.user;
            return <Redirect to={`/main/${user.pk}`} />;
        }
        
        return (
            <>
            <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                <div className="w-full max-w-lg">
                    <div className="leading-loose">
                    <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl" onSubmit={this.handleSubmit}>  
                        <Field
                            name="email"
                            type="email"
                            component={this.renderField}
                            placeholder="Email *"
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
                        <div className="mt-4 items-center justify-between">
                        <button type="submit" className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded">
                            Sign In
                        </button>
                        <div className='flex justify-between'>
                            <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mr-5" to="/register">
                                Register
                            </Link>
                            <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/reset">
                                Forgot Password?
                            </Link>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            </>
            
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

LoginForm = connect(mapStateToProps, {login})(LoginForm);

export default reduxForm({
    form: "LoginForm"
})(LoginForm);