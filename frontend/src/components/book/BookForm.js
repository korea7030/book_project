import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, change } from "redux-form";
import { createBook, getBookFormatOption } from '../../actions/book';
import { connect } from 'react-redux';
import store from '../../store';
import SearchForm from '../book/SearchForm';
import { Link, Redirect } from 'react-router-dom';

import axios from 'axios';
import history from '../../history';

class BookForm extends Component {
    constructor(props) {
        super(props);
        this.closeAPIModal = this.closeAPIModal.bind(this);
        this.state = {
            isModalOpen: false,
        }
        const { src } = this.props;
    }

    loadAPIModal() {
        this.setState({
            isModalOpen: true
        });
    }

    getAPIBookInfo = (values) => {
        this.props.change('title', values.title);
        this.props.change('subtitle', values.subtitle);
        this.props.change('author', values.authors);
        this.props.change('publisher', values.publisher);
        this.props.change('publish', values.datetime.split('T')[0]);
        this.props.change('translator', values.translators);
        this.props.change('ISBN', values.isbn);
        // this.props.change('book_image_uri', values.thumbnail);
        document.getElementsByName("book_image_uri")[0].src = values.thumbnail;

        axios.get(values.url, {
            withCredentials:true}).then(
            response => console.log(response.data)
        )
        // this.props.src = values.thumbnail;
        // this.props.change('book_image_uri', values.thumbnail);
        // this.updateField('title', values.title);
        // dispatch(change("book_form", 'title', values.title));

    }

    closeAPIModal = () => {
        this.setState({
            isModalOpen: false
        }, () => console.log(this.state.isModalOpen))
    
      }

    componentDidMount() {
        store.dispatch(getBookFormatOption());
    }

    // renderfield
    renderField = ({input, placeholder, type, label, writeOnce, meta: { touched, error }}) => {
        
        return (
            <div className={`w-full md:w-1/2 px-3 mb-6 md:mb-0 ${touched && error ? "error": "" }`}>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
                <input
                    {...input}
                    type={type}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    placeholder={placeholder}/>
                {touched && error && <span className="">{error}</span>}
            </div>
        )
    }

    imageField = ({input, label, meta: {touched, error}}) => {
        return (
            <div className={`w-full md:w-1/2 px-3 mb-6 md:mb-0 ${touched && error ? "error": "" }`}>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
                <img {...input} 
                src=""
                className="appearance-none block h-64 bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
                {touched && error && <span className="">{error}</span>}
            </div>
        )
    }
    // selectfield
    selectField = ({input, placeholder, index, label, meta: { touched, error } }) => {
        const optList = this.props.options && JSON.parse(this.props.options[index]).map((opt, i) => {
            console.log(opt, i);
            return (
                <option value={opt[0]} key={i}>
                    {opt[1]}
                </option>
            )
        });
        return (
            <div className={`w-full md:w-1/2 px-3 mb-6 md:mb-0  ${touched && error ? "error" : ""}`}>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
                <select {...input} className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option>{placeholder}</option>
                    {optList}
                </select>
                {touched && error && <span className="">{error}</span>}
            </div>
        );
    };

    handleSubmit = (values) => {
        // event.preventDefault();
        console.log(this.props.auth);
        values.author = values.author[0];
        if (values.translator.length == 0) {
            values.translator = '';
        }

        values.user = this.props.auth.user.pk;
        // // values.user = auth
        this.props.createBook(values);
    }

    render() {
        
        return (
            <div className="container mx-auto">
                <div className="w-full mb-10 flex justify-center">
                    <SearchForm onSelectBook={this.getAPIBookInfo} closeMe={this.closeAPIModal} isOpen={this.state.isModalOpen}></SearchForm>
                    <Link className="bg-blue-500 text-center hover:bg-blue-700 w-full block mt-5 mr-5 ml-5 py-3 justify-center items-center text-white font-bold border border-blue-700 rounded" to="#" onClick={this.loadAPIModal.bind(this)}>
                        Search Book Info
                    </Link>
                </div>
                
                <div className="w-full flex flex-wrap justify-center">
                    <form className="w-11/12 flex justify-center" name="book_form" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
                    <div className="flex flex-wrap -mx-3 mb-6 p-5">
                        <Field
                            name="book_image_uri"
                            label="Cover Image"
                            component={this.imageField}
                        >

                        </Field>
                        <Field
                            name="title"
                            type="text"
                            label="Title"
                            component={this.renderField}
                            placeholder="BookTitle"
                        >
                        </Field>
                        <Field
                            name="subtitle"
                            type="text"
                            label="SubTitle"
                            component={this.renderField}
                            placeholder="SubTitle"
                        >
                        </Field>
                        <Field
                            name="author"
                            type="text"
                            label="Author"
                            component={this.renderField}
                            placeholder="Author"
                        >
                        </Field>
                        <Field
                            name="translator"
                            type="text"
                            label="Translator"
                            component={this.renderField}
                            placeholder="Translator"
                        >
                        </Field>
                        <Field
                            name="publisher"
                            type="text"
                            label="Publisher"
                            component={this.renderField}
                            placeholder="Publisher"
                        >
                        </Field>
                        <Field
                            name="publish"
                            type="text"
                            label="Publish Date"
                            component={this.renderField}
                            placeholder="Publish Date"
                        >
                        </Field>
                        <Field
                            name="book_format"
                            type="text"
                            label="Format"
                            component={this.selectField}
                            placeholder="Format"
                            index="0"
                        >
                        </Field>
                        <Field
                            name="pages"
                            type="text"
                            label="Page"
                            component={this.renderField}
                            placeholder="Page"
                        >
                        </Field>
                        <Field
                            name="ISBN"
                            type="text"
                            label="ISBN"
                            component={this.renderField}
                            placeholder="ISBN"
                        >
                        </Field>
                        <Field
                            name="tag"
                            type="text"
                            label="Tag"
                            component={this.renderField}
                            placeholder="Tag"
                        >
                        </Field>
                        <div className="w-full ml-3">
                            <div className="w-full">
                            <button type="submit" className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 block w-full rounded">
                                Save
                            </button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
                
            </div>
            
        )
    };
}

const mapStateToProps = (state) => ({
    auth: state.user,
    options: state.book.formatOption
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({change}, dispatch);
 }

BookForm = connect(mapStateToProps, {  createBook, getBookFormatOption, mapDispatchToProps })(BookForm);

export default reduxForm({
    form: "BookForm",
})(BookForm);