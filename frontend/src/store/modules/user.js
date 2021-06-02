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
                    localStorage.setItem("userToken", response.data.token);
                    localStorage.setItem("userID", response.data.user._id);
                    localStorage.setItem("userEmail", response.data.user.email);
                    localStorage.setItem("userType", response.data.user.type);
                    localStorage.setItem("userImageUrl", response.data.user.imageUrl);

                    
                    resolve(payload.type);
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    },
    // an action to handle user logging in
    loginUser({state}, payload) {
        return new Promise((resolve, reject) => {
            //send a post request with the user data to the database
            axios
                .post("/v1/users/login", {
                    email: payload.email,
                    password: payload.password,
                })
                .then(response => {
                    localStorage.setItem("userToken", response.data.token);
                    localStorage.setItem("userID", response.data.user._id);
                    localStorage.setItem("userEmail", response.data.user.email);
                    localStorage.setItem("userType", response.data.user.type);
                    localStorage.setItem("userImageUrl", response.data.user.imageUrl);
                    localStorage.setItem("additionalData", response.data.user.additionalData);
                    localStorage.setItem("onModel", response.data.user.onModel);

                    
                    resolve(response.data.user.type);
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