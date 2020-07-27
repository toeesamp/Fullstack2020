import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (notification === null) {
        return null
    }

    return (
        <div className={`${notification.type}`}>
            {notification.text}
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default Notification