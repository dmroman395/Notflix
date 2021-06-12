import React from 'react'

function Main({ currentUser }) {
    return <div>User currently logged in: {currentUser.email}</div>
}

export default Main
