import React from 'react';
import './header.css'
import comon from '../stores/comon'

export default () => {
    return <header>
        <i onClick={() => {
            comon.toggleCollapse()
        }} className="fa fa-bars menu-icon"/>

        <i className="fa fa-user user-icon" />
    </header>
}