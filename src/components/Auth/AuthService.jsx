import axios from 'axios';

export function signUpAuth(email, password) {

    const postData = {
        email,
        password,
        returnSecureToken: true,
    };


    return new Promise((resolve, reject) => {
    axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCB7stbM0-Hp3ZHHzLOV1b2v0AJoXCy2Ns',
        postData,
    ).then((response) => {
        console.log("success!");
        resolve("Sign up successful");
      })
      .catch((error) => {
        const errorMsg = formatError(error.response.data);
        reject(errorMsg);
      });
      });
}

export function loginAuth(email, password) {

    const postData = {
        email,
        password,
        returnSecureToken: true,
    };


    return new Promise((resolve, reject) => {
    axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCB7stbM0-Hp3ZHHzLOV1b2v0AJoXCy2Ns',
        postData,
    ).then((response) => {
        console.log("success!");
        resolve("Login successful");
      })
      .catch((error) => {
        const errorMsg = formatError(error.response.data);
        reject(errorMsg);
      });
      });
}

export function formatError(errorResponse) {
    switch (errorResponse.error.message) {
        case 'EMAIL_EXISTS':
            return 'Email already exists';
        case 'EMAIL_NOT_FOUND':
            return 'Email not found';
        case 'INVALID_PASSWORD':
            return 'Invalid Password';    

        default:
            return errorResponse.error.message;
    }
}

