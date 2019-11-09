import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import {Navbar, Nav, Col, Alert} from 'react-bootstrap';
import { Provider, connect } from 'react-redux';

import Login from './login';
import store from './store';

import WorkerIndex from './worker/index';
import ManagerIndex from './manager/index';
import TSPage from "./worker/ts_page";


export default function init_page(root) {
    let tree = (
        <Provider store={store}>
            <Page />
        </Provider>
    );
    ReactDOM.render(tree, root);
}

function Page(props) {
    return (
        <Router>
            <Navbar bg="dark" variant="dark">
                <Col md="8">
                <Nav>
                    <Nav.Item>
                        <NavLink to="/" exact activeClassName="active" className="nav-link">
                            Home
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/login" exact activeClassName="active" className="nav-link">
                            Login
                        </NavLink>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col md="4">
                    <Session />
                </Col>
            </Navbar>

            <Switch>
                <Route exact path="/">
                    <PageContent />
                </Route>

                <Route exact path="/login">
                    <Login />
                </Route>

                <Route exact path="/worker/index">
                    <WorkerIndex />
                </Route>
                <Route exact path="/worker/ts">
                    <TSPage />
                </Route>

                <Route exact path="/manager/index">
                    <ManagerIndex />
                </Route>
            </Switch>
        </Router>
    );
}

let PageContent = connect(({session}) => ({session}))(({session, dispatch}) => {
    if (session) {
        if (session.manager) {
            // You are a manager
            return (
                <div>
                    <h1>Manager {session.user_name}, welcome back</h1>
                    <Nav>
                        <Nav.Item>
                            <NavLink to="/manager/index" exact activeClassName="active" className="nav-link">
                                Manager Main Page
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </div>
            );
        } else {
            // You are a worker
            return (
                <div>
                    <h1>{session.user_name}, welcome back</h1>
                    <Nav>
                        <Nav.Item>
                            <NavLink to="/worker/index" exact activeClassName="active" className="nav-link">
                                Submit My Timesheets
                            </NavLink>
                        </Nav.Item>
                    </Nav>

                    <Nav>
                        <Nav.Item>
                            <NavLink to="/worker/ts" exact activeClassName="active" className="nav-link">
                                View My Timesheets
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </div>
            );
        }
    } else {
        return (<h1>Welcome to Timesheets SPA app</h1>);
    }
    return (<h1>Welcome to Timesheets SPA app</h1>);
});

let Session = connect(({session}) => ({session}))(({session, dispatch}) => {
    function logout(ev) {
        ev.preventDefault();
        localStorage.removeItem('session');
        dispatch({
            type: 'LOG_OUT',
        });
    }

    if (session) {
        return (
            <Nav>
                <Nav.Item>
                    <p className="text-light py-2">User: {session.user_name},  id: {session.user_id} </p>
                </Nav.Item>
                <Nav.Item>
                    <a className="nav-link" href="#" onClick={logout}>Logout</a>
                </Nav.Item>
            </Nav>
        );
    }
    else {
        return (
            <Nav>
                <Nav.Item>
                    <NavLink to="/login" exact activeClassName="active" className="nav-link">
                        Login
                    </NavLink>
                </Nav.Item>
            </Nav>
        );
    }
});