import React, {Component } from 'react'
import { connect } from "react-redux";
import store from "../../store";
import { reduxForm } from 'redux-form';
import { getBookStatus, getBookFormat, getRecentBookView } from "../../actions/dash";


class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let user_id = this.props.match.params.id;
        setTimeout(function () {
            store.dispatch(getBookStatus(user_id));
            store.dispatch(getBookFormat(user_id));
        }, 1000);

        setTimeout(function () {
            store.dispatch(getRecentBookView(user_id));
        });
    }

    render() {
        return (
            <main className="bg-white-300 flex-1 p-3 overflow-hidden">
                <div className="flex flex-col">
                    
                        { this.props.statusCount? (<div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
                            <div className="shadow bg-success border-l-8 hover:bg-success-dark border-success-dark mb-2 p-2 md:w-2/4 mx-2">
                            <div className="p-4 flex flex-col">
                                <a href="#" className="no-underline text-white text-2xl">
                                    {this.props.statusCount.Read}
                                </a>
                                <a href="#" className="no-underline text-white text-lg">
                                    Read
                                </a>
                            </div>
                        </div>

                        <div className="shadow bg-info border-l-8 hover:bg-info-dark border-info-dark mb-2 p-2 md:w-1/4 mx-2">
                            <div className="p-4 flex flex-col">
                                <a href="#" className="no-underline text-white text-2xl">
                                    {this.props.statusCount.Reading}
                                </a>
                                <a href="#" className="no-underline text-white text-lg">
                                    Reading
                                </a>
                            </div>
                        </div>

                        <div className="shadow bg-warning border-l-8 hover:bg-warning-dark border-warning-dark mb-2 p-2 md:w-1/4 mx-2">
                            <div className="p-4 flex flex-col">
                                <a href="#" className="no-underline text-white text-2xl">
                                    {this.props.statusCount.UnRead}
                                </a>
                                <a href="#" className="no-underline text-white text-lg">
                                    UnRead
                                </a>
                            </div>
                        </div>
                        </div>): (null)}

                    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 mt-10">

             
                        <div className="rounded overflow-hidden shadow bg-white mx-2 w-full">
                            <div className="px-6 py-2 border-b border-light-grey">
                                <div className="font-bold text-xl">Format Status</div>
                            </div>
                            <div className="table-responsive">
                                <table className="table text-grey-darkest">
                                    <thead className="bg-grey-dark text-white text-normal">
                                    <tr>
                                        <th scope="col">Format</th>
                                        <th scope="col">Count</th>
                                        <th scope="col">Average</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.formatCount? (
                                        this.props.formatCount.map((row, i) => {
                                            let format = row.book_format
                                            
                                            if (format === '10') {
                                                format = 'Hardcover';
                                            } else if (format === '20') {
                                                format = 'Paperback';
                                            } else if (format === '30') {
                                                format = 'Audiobook';
                                            } else if (format === '40') {
                                                format = 'eBook';
                                            } else if (format === '50') {
                                                format = 'Book';
                                            }

                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        <button className="bg-blue-500 hover:bg-blue-800 text-white font-light py-1 px-2 rounded-full">
                                                            {format}
                                                        </button>
                                                    </td>
                                                    <td>{row.sum_format}</td>
                                                    <td>
                                                        <span className="text-green-500">{Math.round(row.avg_format*100, 2)}%</span>
                                                    </td>
                                                </tr>
                                            )
                                        })): (null)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                 
                    
                    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 p-1 mt-2 mx-auto lg:mx-2 md:mx-2 justify-between">
                        { this.props.recentBook? (this.props.recentBook.map((row, i) => {
                            let book_image = "";

                            if (row.book_image_uri != "") {
                                book_image = row.book_image_uri
                            }
                            return (
                                <div key={i} className="rounded rounded-t-lg overflow-hidden shadow max-w-xs my-3">
                                    {
                                        book_image != ''? (
                                            <img src={book_image} alt="" className="w-full"/>
                                        ): (<img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Roundel_of_None.svg" alt="" className="w-full"/>)
                                    }
                                    
                                    
                                    <div className="text-center px-3 pb-6 pt-2">
                                        <h3 className="text-black text-sm bold font-sans">{row.title}</h3>
                                        <p className="mt-2 font-sans font-light text-grey-700">{row.subtitle}</p>
                                    </div>
                                    <div className="flex justify-center pb-3 text-grey-dark">
                                        <div className="text-center mr-3 border-r pr-3">
                                            <h2>{row.started_reading}</h2>
                                            <span>started_reading</span>
                                        </div>
                                        <div className="text-center">
                                            <h2>{row.finished_reading}</h2>
                                            <span>end_reading</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })): (null)}
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.user,
    statusCount: state.dash.bstatus,
    formatCount: state.dash.bformat,
    recentBook: state.dash.brecent
});

Main = connect(mapStateToProps, { getBookStatus, getBookFormat })(Main);

export default Main;