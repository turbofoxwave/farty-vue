import Vue from 'vue';
import Vuex, { StoreOptions, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from './types';

Vue.use(Vuex);

const getterObj: GetterTree<RootState, RootState> = {
  getLogs(state): string[] {
    return state.logs;
  },
};

const mutationsObj: MutationTree<RootState> = {
  addLog(state, msg: string) {
    state.logs.push(msg);
    if (state.logs.length > 10) {
      state.logs.shift();
    }
  },
};

const actionsObj: ActionTree<RootState, RootState> = {
  addLog({ commit }, msg: string): void {
    commit('addLog', msg);
  },
};

const storage: StoreOptions<RootState> = {
  state: {
    logs: [],
  },
  getters: getterObj,
  mutations: mutationsObj,
  actions: actionsObj,
};

const store = new Vuex.Store(storage);

export default store;
