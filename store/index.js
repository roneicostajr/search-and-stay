/* eslint-disable */
export const state = () => ({
  houseRules: [],
  hasMultiplePages: false,
  pagination: null,
  areRulesLoading: true,
});

export const getters = {
  houseRules({ houseRules }) {
    return houseRules;
  },
  hasMultiplePages({ hasMultiplePages }) {
    return hasMultiplePages;
  },
  pagination({ pagination }) {
    return pagination;
  },
  areRulesLoading({ areRulesLoading }) {
    return areRulesLoading;
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
  removeRuleById(state, ruleId) {
    const ruleIndex = state.houseRules.findIndex((rule) => rule.id === ruleId);
    if (ruleIndex !== -1) state.houseRules.splice(ruleIndex, 1);
  },
  setPagination(state, pagination) {
    state.hasMultiplePages = true;
    state.pagination = pagination;
  },
  rulesAreLoaded(state) {
    state.areRulesLoading = false;
  },
  setSinglePage(state) {
    state.hasMultiplePages = false;
    state.pagination = null;
  },
};

const hasDuplicate = (rules, ruleName) => {
  return rules.find(({ name }) => name.trim() === ruleName.trim());
};

export const actions = {
  async getHouseRules({ commit }, page = 1) {
    const params = {};

    if (page > 1) params.page = page;
    this.$axios
      .$get('https://sys-dev.searchandstay.com/api/admin/house_rules', {
        params,
      })
      .then((response) => {
        const { entities, pagination } = response.data;
        commit('updateRuleList', entities);
        commit('rulesAreLoaded');
        if (pagination.total_pages > 1) commit('setPagination', pagination);
        else commit('setSinglePage');
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
        return { error: null, status: 'SUCCESS' };
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
  async deleteRule({ commit }, ruleId) {
    return this.$axios
      .$delete(
        `https://sys-dev.searchandstay.com/api/admin/house_rules/${ruleId}`,
      )
      .then(() => {
        commit('removeRuleById', ruleId);
        return { error: null, status: 'SUCCESS' };
      })
      .catch(() => {
        return { error: 'GENERIC_ERROR' };
      });
  },
};
