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
        console.log("registering user, sending the following");
        console.log(payload);
        return new Promise((resolve, reject) => {
            //send a post request with the user data to the database
            axios
                .post("/v1/users/signup", {
                    email: payload.email,
                    password: payload.password,
                    type: payload.type,
                    linkedIn: payload.linkedIn
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
                    console.log("from loginUser")
                    console.log(response.data.user.type)
                    resolve(response.data.user.type);
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    },
    // update the online presence for a user or a recruiter
    updateOnlinePresence({ state }, payload) {
        return new Promise((resolve, reject) => {
            const url = 'v1/users/updateOnlinePresence';
            const body = {
                linkedIn: payload.linkedIn,
                facebook: payload.facebook,
                twitter: payload.twitter,
                behance: payload.behance,
                instagram: payload.instagram,
                gitHub: payload.gitHub,
                stackOverflow: payload.stackOverflow,
                youTube: payload.youTube,
                blog: payload.blog,
                website: payload.website,
                other : payload.other
            }
            const config = {
                headers: {
                    Authorization : `Bearer ${payload.userToken}`,
                }
            }
            axios
                .patch(url, body, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    },
    updateImage({state}, payload) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file' , payload.file); 
            const url = 'v1/users/updatepicture'
            const config = {
                headers: {
                    Authorization : `Bearer ${payload.userToken}`,
                    'content-type' : 'multipart/form-data'
                }
            }
            axios.put(url , formData, config)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error.response.data)
            })
        })
    }

};


export default {
    state,
    mutations,
    actions
};