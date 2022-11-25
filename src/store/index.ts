import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tagList: [] as string[],
    record:{
      tag: [], type: '-', notesAndAmount:{notes:'',amount:'0'}, createAt: ''
    } as RecordItem,
    recordList: [] as RecordItem[],
    currentTag: ''
  },
  mutations: {
    setCurrentTag(state, tag: string) {
      state.currentTag = state.tagList.filter(t => t === tag)[0];
    },
    fetchRecord(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state, record) {
      state.recordList.push(record);
      store.commit('saveRecord');
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]') as string[];
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
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
        store.commit('saveTags');
      }
    },

    removeTag(state, tag: string) {
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i] === tag) {
          state.tagList.splice(i, 1);
          store.commit('saveTags');
          router.back();
          break;
        }
      }
    },
  },
  actions: {},
  modules: {}
});

export default store;