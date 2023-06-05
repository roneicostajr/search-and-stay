<!-- eslint-disable import/no-extraneous-dependencies -->
<template>
  <div class="container v-100">
    <div class="row">
      <house-rule v-for="rule in houseRules" :key="rule.id" :rule-info="rule" />
  <Tutorial />
    </div>
  </div>
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
  height: 200px;
  min-width: 275px;
  border: 1px solid orangered;
  border-radius: 15px;
  box-sizing: border-box;
  margin: 10px;
  padding: 15px;
}
</style>
