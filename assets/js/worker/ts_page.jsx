import {connect} from "react-redux";
import {BrowserRouter as Router, NavLink, Redirect} from "react-router-dom";
import React from "react";
import {Nav, Button} from "react-bootstrap";
import {get_sheets} from "../ajax";


class TSPage extends React.Component {

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

        let taskslist = this.props.tasks;
        let tasks_display;
        if (taskslist.length == 0) {
            tasks_display = <div> </div>;
        } else {
            taskslist = _.map(taskslist, (tt, ii) => {
                return(
                    <tr>
                        <th scope="row">1</th>
                        <td>{tt.worker}</td>
                        <td>{tt.jobcode}</td>
                        <td>{tt.hours}</td>
                    </tr>
                );
            });
            tasks_display =
                <div>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">worker</th>
                            <th scope="col">job code</th>
                            <th scope="col">hours</th>
                        </tr>
                        </thead>
                        <tbody>
                        {taskslist}
                        </tbody>
                    </table>

                </div>
        }

        return (
            <div>
                <h1> Welcome to the timesheets page </h1>
                <Nav>
                    <Nav.Item>
                        <NavLink to="/" exact activeClassName="active" className="nav-link">
                            Back to Worker Main Page
                        </NavLink>
                    </Nav.Item>
                </Nav>

                <select id="mySelect" className="browser-default custom-select custom-select-lg mb-3" >
                    <option disabled selected>View your timesheets here</option>
                    {tslist}
                </select>
            </div>
        )
    }
};

function state2props(state) {
    return state.sheets;
}

export default connect(state2props)(TSPage);
