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
  addRuleToList(state, rule) {
    state.houseRules.push(rule);
  },
  updateRuleById(state, updatedRule) {
    const ruleIndex = state.houseRules.findIndex(
      (rule) => rule.id === updatedRule.id,
    );
    if (ruleIndex !== -1) state.houseRules.splice(ruleIndex, 1, updatedRule);
  },
};

const hasDuplicate = (rules, ruleName) => {
  return rules.find(({ name }) => name.trim() === ruleName.trim());
};

export const actions = {
  async getHouseRules({ commit }) {
    this.$axios
      .$get('https://sys-dev.searchandstay.com/api/admin/house_rules')
      .then((response) => {
        commit('updateRuleList', response.data.entities);
      });
  },
  async createNewRule({ commit, state }, house_rules) {
    if (hasDuplicate(state.houseRules, house_rules.name)) {
      return { error: 'HAS_DUPLICATE' };
    }

    return this.$axios
      .$post('https://sys-dev.searchandstay.com/api/admin/house_rules', {
        house_rules,
      })
      .then((response) => {
        if (state.houseRules.length >= 10)
          return { error: null, status: 'CREATED_ON_ANOTHER_PAGE' };
        commit('addRuleToList', response.data);
        return { error: null, status: 'CREATED' };
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
