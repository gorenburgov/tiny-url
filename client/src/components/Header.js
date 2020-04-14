import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to={'/'} className="left brand-logo">
                    TinyUrl
                </Link>
            </div>
        </nav>
    );
};

export default Header;
