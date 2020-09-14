import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailBook } from "../../actions/book";
import store from "../../store";
import BookTimeLine from "./BookTimeLine";
import BookEdit from "./BookEdit";
import BookAddNote from "./BookAddNote";

import StarRatingComponent from "react-star-rating-component";


class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.state = {
            isEditModalOpen: false,
            isNoteModalOpen: false,
        };
    }

    openEditModal = () =>{
        this.setState({
            isEditModalOpen: true
        });
    }

    closeEditModal = () => {
        this.setState({
            isEditModalOpen: false
        })
    }

    openAddNoteModal = () => {
        this.setState({
            isNoteModalOpen: true
        });
    }

    closeAddNoteModal = () => {
        this.setState({
            isNoteModalOpen: false
        })
    }

    componentDidMount() {
        const bookId = this.props.match.params.bookId;
        // this.props.getDetailBook(bookId);
        store.dispatch(getDetailBook(bookId));
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

    render() {
        return (
            <div className="insta-clone">
                { this.props.data ? (<div className="h-auto px-24">
                    <div className="flex md:flex-row-reverse flex-wrap">
                        <div className="w-full md:w-8/12 p-4 text-center">
                            <div className="text-left pl-4 pt-3">
                                <span className="text-base text-gray-700 text-2xl mr-2">
                                    {this.props.data.title}
                                </span>
                            </div>

                            <div className="text-left pl-4 pt-3">
                                <span className="text-base font-semibold text-gray-700 mr-2">
                                    <b>{this.props.data.author}</b>
                                    {/* author */}
                                </span>
                                <span className="text-base font-semibold text-gray-700 mr-2">
                                    {this.props.data.publisher}
                                    {/* publisher */}
                                </span>
                                {this.props.data.publish !== ""? (<span className="text-base font-semibold text-gray-700 mr-2">
                                    {this.props.data.publish}
                                    {/* publish_date  */}
                                </span>) : (null) }
                                <span className="text-base font-semibold text-gray-700 mr-2">
                                    {this.props.data.translator}
                                    {/* translator */}
                                </span>
                            </div>

                            {this.props.data.subtitle !== null? (<div className="text-left pl-4 pt-3">
                                <span className="text-lg font-bold text-gray-700 mr-2">
                                    {this.props.data.subtitle}
                                    {/* subtitle */}
                                </span>
                            </div>): (null)}

                            <div className="text-left pl-4 pt-3">
                                Read Date
                                <p className="text-base font-medium text-gray-700 mr-2">
                                    {this.props.data.started_reading} ~ {this.props.data.finished_reading}
                                </p>
                            </div>

                            {this.props.data.ISBN !== null? (<div className="text-left pl-4 pt-3">
                                {/* ISBN */}
                                ISBN 
                                <p className="text-base font-medium text-gray-700 mr-2">
                                    {this.props.data.ISBN}
                                </p>
                            </div>): (null)}
                            
                            <div className="text-left pl-4 pt-3">
                                    <StarRatingComponent className="text-base font-medium text-gray-700 mr-2"
                                                            name="rating"
                                                            starCount={5}
                                                            value={this.props.data.rating / 2}
                                                            editing={false}
                                                            emptyStarColor={"#999999"}
                                    />
                            </div>
                            <div className="text-left pl-4 pt-3">
                                <p className="text-base font-medium text-gray-700 mr-2">
                                    <span className="text-green-700">
                                        {this.props.data.read_status}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 p-4 text-center">
                            <div className="w-full relative md:w-3/4 text-center mt-8">
                                <button
                                    className="flex rounded-full"
                                    id="user-menu"
                                    aria-label="User menu"
                                    aria-haspopup="true"
                                >
                                {this.props.data.book_image_uri !=="" ? (<img
                                        className="h-48 w-full rounded-full"
                                        src={this.props.data.book_image_uri}
                                        alt={this.props.data.title}
                                    />): (null)}
                                    
                                </button>
                            </div>
                        </div>

                        <BookEdit 
                            bookId={this.props.match.params.bookId}
                            pages={this.props.data.pages} 
                            book_format={this.props.data.book_format}
                            started_reading={this.props.data.started_reading} 
                            finished_reading={this.props.data.finished_reading} 
                            onRequestClose={this.closeEditModal} 
                            isOpen={this.state.isEditModalOpen}
                        >
                        </BookEdit>
                        <div className="w-full md:w-3/4 p-4 flex flex-no-wrap">
                            <span className="text-base font-semibold text-gray-700 mr-2">
                                <button type="button" onClick={this.openEditModal.bind(this)} className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                                    Edit Book
                                </button>
                            </span>
                            <span className="text-base font-semibold text-gray-700">
                                <button type="button" onClick={this.openAddNoteModal.bind(this)} className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                                    Add Note
                                </button>
                            </span>
                        </div>
                        <BookAddNote
                            isOpen={this.state.isNoteModalOpen}
                            onRequestClose={this.closeAddNoteModal}
                            book_id={this.props.data.pk}
                        >
                        </BookAddNote>
                    </div>

                    {/* <!--status show icon--> */}
                    <hr className="border-gray-500 mt-6 mb-6" />
                   <BookTimeLine 
                        start_reading={this.props.data.started_reading} 
                        finish_reading={this.props.data.finished_reading} 
                        book_id={this.props.data.pk}
                    />
                </div>
            ): null}
           </div>     
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    data: state.book.detail
});

export default connect(mapStateToProps, { getDetailBook })(BookDetail);
