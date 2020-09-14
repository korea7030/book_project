import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../store';
import history from '../history';
import { loadUser } from '../actions/auth';
import LoginForm from '../components/LoginForm';
import Register from '../components/RegisterForm';
import ResetPassword from '../components/ResetPassword';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AuthRoute from '../components/common/AuthRoute';
import BookList from '../components/book/BookList';
import BookDetail from '../components/book/BookDetail';
import Main from '../components/layout/Main';
import BookForm from '../components/book/BookForm';
import BookTimeLine from '../components/book/BookTimeLine';
import Settings from '../components/user/Settings';
import BookStatistic from '../components/book/BookStatistic';
import ReactDOM from 'react-dom';
import SideBar from '../components/layout/SideBar';

import '../assets/App.css';
import '../assets/all.css';
import '../tailwind.generated.css';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

require('dotenv').config();



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isAuthenticated: localStorage.getItem('token') ? true : false
        };
        
    }

    

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        console.log(this.props);
        return (
            
            <Provider store={store}>
                <Router history={history}>
                <Route render={(props) => {
                    return <Header isAuthenticated={this.state.isAuthenticated}/>;
                }}/>
                    <div className="mx-auto bg-grey-400">
                        <div className="min-h-screen flex flex-col">                          
                            <div className='flex flex-1'>
                            
                            <SideBar />
                            
                            <Switch>
                                <AuthRoute exact path="/" />
                                <Route exact path="/books" component={BookList}/>
                                <Route exact path="/books/new" component={BookForm}/>
                                <Route exact path="/main/:id" component={Main} />
                                <Route exact path="/login" component={LoginForm}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/reset" component={ResetPassword}/>
                                <Route exact path="/books/statistics/:id" component={BookStatistic} />
                                <Route exact path="/books/detail/:bookId" component={BookDetail}/>
                                <Route exact path="/books/detail/:bookId/timeline" component={BookTimeLine}/>
                                <Route exact path="/settings/:id" component={Settings}/>
                                
                            </Switch>
                            </div>
                            <Footer />
                        </div>
                    </div>
                    <ToastContainer pauseOnFocusLoss={false}/>
                </Router>
            </Provider>
        );
    }
}

export default App;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);