import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone.ts';
import createId from '@/lib/createId.ts';
import router from '@/router';

type RootState = {
  tagList: Tag[],
  record: RecordItem,
  recordList: RecordItem[],
  currentTag?: Tag

}
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tagList: [],
    record: {
      tag: [], type: '-', notesAndAmount: {notes: '', amount: '0'}, createAt: ''
    },
    recordList: [],
    currentTag: undefined,
  } as RootState,

  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    fetchRecord(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    createRecord(state, record) {
      const record2 = clone(record);
      record2.createAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecord');
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]') as Tag[];
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state) {
      const name = window.prompt('请输入标签名');
      const names = state.tagList.map(item => item.name);
      if (name) {
        if (names.indexOf(name) >= 0) {
          window.alert('已创建相同的标签');
        } else {
          const id = createId().toString();
          const tag = {id, name};
          state.tagList.push(tag);
          store.commit('saveTags');
          window.alert('添加成功');
        }
      }

    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const nameList = state.tagList.map(item => item.name);
      if (nameList.indexOf(name) >= 0) {
        window.alert('标签名重复');
      } else {
        const tag = state.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        store.commit('saveTags');
        window.alert('修改成功');
      }
    },

    removeTag(state, tag: Tag) {
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