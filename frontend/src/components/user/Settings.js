import  React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm, change } from "redux-form";
import store from '../../store';

import { userOption, userSettingUpdate } from '../../actions/user';

import history from '../../history';

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        store.dispatch(userOption());
    }

    renderField = ({input, placeholder, type, label, readonly, meta: {touched, error}}) => {
        return (
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
                </div>
                <div className="md:w-2/3">
                <input 
                    {...input}
                    type={type}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                />
                </div>
            </div>
        )
    };

    selectField = ({input, placeholder, value, index, label, meta: { touched, error } }) => {
        const optList = this.props.options && JSON.parse(this.props.options[index]).map((opt, i) => {
            console.log(opt[0]);
            return (
                <option value={opt[0] === value? opt[0] `selected`: opt[0]} key={i}>
                    {opt[1]}
                </option>
            )
        });
        return (
            <div className={`md:flex md:items-center mb-6 ${touched && error ? "error" : ""}`}>
                <div className="md:w-1/3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
                </div>
                <div className="md:w-2/3">
                    <select {...input} className="form-select mt-1 block">
                        <option>{placeholder}</option>
                        {optList}
                    </select>
                </div>
                {touched && error && <span className="">{error}</span>}
            </div>
        );
    };

    handleSubmit = (values) => {
        // event.preventDefault();
        let user_id = this.props.match.params.id;
        values.pk = user_id;
        // values.user = auth
        this.props.userSettingUpdate(user_id, values);
        history.push(`/settings/${user_id}`);
    }

    render() {
        const { user } = this.props.auth;
        
        return (
            
            <div className="mx-auto max-w-6xl p-12">
                { user  ? (
                <form className="w-full max-w-sm" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
                    <Field 
                        name="username"
                        type="text"
                        label="UserName"
                        component={this.renderField}
                    />
                    <Field 
                        name="email"
                        type="text"
                        label="Email"
                        component={this.renderField}
                    />
                    <Field
                        name="book_search_api"
                        type="text"
                        label="search API"
                        component={this.selectField}
                        index="0"
                        value={user.book_search_api}
                        placeholder={"Select Search API"}
                    />
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                            Save
                        </button>
                        </div>
                    </div>
                </form>
              ) : (
                <div></div>
              )}

            </div>
        )
    }
}

Settings = reduxForm({
    form: 'settings' ,
    enableReinitialize : true
})(Settings);

const mapStateToProps = state => (
    {
        
        auth: state.user,
        options: state.user.userOption,
        initialValues:{
            username: state.user.user.username,
            email: state.user.user.email,
            book_search_api: state.user.user.book_search_api
        }
    });

Settings = connect(mapStateToProps, {userSettingUpdate, userOption})(Settings);

export default Settings;

