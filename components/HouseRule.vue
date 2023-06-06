<template>
  <b-row class="house-rule w-100 my-1 align-items-center m-0">
    <div class="ml-2">
      <b-form-checkbox :checked="!!ruleInfo.active" switch></b-form-checkbox>
    </div>
    <div class="ml-2">{{ ruleInfo.name }}</div>
    <div class="ml-auto d-flex">
      <div class="">
        <b-button class="action edit" :id="'edit-rule-' + ruleInfo.id"
          ><b-icon icon="pencil-fill"></b-icon
        ></b-button>
      </div>
      <div class="">
        <div class="justify-content-start d-flex">
          <b-button class="action delete" :id="'delete-rule-' + ruleInfo.id"
            ><b-icon icon="trash-fill"></b-icon
          ></b-button>
        </div>
      </div>
    </div>
  </b-row>
</template>

<script>
export default {
  name: 'HouseRule',
  props: ['ruleInfo'],
  mounted() {
    // console.log(!!this.ruleInfo.active);
  },
};
</script>

<style scoped>
button.action {
  background-color: transparent;
  border-color: transparent;
  color: #b8b8b8;
}

button.action.edit:hover {
  color: #ff8f77;
}

button.action.delete:hover {
  color: #ff6767;
}
</style>
