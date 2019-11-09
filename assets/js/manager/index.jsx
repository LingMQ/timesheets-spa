import React from 'react';
import ReactDOM from 'react-dom';

import {Form, Button, Nav} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import {get_sheets} from "../ajax";
import {connect} from "react-redux";


class ManagerIndex extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: null,
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let tslist = this.props.data;

        if (tslist.length == 0) {
            get_sheets(0);
            return (
                <div>
                    <h1> Show Timesheets </h1>
                    <p> Loading </p>
                </div>
            )
        }

        tslist = _.map(tslist, (sheet, ii) => {
            if (sheet.status !== "New") {
                return (
                    <option key={sheet.id} value={sheet.id}> {sheet.date}      approved </option>
                );
            }
            else {
                return (
                    <option key={sheet.id} value={sheet.id}> {sheet.date}      not approved </option>
                );
            }
        });

        return (
            <div>
                <h1>Manager View Timesheets Page</h1>
                <Nav>
                    <Nav.Item>
                        <NavLink to="/" exact activeClassName="active" className="nav-link">
                            Back
                        </NavLink>
                    </Nav.Item>
                </Nav>
                <select id="mySelect" className="browser-default custom-select custom-select-lg mb-3" >
                    <option disabled selected>View your timesheets here</option>
                    {tslist}
                </select>

                <Button variant="primary" onClick={() => {
                    let sheet_id = document.getElementById("mySelect").value;
                    get_sheets(sheet_id);
                }}>
                    Approve
                </Button>
            </div>
        );
    }
};

function state2props(state) {
    return state.sheets;
}

export default connect(state2props)(ManagerIndex);