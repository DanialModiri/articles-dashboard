import React from 'react';
import PropTypes from 'prop-types'
import './DropdonwButton.css'
import OutsideClick from 'react-outside-click-handler'

const DropdownButton = ({ children }) => {

    const [open, setOpen] = React.useState(false);

    return <div className="dropdown">
        <OutsideClick onOutsideClick={() => {
            setOpen(false);
        }}></OutsideClick>
        <i className="action fas fa-ellipsis-v" onClick={() => {
            setOpen(true);
        }} />
        <ul className="dropdown-list" style={{ display: open ? 'block' : 'none' }}>
            {children}
        </ul>
    </div>
}


export const DropdownOption = ({ children, onClick }) => {
    return <li className="dropdown-item" onClick={onClick}>{children}</li>
}

export const DropdownOptionTitle = ({ children }) => {
    return <span className="dropdown-item-title">{children}</span>
}

export const DropdownOptionIcon = ({ icon }) => {
    return <i className={icon} />
}

DropdownButton.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.string,
        value: PropTypes.string
    })).isRequired
}

export default DropdownButton;