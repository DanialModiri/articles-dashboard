import React from 'react';
import './Card.css'
import classNames from 'classnames'

export default ({ children, className, style }) => {

    return <div
        style={style}
        className={classNames("card", className)}>
        {children}
    </div>
}