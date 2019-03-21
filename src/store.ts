import Vue from 'vue';
import Vuex, { StoreOptions, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from './types';
import { LogMessage } from './lib/LogMessage';
import { GutLevels } from './lib/GutLevels';

Vue.use(Vuex);

const getterObj: GetterTree<RootState, RootState> = {
  getLogs(state): LogMessage[] {
    return state.logs;
  },
  getGutLevels(state): GutLevels[] {
    return state.gutLevels;
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
  addGutLevels(state, levels: GutLevels) {
    state.gutLevels.push(levels);
    if (state.gutLevels.length > 200) {
      state.gutLevels.shift();
    }
  },
};

const actionsObj: ActionTree<RootState, RootState> = {
  addLog({ commit }, msg: string): void {
    commit('addLog', msg);
  },
  addGutLevels({ commit }, levels: GutLevels): void {
    commit('addGutLevels', levels);
  },

};

const storage: StoreOptions<RootState> = {
  state: {
    logs: [],
    gutLevels: new Array<GutLevels>(),
  },
  getters: getterObj,
  mutations: mutationsObj,
  actions: actionsObj,
};

const store = new Vuex.Store(storage);

export default store;
