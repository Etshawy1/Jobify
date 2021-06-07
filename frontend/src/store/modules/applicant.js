import axios from "axios";

const state = {};

const mutations = {};

const actions = {
    // an action for update user data request
    setApplicantMandatoryData({state}, payload) {
        return new Promise((resolve, reject) => {
            axios.patch('/v1/users/updateapplicantdata', {
                firstName: payload.firstname,
                lastName : payload.lastname,
                dateOfBirth: payload.dateOfBirth,
                gender: payload.gender,
                phone: payload.phone
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
    // an action to update the applicant's CV
    updateCV({state}, payload) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file' , payload.file); 
            const url = 'v1/users/updatecv'
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
    },
    getApplicantProfileData({ state }, payload) {
        return new Promise((resolve, reject) => {
            const url = `v1/users/profile/${payload.id}`;
            const config = {
                headers: {
                    Authorization : `Bearer ${payload.userToken}`,
                }
            }

            axios.get(url, config)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data);
            })
        })
    },
    // fetch the available skills for the user to select from
    getAvailableskills({ state }, payload) {
        return new Promise((resolve, reject) => {
            const url = "v1/users/getskills?limit=20&offset=0"
            const config = {
                headers: {
                    Authorization : `Bearer ${payload.userToken}`,
                }
            }

            axios.get(url, config)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error.response.data);
            })
        })
    },
    addSkillToApplicant({ state }, payload) {
        return new Promise((resolve, reject) => {
            const url = 'v1/users/updateskills'
            const body = payload.skill;
            const config = {
                headers: {
                    Authorization : `Bearer ${payload.userToken}`,
                }
            };

            axios.patch(url, body, config)
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