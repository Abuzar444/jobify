import React from 'react'

const Loading = ({ center }) => {
    return (
        <div className={center ? 'loading center-loading' : 'loading'}></div>
    )
}

export default Loading