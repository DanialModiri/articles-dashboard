import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types'
import './breadcrumbs.css'

const Breadcrumbs = ({ directions }) => {

    return <Card style={{ marginBottom: 16 }}>
        <ul className="breadcrumb">
            {directions.map((item, index) => <li key={index + 1} className="breadcrumb-item">
                {item.label}
            </li>)}
        </ul>
    </Card>
}

Breadcrumbs.prototype = {
    directions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        link: PropTypes.string
    }))
}

export default Breadcrumbs;