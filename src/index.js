import React from 'react'
import ReactDOM from "react-dom"

import App from './App.js'


function hideLoadingScreen(){
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hide')
}

ReactDOM.render(
    <App 
        hideLoadingScreen={hideLoadingScreen}
    />, 
    document.getElementById('root')
)