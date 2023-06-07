<!-- eslint-disable import/no-extraneous-dependencies -->
<template>
  <b-container class="pt-4" v-if="!areRulesLoading">
    <house-rule v-for="rule in houseRules" :key="rule.id" :rule-info="rule" />
    <new-house-rule />
    <page-navigation :pagination="pagination" v-if="hasMultiplePages" />
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'IndexPage',
  methods: {
    ...mapActions(['getHouseRules']),
  },
  computed: {
    ...mapGetters([
      'houseRules',
      'hasMultiplePages',
      'pagination',
      'areRulesLoading',
    ]),
  },
  mounted() {
    this.getHouseRules();
  },
};
</script>

<style></style>
