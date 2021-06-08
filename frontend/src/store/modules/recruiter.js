import axios from "axios";

const state = {};

const mutations = {};

const actions = { 
    setRecruiterMandatoryData({ state }, payload) {
        return new Promise((resolve, reject) => {
            const url = 'v1/recruiters/updatedata';
            const body = {
                name: payload.companyName,
                address: payload.companyAddress,
                employeesCount: payload.employeesCount,
                field: payload.field,
                description: payload.description,
                linkedIn: payload.linkedIn
            };
            const config = {
                headers: {
                    Authorization : `Bearer ${payload.userToken}`,
                }
            }

            axios.patch(url, body, config)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data);
            })
        })
    },
    getRecruiterProfileData({ state }, payload) {
        return new Promise((resolve, reject) => {
            const url = `v1/users/profile/${payload.id}`;

            axios.get(url, {})
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