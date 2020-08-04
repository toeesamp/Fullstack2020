import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (notification === null) {
        return null
    }

    return (
        <Alert variant={`${notification.type}`} >
            {notification.text}
        </Alert>
    )
}

export default Notification