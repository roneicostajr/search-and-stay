/* eslint-disable */
export const state = () => ({
  houseRules: [],
});

export const getters = {
  houseRules(state) {
    return state.houseRules;
  },
};

export const mutations = {
  updateRuleList(state, rules) {
    state.houseRules = rules;
  },
};

export const actions = {
  async getHouseRules({ commit }) {
    this.$axios
      .$get('https://sys-dev.searchandstay.com/api/admin/house_rules')
      .then((response) => {
        commit('updateRuleList', response.data.entities);
      });
  },
};
