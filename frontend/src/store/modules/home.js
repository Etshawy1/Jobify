import axios from "axios";

const state = {};

const mutations = {};

const actions = {
    // an action for update user data request
    getNewFeeds({state}, payload) {
        return new Promise((resolve, reject) => {
            axios.get('/v1/jobs?limit=10&offset=0', {
            },
            {
                headers: {
                    Authorization: `Bearer ${payload.userToken}`
                }
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data);
            })
        })
    }
};


export default {
    state,
    mutations,
    actions
};