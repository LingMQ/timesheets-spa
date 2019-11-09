import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';

/* Structure of store data:
 * {
 *   forms: {
 *     new_photo: {...},
 *     edit_photo: {...},
 *     new_user: {...},
 *     edit_user: {...},
 *   },
 *   users: Map.new(
 *     1 => {id: 1, name: "Alice", email: "alice@example.com"},
 *     ...
 *   ),
 *   photos: Map.new(
 *     1 => {id: 1, data: "...", desc: "...", tags: [...]},
 *     ...
 *   ),
 * }
 */

function login(st0 = {email: "", password: "", errors: null}, action) {
    switch(action.type) {
        case 'CHANGE_LOGIN':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function sheets(st0 = {data: [], tasks: []}, action) {
    switch(action.type) {
        case 'ADD_SHEETS':
            console.log("sssssssss")
            console.log(action.data)
            console.log(Object.assign({}, st0, action.data))
            console.log(st0)
            return Object.assign({}, st0, action.data);
        case 'SHOW_TASKS':
            let task = {tasks: action.tasks.data};
            return Object.assign({}, st0, task);
        default:
            return st0;
    }
}

function tss(st0 = {workerid: 0, date: null, job_codes: [], hours: []}, action) {
    switch(action.type) {
        case 'ADD_TS_BY_WORKER_ID':
            let st1 = new Map();
            for (let ts of action.data) {
                st1.set(ts.id, ts);
            }
            return st1;
        case 'CREATE_NEW_SHEET':
            let all_hours = action.data.hours.map(function(item) {
                return parseInt(item, 10);
            })
            let sum_hour = eval(all_hours.join('+'))
            if (sum_hour < 8) {
                alert("You are working less than 8 hours");
                alert("Timesheets Created Successfully");
                return Object.assign({}, st0, action.data);
            } else if (sum_hour == 8) {
                alert("Timesheets Created Successfully");
                return Object.assign({}, st0, action.data);
            } else if (sum_hour > 8) {
                // sum_hour > 8
                alert("ERROR: You can't work more than 8 hours per day. Timesheets is not created.")
            }
            // return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function forms(st0, action) {
    let reducer = combineReducers({
        login,
    });
    return reducer(st0, action);
}

function jobs(st0 = new Map(), action) {
    switch(action.type) {
        case 'ADD_JOBS':
            let st1 = new Map(st0);
            for (let job of action.data) {
                st1.set(job.id, job);
            }
            return st1;
        case 'ADD_JOBS_BY_ID':
            let st2 = new Map(st0);
            for (let job of action.data) {
                if (job.manager === action.managerid) {
                    st2.set(job.id, job);
                }
            }
            return st2;
        default:
            return st0;
    }
}

let session0 = localStorage.getItem('session');
if (session0) {
    session0 = JSON.parse(session0);
}
function session(st0 = session0, action) {
    switch (action.type) {
        case 'LOG_IN':
            return action.data;
        case 'LOG_OUT':
            return null;
        default:
            return st0;
    }
}

function users(st0 = new Map(), action) {
    switch (action.type) {
        case 'ADD_USER_BY_ID':
            let st1 = new Map(st0);
            for (let user of action.data) {
                if (user.id == action.userid) {
                    st1.set(user.id, user);
                }
            }
            return st1;
        default:
            return st0;
    }
}

function root_reducer(st0, action) {
    console.log("root reducer", st0, action);
    let reducer = combineReducers({
        tss,
        forms,
        jobs,
        users,
        session,
        sheets,
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;