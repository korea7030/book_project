import React, {Component} from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import history from "../../history";
import { getBookFormatOption, updateBook } from '../../actions/book';
import DatePicker from 'react-datepicker';
import { Field, reduxForm } from 'redux-form';

class BookEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            finishDate: null
        }
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleFinishChange = this.handleFinishChange.bind(this);
    }

    closeEdit = () => {
        this.props.onRequestClose();
    }

    handleDateChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    handleFinishChange = (date) => {
        this.setState({
            finishDate: date
        });
    }

    handleSubmit = (values) => {
        let bookId = this.props.bookId;

        this.props.updateBook(bookId, values);
        this.closeEdit();
    }

    componentDidMount() {
        store.dispatch(getBookFormatOption());
    }

    renderField = ({input, placeholder, type, label, className, writeOnce, meta: { touched, error }}) => {
        
        return (
            <div className="flex flex-wrap items-center ml-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
                <input {...input} 
                    type={type}
                    className={className}
                    placeholder={placeholder}
                    required={true}
                    />
                {touched && error && <span className="block sm:inline">{error}</span>}
            </div>
        )
    }
    // selectfield
    selectField = ({input, placeholder, index, label, meta: { touched, error } }) => {
        const optList = this.props.options && JSON.parse(this.props.options[index]).map((opt, i) => {
            return (
                <option value={opt[0]} key={i}>
                    {opt[1]}
                </option>
            )
        });
        return (
            <div className={`flex flex-wrap mb-6 items-center`}>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
                <select {...input} className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option>{placeholder}</option>
                    {optList}
                </select>
                {touched && error && <span className="">{error}</span>}
            </div>
        );
    };

    DateRenderField = ({input, selected, className, changefunc, label, meta: {touched, error}}) => {
        return (
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {label}
                    </label>
                    <DatePicker
                        {...input}
                        selected={ selected }
                        // onChange={ changefunc }
                        minDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        className={className}
                    />
                </div>
                {touched && error && <span className="block sm:inline text-red-700">{error}</span>}
            </div>
        )
    }

    render() {
        return (
            this.props.isOpen? (
                <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Book
                  </h3>
                  <button
                    type="button" className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={this.closeEdit}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex mb-4">
                <div className="w-full">
                    <form className="w-full max-w-lg" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
                        <div className="flex flex-wrap mx-6 mt-3">
                        <Field 
                            name="started_reading"
                            label="start date"
                            selected={this.state.startDate}
                            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            onChange={this.handleDateChange.bind(this)}
                            component={this.DateRenderField}
                        />
                        <Field 
                            name="finished_reading"
                            label="start date"
                            selected={this.state.finishDate}
                            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ml-3"
                            onChange={this.handleFinishChange.bind(this)}
                            component={this.DateRenderField}
                        />
                        </div>
                        
                        <div className="flex flex-wrap mx-6 mt-3">
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
                                type="number"
                                label="Page"
                                component={this.renderField}
                                placeholder="Start Page"
                                className='block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-11/12'
                            />
                        </div>

                        <div className="flex flex-wrap items-center py-2 mx-6 mt-3">
                            <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                            Edit
                            </button>
                            <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button" onClick={this.closeEdit}>
                            Cancel
                            </button>
                        </div>
                    </form>
                </div>
                
            </div>
                
              </div>
              
            </div>
            
          </div>
            ) : (<div></div>)
        );
    }
}

BookEdit = reduxForm({
    form: "BookEdit"
})(BookEdit);


// initialvalues from component props
const mapStateToProps = (state, ownProps) => ({
    auth: state.user,
    options: state.book.formatOption,
    initialValues:{
        started_reading: ownProps.started_reading,
        finished_reading: ownProps.finished_reading,
        pages: ownProps.pages,
        book_format: ownProps.book_format
    }
    
});

BookEdit = connect(mapStateToProps, {getBookFormatOption, updateBook})(BookEdit);

export default BookEdit;