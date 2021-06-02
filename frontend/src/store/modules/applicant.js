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
                dateOfBirth: payload.dateOfBirth
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