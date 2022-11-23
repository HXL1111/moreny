import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



const store = new Vuex.Store({
  state: {
    tagList: [] as string[],

  },
  mutations: {
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tags') || '[]');
    },
    saveTags(state){
      window.localStorage.setItem('tags',JSON.stringify(state.tagList))
    },
    createTag(state) {
      const name = window.prompt('请输入标签名');
      if (!name) {
        window.alert('标签名不能为空');
      } else {
        if (state.tagList) {
          if (state.tagList.indexOf(name) >= 0) {
            window.alert('标签名已存在');
          } else {
            state.tagList.push(name);
          }
        }
        store.commit('saveTags')
      }
    }
  },
  actions: {},
  modules: {}
});

export default store