import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'mobx-react';
import comon from './stores/comon'
import home from './stores/home'
import states from './stores/states'
import articles from './stores/articles'

const stores = {
    comon,
    home,
    states,
    articles
}

ReactDOM.render(
    <Provider {...stores} >
        <App />
    </Provider>
    , document.getElementById('root'))