<template>
  <div class="col-4 house-rule">
    <div class="row flex-row-reverse mb-3">
      <div class="col-2 justify-content-end">
        <b-form-checkbox :checked="!!ruleInfo.active" switch></b-form-checkbox>
      </div>
    </div>
    <div class="row justify-content-center h-50">
      <div class="col-9 text-center">{{ ruleInfo.name }}</div>
    </div>
    <div class="row actions justify-content-center">
      <div class="col-5">
        <div class="row justify-content-end">
          <div class="col-9 justify-content-end d-flex">
            <b-button class="action" :id="'edit-rule-' + ruleInfo.id"
              ><b-icon icon="pencil"></b-icon
            ></b-button>
          </div>
        </div>
        <div
          class="row justify-content-center"
          :id="'edit-choices-' + ruleInfo.id"
        >
          <div class="col-4 action-choices d-none justify-content-center">
            <b-button class="choice" variant="success"
              ><b-icon icon="check" font-scale="0.75"></b-icon
            ></b-button>
          </div>
          <div class="col-4 action-choices d-none justify-content-center">
            <b-button class="choice" variant="danger"
              ><b-icon icon="x" font-scale="0.75"></b-icon
            ></b-button>
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="row justify-content-start">
          <div class="col-9 justify-content-start d-flex">
            <b-button class="action" :id="'delete-rule-' + ruleInfo.id"
              ><b-icon icon="trash"></b-icon
            ></b-button>
          </div>
        </div>
        <div
          class="row justify-content-center"
          :id="'delete-choices-' + ruleInfo.id"
        >
          <div class="col-4 action-choices d-none justify-content-center">
            <b-button class="choice" variant="success"
              ><b-icon icon="check" font-scale="0.75"></b-icon
            ></b-button>
          </div>
          <div class="col-4 action-choices d-none justify-content-center">
            <b-button class="choice" variant="danger"
              ><b-icon icon="x" font-scale="0.75"></b-icon
            ></b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HouseRule',
  props: ['ruleInfo'],
  mounted() {
    console.log(!!this.ruleInfo.active);
  },
};
</script>

<style scoped>
.actions button {
  border-radius: 50%;
}

.actions button.action {
  height: 45px;
  width: 45px;
  background-color: orangered;
  border-color: orangered;
}
.actions button.choice {
  height: 25px;
  width: 25px;
}
</style>
