require('file-loader?name=[name].[ext]!./index.html')
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from './AppContainer'

ReactDOM.render(<AppContainer />, document.getElementById('App'))
