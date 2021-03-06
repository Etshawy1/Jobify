import axios from 'axios'
const state = {}
const mutations = {}
const actions = {
  adminGetAllSkills ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/users/getskills', {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          },
          params: {
            limit: payload.limit,
            offset: payload.offset
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminAddSkill ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/v1/admins/skill',
          {
            name: payload.name
          },
          {
            headers: {
              Authorization: `Bearer ${payload.userToken}`
            }
          }
        )
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminRejectedApplicantsCount ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/admins/notselectedcount', {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminViewedApplicantsCount ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/admins/viewedcount', {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminApplicantsCount ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/admins/inconsiderationcount', {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminPostedJobs ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/admins/appliedjobscount', {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminDeleteSkill ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/v1/admins/skill/${payload._id}`, {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminUpdateSkill ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `/v1/admins/skill/${payload._id}`,
          {
            name: payload.name
          },
          {
            headers: {
              Authorization: `Bearer ${payload.userToken}`
            }
          }
        )
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminGetAllJobTitles ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/users/getJobTitles', {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          },
          params: {
            limit: payload.limit,
            offset: payload.offset
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminAddJobTitle ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/v1/admins/JobTitle',
          {
            name: payload.name
          },
          {
            headers: {
              Authorization: `Bearer ${payload.userToken}`
            }
          }
        )
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminDeleteJobTitle ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/v1/admins/JobTitle/${payload._id}`, {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminUpdateJobTitle ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `/v1/admins/JobTitle/${payload._id}`,
          {
            name: payload.name
          },
          {
            headers: {
              Authorization: `Bearer ${payload.userToken}`
            }
          }
        )
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminGetAllCategories ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/users/getCategories', {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          },
          params: {
            limit: payload.limit,
            offset: payload.offset
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminAddCategory ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/v1/admins/Category',
          {
            name: payload.name
          },
          {
            headers: {
              Authorization: `Bearer ${payload.userToken}`
            }
          }
        )
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminDeleteCategory ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/v1/admins/category/${payload._id}`, {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminUpdateCategory ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `/v1/admins/category/${payload._id}`,
          {
            name: payload.name
          },
          {
            headers: {
              Authorization: `Bearer ${payload.userToken}`
            }
          }
        )
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminGetAllLanguages ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/users/getLanguages', {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          },
          params: {
            limit: payload.limit,
            offset: payload.offset
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminAddLanguage ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/v1/admins/Language',
          {
            name: payload.name
          },
          {
            headers: {
              Authorization: `Bearer ${payload.userToken}`
            }
          }
        )
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminDeleteLanguage ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/v1/admins/Language/${payload._id}`, {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminUpdateLanguage ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `/v1/admins/Language/${payload._id}`,
          {
            name: payload.name
          },
          {
            headers: {
              Authorization: `Bearer ${payload.userToken}`
            }
          }
        )
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminGetAllRecruiters ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/admins/recruiters', {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          },
          params: {
            limit: payload.limit,
            offset: payload.offset
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminDeleteRecruiter ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/v1/admins/recruiter/${payload._id}`, {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  adminUpdateRecruiter ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `/v1/admins/recruiter/${payload._id}`,
          {
            name: payload.name
          },
          {
            headers: {
              Authorization: `Bearer ${payload.userToken}`
            }
          }
        )
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
