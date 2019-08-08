import React from 'react';
import SideNav from './components/sidenavigation';
import Header from './components/header'
import './App.css'
import Home from './pages/Home';
import { Route, HashRouter, Switch } from 'react-router-dom'
import States from './pages/States';
import routes from './routes';

function App() {

    return <React.Fragment>
        <HashRouter>
            <div className="wrapper">
                <SideNav />
                <div className="container">
                    <Header />
                    <div className="content">

                        <Switch>
                            {routes.map(route => <Route path={route.path} component={route.component} />)}
                        </Switch>

                    </div>
                </div>
            </div>
        </HashRouter>
    </React.Fragment>
}

export default App;