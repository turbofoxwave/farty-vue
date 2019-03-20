import Vue from 'vue';
import Vuex, { StoreOptions, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from './types';
import { LogMessage } from './lib/LogMessage';

Vue.use(Vuex);

const getterObj: GetterTree<RootState, RootState> = {
  getLogs(state): LogMessage[] {
    return state.logs;
  },
};

let logLineCount = 0;
const mutationsObj: MutationTree<RootState> = {
  addLog(state, msg: string) {
    if (logLineCount > 1000) {
      logLineCount = 0;
    }
    state.logs.unshift(new LogMessage(logLineCount++, msg));
    if (state.logs.length > 50) {
      state.logs.pop();
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
