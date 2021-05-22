
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

};


export default {
    state,
    mutations,
    actions
};