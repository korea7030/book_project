import React, { Component } from "react";
import { getBooks, deleteBook } from "../../actions/book";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Pagination from "react-js-pagination";
import store from "../../store";
import { Link, Redirect } from "react-router-dom";


import StarRatingComponent from "react-star-rating-component";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        };
    }
    componentDidMount() {
        store.dispatch(getBooks(this.state.page));
    }

    handlePageChange = (pageNumber) => {
        this.setState(
            {
                page: pageNumber,
            },
            () => {
                console.log(this.state.page);
                store.dispatch(getBooks(this.state.page));
            }
        );
    };

    deleteBook = (book_id) => {
        console.log(book_id);
        this.props.deleteBook(book_id);
        this.componentDidMount();
    };

    // renderfield
    renderField = ({
        input,
        placeholder,
        type,
        label,
        writeOnce,
        meta: { touched, error },
    }) => {
        return (
            <input
                {...input}
                type={type}
                className="w-full rounded p-2"
                placeholder={placeholder}
            />
        );
    };

    // selectfield
    selectField = ({input, placeholder, index, label, meta: { touched, error } }) => {
      return (
          <div className={`inline-block relative w-64 ${touched && error ? "error" : ""}`}>
              <select {...input} className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option value='1'>title</option>
                  <option value='2'>author</option>
                  <option value='3'>publish</option>
                  {/* {optList} */}
              </select>
              {touched && error && <span className="">{error}</span>}
          </div>
      );
  };

    handleSubmit = (values) => {
        // event.preventDefault();
        console.log(values);
        let search_category = values.search_category;
        let query = values.search;
        store.dispatch(getBooks(this.state.page, search_category, query));
        // console.log(this.props.auth.user.pk);
        // this.props.createBook(values);
        // history.push(`/books`);
    };

    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <main className="bg-white-300 flex-1 p-3 overflow-hidden">
              <form
                  className="w-full max-w-lg mx-4 md:mx-auto my-10 max-w-md md:max-w-2xl"
                  name="search_form"
                  onSubmit={this.props.handleSubmit(
                      this.handleSubmit.bind(this)
                  )}
              >
                <div className="bg-white shadow p-4 flex items-center">
                <Field
                          name="search_category"
                          type="text"
                          component={this.selectField}
                      />
                  <span className="w-auto flex justify-end items-center text-gray-500 p-2">
                      <i className="material-icons text-3xl">search</i>
                  </span>
                  <Field
                          name="search"
                          type="text"
                          component={this.renderField}
                          placeholder="Try 'Book Name'"
                      />
                  {/* <input className="w-full rounded p-2" type="text" placeholder="Try 'Los Angeles'" /> */}
                  <button className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4">
                          <p className="font-semibold text-xs">Search</p>
                  </button>
                  <div className="ml-5">
                    <Link  to="/books/new" style={{ textDecoration: "none" }}>
                        <button
                            className="bg-blue hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded"
                            type="button"
                        >
                            Add
                        </button>
                    </Link>
                    </div>
              </div>
              
                  {/* <div className="w-full h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative">
                    <Field
                          name="search_category"
                          type="text"
                          component={this.selectField}
                          index="0"
                      />
                      <Field
                          id="search"
                          name="search"
                          component={this.renderField}
                          placeholder="Search"
                      />
                      <button
                          type="submit"
                          className="ml-1 mr-100 outline-none focus:outline-none active:outline-none"
                      >
                          <svg
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              className="w-6 h-6"
                          >
                              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                          </svg>
                      </button>
                      <div className="ml-20">
                        <Link  to="/books/new" style={{ textDecoration: "none" }}>
                          <button
                              className="bg-blue hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded"
                              type="button"
                          >
                              Add
                          </button>
                        </Link>
                      </div>
                  </div> */}
              </form>
                <div className="flex flex-wrap">

                
                {this.props.data ? (
                    this.props.data.results.map((row, i) => {
                        let status = null;
                        let book_image = "";
                        
                        if (row.book_image_uri != "") {
                            book_image = row.book_image_uri
                        } 
                        
                        if (row.read_status === "Not Read") {
                            status = (
                                <span className="text-red-700">
                                    {row.read_status}
                                </span>
                            );
                        } else if (row.read_status === "Reading") {
                            status = (
                                <span className="text-blue-700">
                                    {row.read_status}
                                </span>
                            );
                        } else if (row.read_status === "Read") {
                            status = (
                                <span className="text-green-700">
                                    {row.read_status}
                                </span>
                            );
                        }

                        return (
                                <div key={i} className="w-full md:w-1/2 lg:w-1/3 px-2 my-2">
                                    <div className="shadow-md bg-white">
                                        {
                                            book_image != ''? (
                                                <img className="h-48 w-full object-cover" src={book_image} alt={row.title}/>
                                            ): (
                                                <img className="h-48 w-full object-cover" src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Roundel_of_None.svg" alt={row.title}/>
                                            )
                                        }
                                        <Link
                                            to={`/books/detail/${row.pk}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                        <div className="flex flex-col p-4">
                                            <p className="text-lg">{row.title}</p>
                                            <p className="text-gray-600 overflow-hidden truncate w-100">{row.subtitle}</p>
                                            <p className="text-black leading-none mt-4">{row.author} / {row.publisher}</p>
                                            <p className="self-end text-sm text-gray-700 flex items-center  mt-2">{status}</p>
                                            <StarRatingComponent className="self-end text-gray-dark mt-2"
                                                            name="rating"
                                                            starCount={5}
                                                            value={row.rating / 2}
                                                            editing={false}
                                                            emptyStarColor={"#999999"}
                                                        />
                                        </div>
                                        </Link>
                                        {isAuthenticated? (<button className="ml-4 mb-4 bg-red hover:bg-red-500 text-gray-700 font-semibold hover:text-white py-2 px-2 border border-gray-600 hover:border-transparent rounded" type="button"
                                                onClick={this.deleteBook.bind(
                                                    this,
                                                    row.pk
                                                )}>Delete</button>): (null)}
                                    </div>
                                </div>
                        );
                    })
                ) : (
                    <div className="max-w-sm w-full lg:max-w-full lg:flex">
                        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            No Book Data
                        </div>
                    </div>
                )}
                </div>
                {this.props.data && this.props.data.links ? (
                    <div className="align-pagination">
                        <Pagination
                            className="d-flex flex-row py-4 align-items-center"
                            activePage={this.props.data.links.cur_page}
                            itemsCountPerPage={10}
                            totalItemsCount={this.props.data.links.count}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                ) : (
                    <div></div>
                )}
                
            </main>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    data: state.book.books,
});

BookList = connect(mapStateToProps, { getBooks, deleteBook })(BookList);

export default reduxForm({
    form: "BookList",
    initialValues: {
      'search_category': '1'
    }
})(BookList);
