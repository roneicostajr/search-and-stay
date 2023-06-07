<template>
  <b-row class="justify-content-center mb-5">
    <div>
      <b-icon
        icon="chevron-left"
        class="nav-button"
        font-scale=""
        @click="navigateTo(pagination.current_page - 1)"
      ></b-icon>
    </div>
    <div>
      <span
        v-for="page in pagination.total_pages"
        :key="page.current_page"
        :class="[page === pagination.current_page ? 'current-page' : '']"
        class="mx-2 h5 page nav-button"
        @click="navigateTo(page)"
        >{{ page }}</span
      >
    </div>
    <div>
      <b-icon
        icon="chevron-right"
        class="nav-button"
        font-scale=""
        @click="navigateTo(pagination.current_page + 1)"
      ></b-icon>
    </div>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PageNavigation',
  props: ['pagination'],
  methods: {
    ...mapActions(['getHouseRules']),
    navigateTo(page) {
      if (page < 1 || page > this.pagination.total_pages) return;
      this.getHouseRules(page);
    },
  },
};
</script>

<style scoped>
.page {
  font-weight: 600;
  line-height: 1;
  color: #bdbdbd;
}

.page.current-page {
  color: #fb3b11;
}

.nav-button {
  cursor: pointer;
  color: #bdbdbd;
}
</style>
