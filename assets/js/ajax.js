import store from './store';

export function post(path, body) {
    let state = store.getState();
    console.log(path)
    console.log(body)
    let token = "";
    if (state.session) {
        token = state.session.token;
    }

    return fetch('/ajax' + path, {
        method: 'post',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
        body: JSON.stringify(body),
    }).then((resp) => resp.json());
}

export function get(path) {
    let state = store.getState();
    let token = "";
    if (state.session) {
        token = state.session.token;
    }

    return fetch('/ajax' + path, {
        method: 'get',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
    }).then((resp) => resp.json());
}

export function get_jobs() {
    get('/jobs')
        .then((resp) => {
            store.dispatch({
                type: 'ADD_JOBS',
                data: resp.data,
            });
        });
}

export function get_jobs_by_id(id) {
    get('/jobs')
        .then((resp) => {
            store.dispatch({
                type: 'ADD_JOBS_BY_ID',
                data: resp.data,
                managerid: id,
            });
        });
}

export function get_user_by_id(id) {
    get('/users')
        .then((resp) => {
            store.dispatch({
                type: 'ADD_USER_BY_ID',
                data: resp.data,
                userid: id,
            });
        });
}

export function create_sheet(form) {
    let state = store.getState();
    let data = state.tss;

    post('/tss', data)
            .then((resp) => {
                if (resp.data) {
                    store.dispatch({
                        type: 'CREATE_NEW_SHEET',
                        data: resp,
                    });
                }
            })
}


export function submit_login(form) {
    let state = store.getState();
    let data = state.forms.login;

    post('/sessions', data)
        .then((resp) => {
            console.log(resp);
            if (resp.token) {
                localStorage.setItem('session', JSON.stringify(resp));
                store.dispatch({
                    type: 'LOG_IN',
                    data: resp,
                });
                form.redirect('/'); // TODO: redirect to different pages
            }
            else {
                store.dispatch({
                    type: 'CHANGE_LOGIN',
                    data: {errors: JSON.stringify(resp.errors)},
                });
            }
        });
}