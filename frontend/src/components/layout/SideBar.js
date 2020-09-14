import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/user";

class SideBar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            sideOpen: true
        };
    }


    sidebarToggle = () => {
        this.setState(state => {
            return {
                sideOpen: !state.sideOpen
            }
        })
    }

    render() {
        const { user, isAuthenticated } = this.props.auth;
        
        return (
            <>
            {
                this.state.sideOpen && (
                    <aside className="bg-side-nav w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav hidden md:block lg:block float-left">
                        <ul className="list-reset flex flex-col">
                            {user? (<li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white">
                                <Link
                                    className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline"
                                    to={`/main/${user.pk}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    DashBoard
                                    <span><i className="fas fa-angle-right float-right"></i></span>
                                </Link>
                            </li>): (<li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white">
                                <Link
                                    className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline"
                                    to='/main/${user.pk}'
                                    style={{ textDecoration: 'none' }}
                                >
                                    DashBoard
                                    <span><i className="fas fa-angle-right float-right"></i></span>
                                </Link>
                            </li>)}
                            
                            <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white">
                                <Link
                                    className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline"
                                    to="/books"
                                    style={{ textDecoration: 'none' }}
                                >
                                    My Books
                                    <span><i className="fas fa-angle-right float-right"></i></span>
                                </Link>
                            </li>
                            {
                                user? (<li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white">
                                <Link
                                    className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline"
                                    to={`/books/statistics/${user.pk}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    Statistics
                                    <span><i className="fas fa-angle-right float-right"></i></span>
                                </Link>
                            </li>): (<li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white">
                                <Link
                                    className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline"
                                    to='/books/statistics'
                                    style={{ textDecoration: 'none' }}
                                >
                                    Statistics
                                    <span><i className="fas fa-angle-right float-right"></i></span>
                                </Link>
                            </li>)
                            }
                            
                        </ul>
                    </aside>
                )
            }
            <div className="inset-x-0 bottom-0 ">
            {
                this.state.sideOpen? (<button className="h-8 bg-side-nav w-5 border-r border-side-nav container" type="button" onClick={this.sidebarToggle}><i className="fas fa-angle-left float-right"></i></button>): (<button className="h-8 bg-side-nav w-5 border-r border-side-nav container float-right" type="button" onClick={this.sidebarToggle}><i className="fas fa-angle-right float-right"></i></button>)
            }
            </div>
            
            </>
            
        )
    }
}

const mapStateToProps = state => ({
    auth: state.user
});

export default connect(mapStateToProps, { logout })(SideBar);