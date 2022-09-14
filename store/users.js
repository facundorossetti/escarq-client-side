export const state = () => ({
  loadingUsers: false,
  searchUsers: '',
  createUserDialog: false,
  validCreateUser: false,
  userItems: [],
})

export const mutations = {
  // Handlers
  loadingUsersDialogHandler(state, value) {
    state.loadingUsers = value;
  },
  createUserDialogHandler(state, value) {
    state.createUserDialog = value;
  },
  searchUsersUserHandler(state, value) {
    state.searchUsers = value;
  },
  validCreateUserHandler(state, value) {
    state.validCreateUser = value;
  },

  // Populate
  populateUsers(state, value) {
    state.userItems = value;
  }
}

export const getters = {}

export const actions = {
  async getUsers({ commit }) {
    commit('loadingUsersDialogHandler', true);
    await this.$axios('/users')
      .then((r) => commit('populateUsers', r.data))
      .catch((err) => console.log(err))
    commit('loadingUsersDialogHandler', false);
  },
  async deleteUser ({ dispatch }, id) {
    await this.$axios.delete(`/users/${id}`)
      .then(() => dispatch('getUsers'))
      .catch((err) => console.log(err))
  },
  async createUser ({ commit, dispatch, state }, user) {
    if (state.validCreateUser) {
      await this.$axios.post('/users', user)
        .then(() => {
          commit('createUserDialogHandler', false)
          dispatch('getUsers');
        })
        .catch((err) => console.log(err))
    };
  },
}
