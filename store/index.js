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
  updateRuleById(state, updatedRule) {
    const ruleIndex = state.houseRules.findIndex(
      (rule) => rule.id === updatedRule.id,
    );
    if (ruleIndex !== -1) state.houseRules.splice(ruleIndex, 1, updatedRule);
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
  async updateRule({ commit }, updatedRule) {
    const { name, active, id } = updatedRule;

    return this.$axios
      .$put(`https://sys-dev.searchandstay.com/api/admin/house_rules/${id}`, {
        house_rules: { name, active },
      })
      .then((response) => {
        commit('updateRuleById', response.data);
        return true;
      });
  },
};
