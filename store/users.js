import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  user: {},
  pagination: {
    descending: true,
    page: 1,
    rowsPerPage: 16,
    sortBy: '',
    totalItems: 0,
    rowsPerPageItems: [1, 2, 4, 8, 16,32,80]
  },
  params: {
    name: '',
  }
});

export const mutations = {
  setPagination (state, payload) {
    state.pagination = payload
  },
  setParams (state, payload) {
    state.params = payload
  },
  set(state, users) {
    state.list = users.items;
    state.pagination.totalItems = users.totalItems;
    console.log(users.users);
  },
  add(state, value) {
    merge(state.list, value)
  },
  remove(state, {user}) {
    state.list.filter(c => user.id !== c.id)
  },
  mergeUsers(state, form) {
    assign(state.user, form)
  },
  setUsers(state, form) {
    state.user = form
  }
};
export const getters = {
  loading (state) {
    return state.loading
  },
  pagination (state) {
    return state.pagination
  },
  params (state) {
    return state.params
  },
  list (state) {
    return state.list
  }
}

export const actions = {
  async get({commit, rootState}) {
    const { sortBy, descending, page, rowsPerPage } = rootState.users.pagination
    const { name } = rootState.users.params
    
    var params = {
      limit: rowsPerPage,
      page,
      name,
    } 
    
    await this.$axios.get(`/users`, { params })
      .then((res) => {
        if (res.status === 200) {
          var items = res.data.data;
          var totalItems = res.data.meta.total;
          commit('set', { items, totalItems })
        }
      })
  },
  async show({commit}, params) {
    await this.$axios.get(`/users/${params.user_id}`)
      .then((res) => {
        if (res.status === 200) {
          commit('mergeUsers', res.data.data)
        }
      })
  },
  async set({commit}, users) {
    await commit('set', users)
  },
  async form({commit}, form) {
    await commit('mergeUsers', form)
  },
  async add({commit}, user) {
    await commit('add', user)
  },
  create({commit}, params) {
    return this.$axios.post(`/users`, params)
  },
  update({commit}, params) {
    return this.$axios.put(`/users/${params.id}`, params)
  },
  delete({commit}, params) {
    return this.$axios.delete(`/users/${params.id}`)
  }
};