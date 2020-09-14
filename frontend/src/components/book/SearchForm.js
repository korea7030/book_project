import React,  { ReactDOM, Component } from 'react'
import { searchAPIBook } from '../../actions/book';
import { connect } from 'react-redux';
import store from '../../store';


class searchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          initSearchValue: ''
        }
    }

    searchBook(page) {
        let title = document.getElementById('title').value;
        store.dispatch(searchAPIBook(title, page));
    }

    handleBookChange = (i) => {
       this.props.onSelectBook(this.props.search.documents[i]);
       this.closeSearchForm();
    }

    closeSearchForm = () => {
      // this.props.search = [];
      // ReactDOM.findDOMNode(this.refs.booklist).value = "";
      let title = document.getElementById("title");
      title.value = '';
      store.dispatch(searchAPIBook(title, 1));
      // title 변경 후 div refresh를 위해 재호출..(다른방법은...?)
      this.props.closeMe();
    }
    
    render() {
      console.log(this.props.search);
        return  (
            <>
            <div id='centeredFormModal' className={this.props.isOpen? "modal-wrapper modal-is-open": "modal-wrapper"} >
              <div className="overlay close-modal"></div>
              <div className="modal modal-centered">
                  <div className="modal-content shadow-lg p-5">
                      <div className="border-b p-2 pb-3 pt-0 mb-4">
                        <div className="flex justify-between items-center">
                        <h3 className="text-3xl font-semibold">
                              Search Book
                            </h3>
                            <button
                              type="button" className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={this.closeSearchForm}>
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                              </span>
                            </button>
                        </div>
                      </div>
                      {/* <!-- Modal content --> */}
                      <form id='form_id' className="w-full">
                          <div className="flex flex-wrap -mx-3 mb-6">
                              <div className="w-full px-3">
                                <input id="title" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey" type="text" placeholder="Book Title" />
                              </div>
                          </div>
                          <div className="mt-2">
                                <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button" onClick={() => this.searchBook(1)}>
                                  Search
                                </button>
                                <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button" onClick={this.closeSearchForm}>
                                  Cancel
                                </button>
                          </div>

                          <div id="searchBookList" className="mt-5" ref={this.myRef}>
                          {
                              this.props.search? (this.props.search.documents.map((row, i) => {
                                return (
                                    <div key={i} id="searchList" name="searchList" className="flex cursor-pointer my-1 hover:bg-blue-lightest rounded" onClick={this.handleBookChange.bind(this, i)}>
                                      <div className="w-4/5 h-10 py-3 px-1">
                                        <p className="hover:text-blue-600 ">{row.title}</p>
                                      </div>
                                    </div>
                                )
                              })): (null)
                            }
                            {/* <BookapiPagination searchObj={this.props.search} searchBookApi={this.searchBook}/> */}
                          </div>
                          {
                            this.props.search && this.props.search.meta.is_end === false? (
                              <div className="inline-flex">
                                  {
                                  this.props.search.meta.currentPage === 1? (<button type="button" className="bg-teal-200 hover:bg-teal-500 text-teal-900 font-bold py-2 px-4 rounded-r" onClick={() => this.searchBook(this.props.search.meta.nextPage)}>
                                  Next
                              </button>): (
                              <>
                              <button type="button" className="bg-teal-200 hover:bg-teal-500 text-teal-900 font-bold py-2 px-4 rounded-l" onClick={() => this.searchBook(this.props.search.meta.prevPage)}>
                                  Prev
                              </button>
                              {
                                this.props.search.meta.nextPage === this.props.search.meta.totalPage? (null): (<button type="button" className="bg-teal-200 hover:bg-teal-500 text-teal-900 font-bold py-2 px-4 rounded-r" onClick={() => this.searchBook(this.props.search.meta.nextPage)}>
                                Next
                            </button>)
                              }
                              
                              </>)}
                          </div>
                            ): (null)
                          }
                      </form>
                  </div>
              </div>
          </div>
        </>
        )
    }
}

const mapStateToProps = (state) => ({
    search: state.book.book_search
});

searchForm = connect(mapStateToProps, { searchAPIBook })(searchForm);

export default searchForm;