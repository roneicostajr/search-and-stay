<template>
  <b-row id="new-rule" class="justify-content-center my-3 m-0">
    <div v-if="!isCreating">
      <b-button @click="isCreating = true"
        ><b-icon icon="plus"></b-icon
      ></b-button>
    </div>
    <b-row class="w-100 align-items-center house-rule" v-else>
      <div class="ml-2">
        <b-form-checkbox :checked="true" switch disabled></b-form-checkbox>
      </div>

      <div class="ml-2">
        <div class="name-edit">
          <input
            type="text"
            name=""
            id="new-rule-name"
            v-model="house_rules.name"
          />
          <b-icon
            icon="check-square-fill"
            font-scale="0.90"
            @click="createRule"
          ></b-icon>
          <b-icon
            icon="x-square-fill"
            font-scale="0.90"
            @click="isCreating = false"
            variant="danger"
          ></b-icon>
        </div>
      </div>
    </b-row>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex';
// eslint-disable-next-line import/no-unresolved
import errorCodes from '@@/assets/constants/errorCodes';

export default {
  name: 'NewHouseRule',
  data() {
    return {
      isCreating: false,
      house_rules: {
        name: '',
        active: true,
      },
    };
  },
  methods: {
    ...mapActions(['createNewRule']),

    async createRule() {
      if (this.house_rules.name === '') return;
      const { error, status } = await this.createNewRule(this.house_rules);
      if (!error) {
        this.showSuccessToast(status);
        this.isCreating = false;
        this.house_rules.name = '';
        return;
      }
      this.inputFieldError(error);
    },
    inputFieldError(error) {
      const inputField = document.getElementById('new-rule-name');
      inputField.classList.add('has-error');
      inputField.focus();
      this.$bvToast.toast(errorCodes[error], {
        autoHideDelay: 5000,
        variant: 'danger',
        title: 'Error',
      });
    },
    showSuccessToast(status) {
      const creationSuccesMessage = `Rule ${this.house_rules.name} created successfully`;
      this.$bvToast.toast(
        `${creationSuccesMessage} ${
          status === 'CREATED_ON_ANOTHER_PAGE' ? 'on another page' : ''
        }`,
        {
          autoHideDelay: 5000,
          variant: 'success',
          title: 'Created!',
        },
      );
    },
  },
  watch: {
    isCreating() {
      this.$nextTick(() => {
        if (this.isCreating) document.getElementById('new-rule-name').focus();
      });
    },
  },
};
</script>

<style scoped>
#create-active {
  pointer-events: none;
}

input[type='text'].has-error:focus {
  box-shadow: 0 0 10px #ff6767;
}
</style>
