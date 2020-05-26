import React from 'react'

const PersonAdder = ({header, submitFunction, name, nameHandler, number, numberHandler}) => {
    return (
        <>
            <h2>{header}</h2>
            <form onSubmit={submitFunction}>
                <div>
                    name: <input
                        value={name}
                        onChange={nameHandler}
                    />
                </div>
                <div>
                    number: <input
                        value={number}
                        onChange={numberHandler}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonAdder