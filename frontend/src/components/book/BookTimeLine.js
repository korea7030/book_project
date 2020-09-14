import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { searchTimeLine, deleteTimeLine, addTimeLine} from '../../actions/book';
import Pagination from 'react-js-pagination';
import store from '../../store';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import history from '../../history';

import "react-datepicker/dist/react-datepicker.css";
// moment warning message prevent
Moment.suppressDeprecationWarnings = true;

class BookTimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            startDate: null,
            startTime: null,
            enTdime: null
        };
        // 함수 내에서 this 변수 사용위해 binding
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        // this.addReadTimeLine = this.addReadTimeLine.bind(this);
    }

    renderField = ({input, placeholder, type, label, writeOnce, meta: { touched, error }}) => {
        
        return (
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
                <input {...input} 
                    type={type}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    placeholder={placeholder}
                    required={true}
                    />
                {touched && error && <span className="block sm:inline">{error}</span>}
            </div>
        )
    }

    TimeRenderField = ({input, selected, label, meta: {touched, error}}) => {
        return (
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
                {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" /> */}
                <DatePicker
                    {...input}
                    selected={selected}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="HH:mm" 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
                {touched && error && <span className="block sm:inline text-red-700">{error}</span>}
            </div>
            
        )
    }

    DateRenderField = ({input, selected, changefunc, label, meta: {touched, error}}) => {
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
                        className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                </div>
                {touched && error && <span className="block sm:inline text-red-700">{error}</span>}
            </div>
        )
    }

    handleDateChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    handleStartTimeChange = (date) => {
        // console.log(date.toLocaleTimeString());
        this.setState({
            startTime: date
        });
    }

    handleEndTimeChange = (date) => {
        this.setState({
            endTime: date
        });
    }

    DelTimeLine = (t_id) => {
        console.log(t_id);
        store.dispatch(deleteTimeLine(this.props.book_id, t_id));
        store.dispatch(searchTimeLine(this.props.book_id, this.state.page));
    }
    handlePageChange = (pageNumber) => {
        this.setState({
            page: pageNumber
        },() => {
            store.dispatch(searchTimeLine(this.props.book_id, this.state.page));
        });
    };

    componentDidMount() {
        store.dispatch(searchTimeLine(this.props.book_id, this.state.page));
    }

    handleSubmit = (values) => {
        // console.log(this.state.startTime.toLocaleTimeString());
        values.started_date = Moment(values.started_date).format('YYYY-MM-DD');
        console.log(values.started_time);
        values.started_time = Moment(values.started_time).format('hh:mm');
        values.finished_time = Moment(values.finished_time).format('hh:mm');
        values.book = this.props.book_id;
        store.dispatch(addTimeLine(this.props.book_id, values));
        store.dispatch(searchTimeLine(this.props.book_id, this.state.page));
        // this.componentDidMount();
        // history.push(`/books/detail/${this.props.book_id}`);
        // this.props.history.push(`/books/detail/${this.props.book_id}`);
    }

    render() {
        console.log(this.props.timeline);
        return (
            <>
            <div className="flex mb-4">
                <div className="w-full">
                    <form className="w-full max-w-lg" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
                        <Field 
                            name="started_date"
                            label="start date"
                            selected={this.state.startDate}
                            onChange={this.handleDateChange.bind(this)}
                            component={this.DateRenderField}
                            validate={[requiredCheck]}
                        />
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <Field
                                name="started_time"
                                label="Start Time"
                                selected={this.state.startTime}
                                onChange={this.handleStartTimeChange.bind(this)}
                                component={this.TimeRenderField}
                            />
                            <Field
                                name="finished_time"
                                label="End Time"
                                selected={this.state.endTime}
                                onChange={this.handleEndTimeChange.bind(this)}
                                component={this.TimeRenderField}
                                validate={[timelineCheck]}
                            />
                            
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <Field
                                name="start_page"
                                type="number"
                                label="Start Page"
                                component={this.renderField}
                                placeholder="Start Page"
                            />
                            <Field
                                name="end_page"
                                type="number"
                                label="End Page"
                                component={this.renderField}
                                placeholder="End Page"
                                validate={[requiredCheck, pageCheck]}
                            />
                        </div>
                        <button className="bg-blue hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded w-full" type="submit">Add TimeLine</button>
                    </form>
                    
                </div>
            </div>
            {this.props.timeline && this.props.timeline.results.length > 0? (
            <table className="table-auto">
                <thead>
                    <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Start Time</th>
                    <th className="px-4 py-2">End Time</th>
                    <th className="px-4 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.timeline.results? (this.props.timeline.results.map((row, i) => {
                return (                    
                    <tr key={row.id}>
                        <td className="border px-4 py-2">{row.started_date}</td>
                        <td className="border px-4 py-2">{row.started_time}</td>
                        <td className="border px-4 py-2">{row.finished_time}</td>
                        <td className="border px-4 py-2">
                            <button 
                                className="bg-blue hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded" 
                                type="button"
                                onClick={this.DelTimeLine.bind(this, row.id)}>Delete
                            </button>
                        </td>
                    </tr>
                    )
                })):(<div></div>)}
                </tbody>
                
                </table>): (<div></div>)}
            
                {this.props.timeline && this.props.timeline.links.length > 0? (
                    <div className="align-pagination">
                        <Pagination className="d-flex flex-row py-4 align-items-center"
                            activePage={this.props.timeline.links.cur_page}
                            itemsCountPerPage={5}
                            totalItemsCount={this.props.timeline.links.count}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}/>
                    </div>
                    
                ): (
                    null
                )}
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    timeline: state.book.timelines
})

// start page vs end page
const pageCheck = (value, allValues) => 
    value < allValues.start_page ? <span className="block sm:inline text-red-700">end page must large start page</span>: undefined;

// started_time vs finished_time
const timelineCheck = (value, allValues) => 
    value < allValues.started_time ? <span className="block sm:inline text-red-700">end time must large start time</span>: undefined;

// read date check
const requiredCheck = (value) => value === undefined ? <span className="ml-4 block sm:inline text-red-700">this field required</span>: undefined;
    
    
BookTimeLine = connect(mapStateToProps, { searchTimeLine, deleteTimeLine, addTimeLine })(BookTimeLine);

export default reduxForm({
    form: "BookTimeLine"
})(BookTimeLine);