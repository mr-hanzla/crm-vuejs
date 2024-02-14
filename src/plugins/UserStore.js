import { createStore } from 'vuex';
import axios from 'axios';

const userStore = createStore({
  state() {
    return {
      count: 9090,
      user: null,
      isAuthenticated: false
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    updateCount(state, payload) {
      state.count = payload
    },
    updateUser(state, payload) {
      state.user = payload;
      state.isAuthenticated = true;
      localStorage.setItem('current-user', JSON.stringify(state.user));
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('current-user');
    }
  },

  actions: {
    loadState(context) {
      const curUser = localStorage.getItem('current-user');
      if (curUser) {
        this.state.user = JSON.parse(curUser);
        this.state.isAuthenticated = true;
      }
    },
    saveState(context) {
      if (this.state.user) {
        localStorage.setItem('current-user', JSON.stringify(this.state.user));
      }
    },
    updateUser({ commit }, payload) {
      commit('updateUser', payload)
    },
    async signin(context, { username, password }) {
      try {
        const credentials = {
          username: username,
          password: password
        }
        const response = await axios.post('https://dummyjson.com/auth/login', credentials)
        context.dispatch('updateUser', response.data);
        return true;
      } catch (error) {
        // clearCredentials();
        // errorMessage.value = 'Invalid Username or Password!';
        console.log(error);
        return false;
      }
    },
    signout(context) {
      context.commit('clearUser');
    },
  },

  getters: {
  }
})

// Load state from local storage when the application starts
userStore.dispatch('loadState');

// Save state to local storage whenever it changes
userStore.subscribe((mutation, state) => {
  userStore.dispatch('saveState');
});

export default userStore;
