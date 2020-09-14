import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../store";
import { logout } from "../../actions/user";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            sideOpen: true,
            user: localStorage.getItem("user")? localStorage.getItem("user").user: null,
            isAuthenticated: localStorage.getItem("token")? true: false
        };

        store.subscribe(() => {
        // When state will be updated(in our case, when items will be fetched), 
        // we will update local component state and force component to rerender 
        // with new data.
            this.setState({
                user: store.getState().user.user,
                isAuthenticated: store.getState().user.isAuthenticated
            })
        });
    }

    profileToggle = () => {
        this.setState(state => {
            return {
                open: !state.open
            }
        })
    }

    

    render() {
        // const { user, isAuthenticated } = this.props.auth;
        
        const guestLinks = (
            <li>
                <Link
                    className="no-underline px-4 py-2 block text-black hover:bg-grey-light"
                    to="/login"
                    style={{ textDecoration: 'none' }}
                >
                    Login
                </Link>
            </li>
        );

        const userLinks = (
            <>
                <li>
                    {this.state.user? (<Link
                        className="no-underline px-4 py-2 block text-black hover:bg-grey-light"
                        to={`/settings/${this.state.user.pk}`}
                        style={{ textDecoration: 'none' }}
                    >
                        Settings
                    </Link>): (null)}
                    
                </li>
                <li><hr className="border-t mx-2 border-grey-ligght" /></li>
                <li>
                    
                    <Link
                        className="no-underline px-4 py-2 block text-black hover:bg-grey-light"
                        to="/"
                        onClick={this.props.logout}
                        style={{ textDecoration: 'none' }}
                    >
                        LogOut
                    </Link>
                </li>
            </>
        );

        return (
            <>
            <header className="bg-nav">
                <div className="flex justify-between">
                    <div className="p-1 mx-3 inline-flex items-center">
                        <h1 className="text-white p-2">BookManager</h1>
                    </div>
                    <div className="p-1 flex flex-row items-center">
                        <img className="inline-block h-8 w-8 rounded-full" onClick={this.profileToggle} alt="" />
                        <a href="#" onClick={this.profileToggle} className="text-white p-2 no-underline hidden md:block lg:block">{this.state.user != null? this.state.user.email: "Anonymouse"}</a>
                        <div id="ProfileDropDown" className="rounded shadow-md bg-white absolute pin-t mt-12 mr-1 pin-r" onClick={this.profileToggle}>
                            {
                                this.state.open && (
                                    <ul className="list-reset">
                                        {this.state.isAuthenticated? userLinks: guestLinks}
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                </div>
        </header>
        </>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.user
});

export default connect(mapStateToProps, { logout })(Header);
