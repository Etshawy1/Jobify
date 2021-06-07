import axios from "axios";

const state = {};

const mutations = {};

const actions = {
    // an action for update user data request
    getNewFeeds({state}, payload) {
        return new Promise((resolve, reject) => {
            axios.get('/v1/jobs?limit=100&offset=0', {
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
    },
    getJobDetails({state}, payload) {
        console.log("token: " + payload.userToken);
        console.log("id: " + payload.id);
        return new Promise((resolve, reject) => {
            axios.get(`/v1/jobs/${payload.id}`,
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
    },
    getMyJobs({state}, payload) {
        console.log("token: " + payload.userToken);
        console.log("recruiter_user_id: " + payload.recruiter_user_id);
        return new Promise((resolve, reject) => {
            axios.get(`/v1/jobs/recruiter/${payload.recruiter_user_id}?limit=100&offset=0`,
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