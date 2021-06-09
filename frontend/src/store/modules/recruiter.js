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
                description: payload.description
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
    },
    updateImageRecuiter({state}, payload) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file' , payload.file); 
            const url = 'v1/recruiters/updatepicture'
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