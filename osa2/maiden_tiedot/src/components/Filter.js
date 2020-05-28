import React from 'react'

const Filter = ({text, value, handler}) => {
    return (
        <div>
            {text} <input
                value={value}
                onChange={handler}
            />
        </div>
    )
}

export default Filter