import axios from 'axios';
const state = {};
const mutations = {};
const actions = {
  adminGetAllSkills({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/users/getskills', {
          headers: {
            Authorization: `Bearer ${payload.userToken}`,
          },
          params: {
            limit: payload.limit,
            offset: payload.offset,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },
  adminAddSkill({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/v1/admins/skill',
          {
            name: payload.name,
          },
          {
            headers: {
              Authorization: `Bearer ${payload.userToken}`,
            },
          },
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },
  adminDeleteSkill({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/v1/admins/skill/${payload._id}`, {
          headers: {
            Authorization: `Bearer ${payload.userToken}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },
  adminUpdateSkill({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `/v1/admins/skill/${payload._id}`,
          {
            name: payload.name,
          },
          {
            headers: {
              Authorization: `Bearer ${payload.userToken}`,
            }
          },
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
