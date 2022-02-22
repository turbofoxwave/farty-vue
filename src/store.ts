import Vue from 'vue';
import Vuex, { StoreOptions, MutationTree, ActionTree, GetterTree } from 'vuex';
import Phaser from 'phaser';
import { RootState } from '@/types';
import { LogMessage } from '@/lib/LogMessage';
import { LogLevel } from '@/lib/LogLevel';
import { GutLevels } from '@/lib/GutLevels';

Vue.use(Vuex);

const getterObj: GetterTree<RootState, RootState> = {
  getLogLevel(state): number {
    return state.logLevel;
  },
  getLogs(state): LogMessage[] {
    return state.logs;
  },
  getGutLevels(state): GutLevels[] {
    return state.gutLevels;
  },
  getGame(state): Phaser.Game {
    return state.game;
  },
};

let logLineCount = 0;
const mutationsObj: MutationTree<RootState> = {
  setLogLevel(state, level: number) {
    state.logLevel = level;
  },
  addLog(state, msg: string) {
    // logline is for sequence ref.. we'll just roll it over for now if it gets to big.
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
    if (state.gutLevels.length > 50) {
      state.gutLevels.shift();
    }
  },
  setGame(state, game: Phaser.Game) {
    state.game = game;
  },

};

const actionsObj: ActionTree<RootState, RootState> = {
  setLogLevel({ commit }, logLevel: number): void {
    commit('setLogLevel', logLevel);
  },
  addLog({ commit }, msg: string): void {
    commit('addLog', msg);
  },
  addGutLevels({ commit }, levels: GutLevels): void {
    commit('addGutLevels', levels);
  },
  setGame({ commit }, game: Phaser.Game): void {
    commit('setGame', game);
  },
};

const storage: StoreOptions<RootState> = {
  state: {
    logLevel: LogLevel.INFO,
    logs: [],
    gutLevels: new Array<GutLevels>(new GutLevels(0, 0, 0), new GutLevels(0, 0, 0)),
    game: {} as Phaser.Game,
  },
  getters: getterObj,
  mutations: mutationsObj,
  actions: actionsObj,
};

const store = new Vuex.Store(storage);

export default store;
