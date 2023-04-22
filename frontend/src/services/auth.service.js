
import axios from "axios";
const AUTH_API_ROUTE = '/api/auth/'
const registerService = async (name, email, password) => {

    axios.defaults.withCredentials = true;
    const data = await axios.post(AUTH_API_ROUTE + 'register', { name, email, password }).then((response) => {

        return response.data;

    }).catch((error) => {
        console.log(`Error is ${error}`)
        return error;
    })
    return data;
}

const loginService = async (email, password, doNotLogout) => {

    axios.defaults.withCredentials = true;
    const data = await axios.post(AUTH_API_ROUTE + 'login', { email, password, doNotLogout }).then((response) => {

        return response.data;
    }).catch((error) => {
        console.log(`Error is ${error}`);
        return error;
    })
    return data;
}
const logOutService = async () => {
    const data = await axios.get('/api/auth/logout').then((response) => {

        return response.data;

    }).catch((error) => {
        return error;
    })
    return data;
}
const getCurrentUser = async () => {

    axios.defaults.withCredentials = true;
    const data = await axios.get(AUTH_API_ROUTE + 'info').then((response) => {
        return response.data;
    });
    return data;
}

const AuthService = {
    registerService, loginService, getCurrentUser, logOutService
}

export default AuthService;
//module.exports = { registerService, loginService, getCurrentUser }; 