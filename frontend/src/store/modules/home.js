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
    },
    getAllSkills({state}, payload) {
        return new Promise((resolve, reject) => {
            axios.get('/v1/users/getskills?limit=100&offset=0',
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
    postJob({state}, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/v1/jobs',{
                skills: payload.form_input.skills,
                jobDescription: payload.form_input.jobDescription,
                field: payload.form_input.field,
                salary: payload.form_input.salary,
                careerLevel: payload.form_input.careerLevel,
                experience: payload.form_input.experience,
                jobTitle: payload.form_input.jobTitle                
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
    deleteJob({state}, payload) {
        return new Promise((resolve, reject) => {
            axios.delete(`/v1/jobs/${payload.id}`,
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
    editJob({state}, payload) {
        console.log(payload.form_input);
        return new Promise((resolve, reject) => {
            axios.put(`/v1/jobs/${payload.form_input._id}`,{
                jobDescription: payload.form_input.jobDescription,
                field: payload.form_input.field,
                salary: payload.form_input.salary,
                careerLevel: payload.form_input.careerLevel,
                experience: payload.form_input.experience,
                jobTitle: payload.form_input.jobTitle,
                skills: payload.form_input.skills                
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
    getStatus({state}, payload) {
        console.log("get Status request:");
        console.log(payload);
        return new Promise((resolve, reject) => {
            axios.get(`/v1/jobapplications?job=${payload.job}&applicant=${payload.applicant}`,
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
    applyJob({state}, payload) {
        console.log("entering applyJob request:");
        console.log(payload);
        return new Promise((resolve, reject) => {
            axios.post('/v1/jobapplications',{
                job: payload.job              
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
    getApplications({state}, payload) {
        console.log("entering get applications request");
        return new Promise((resolve, reject) => {
            axios.get(`/v1/jobapplications?job=${payload.job}`,
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
};


export default {
    state,
    mutations,
    actions
};