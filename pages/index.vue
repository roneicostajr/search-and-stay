<!-- eslint-disable import/no-extraneous-dependencies -->
<template>
  <b-container class="pt-4">
    <house-rule v-for="rule in houseRules" :key="rule.id" :rule-info="rule" />
    <new-house-rule />
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
    ...mapGetters(['houseRules']),
  },
  mounted() {
    this.getHouseRules();
  },
};
</script>

<style>
.house-rule {
  height: 50px;
  min-width: 300px;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: white;
  padding: 0px 15px;
}
</style>
