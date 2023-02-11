import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProctedRoute = ({ children }) => {
    const { user } = useSelector(store => store.user)
    if (!user) {
        return <Navigate to='/landing' />
    }
    return children
}

export default ProctedRoute