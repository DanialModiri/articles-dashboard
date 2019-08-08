import React from 'react';
import _sidenav from '../_sidenav';
import './sidenavigation.css'
import classenames from 'classnames'
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom'

@inject('comon') @observer
class Sidenavigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const comon = this.props.comon;

        return <ul className={classenames("side-navigation", { 'collapse': comon.collapse_sidenav })} >
            <li>
                <img src="https://png.pngtree.com/svg/20161224/677f491a9e.svg" />
                <span className="title">
                    DASHBOARD
                   </span>
            </li>
            {_sidenav.map((item, index) => <li key={index}>

                {item.icon}
                <Link to={item.link || '/'}>                
                    <span className="title">
                        {item.label}
                    </span>
                </Link>
            </li>)}
        </ul>
    }
};

export default Sidenavigation;