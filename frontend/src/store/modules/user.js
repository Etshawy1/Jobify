import axios from "axios";

const state = {
    userToken: "",
    userType: "",
    userEmail: ""
};

const mutations = {
    // Set the user data with the given payload
    setUserData(state, payload) {
        state.userType = payload.userType;
        state.userEmail = payload.userEmail;
    },
    // setting the user type only
    setUserType(state, payload) {
        state.userType = payload.userType;
    }

};

const actions = {
    //an action to take user data on registering
    registerUser({ state }, payload) {
        return new Promise((resolve, reject) => {
            //send a post request with the user data to the database
            axios
                .post("/v1/users/signup", {
                    email: payload.email,
                    password: payload.password,
                    type: payload.type
                })
                .then(response => {
                    resolve(payload.type);
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    },
};


export default {
    state,
    mutations,
    actions
};