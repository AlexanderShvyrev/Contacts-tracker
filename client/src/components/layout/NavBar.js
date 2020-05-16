import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/ContactContext';



const NavBar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user, loadUser } = authContext;
    const { clearContacts } = contactContext;
    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
    }, [])
    const onLogout = () => {
        logout();
        clearContacts();
    }

    const authLinks = (
        <Fragment>

            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt" /> {' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>

        </Fragment>
    )
    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    )
    return (
        <div className="navbar bg-primary">
            <h2><i className='fas fa-id-badge'></i> {title}</h2>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
                {/* <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li> */}

            </ul>
        </div>
    )
}
NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}
NavBar.defaultProps = {
    title: 'Contacts tracker'
}
export default NavBar;