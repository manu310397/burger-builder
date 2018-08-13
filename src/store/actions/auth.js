import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTime = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDec2XG17lFRh8eXqsqXfKgHbzB8iDEGzU';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDec2XG17lFRh8eXqsqXfKgHbzB8iDEGzU';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                storeItIntoLocalStorage(response.data);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTime(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err.response.data.error.message)
                dispatch(authFail(err.response.data.error.message));
            });
    };
};

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                const userID = localStorage.getItem('userID');
                dispatch(authSuccess(token, userID));
                checkAuthTime((expirationDate.getTime() - new Date().getTime()/1000));
            }
        }
    }
}

const storeItIntoLocalStorage = (data) => {
    const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000);
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userID', data.localId);
}