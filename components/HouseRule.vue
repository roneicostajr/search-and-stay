<template>
  <b-row class="house-rule w-100 my-1 align-items-center m-0">
    <div class="ml-2">
      <b-form-checkbox :checked="!!ruleInfo.active" switch></b-form-checkbox>
    </div>

    <div class="ml-2">
      <div v-if="!isEditing">{{ ruleInfo.name }}</div>
      <div class="name-edit" v-else>
        <input type="text" name="" id="" v-model="editableRule.name" />
        <b-icon
          icon="check-square-fill"
          font-scale="0.90"
          @click="confirmUpdate"
        ></b-icon>
        <b-icon
          icon="x-square-fill"
          font-scale="0.90"
          @click="toggleUpdate"
          variant="danger"
        ></b-icon>
      </div>
    </div>

    <div class="ml-auto d-flex">
      <div class="">
        <b-button
          class="action edit"
          :id="'edit-rule-' + ruleInfo.id"
          @click="toggleUpdate"
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
import { mapActions } from 'vuex';

export default {
  name: 'HouseRule',
  props: ['ruleInfo'],
  data() {
    return {
      isEditing: false,
      editableRule: {
        name: this.ruleInfo.name,
        active: this.ruleInfo.active,
      },
    };
  },
  mounted() {},
  methods: {
    ...mapActions(['updateRule']),
    toggleUpdate() {
      this.editableRule.name = this.ruleInfo.name;
      this.isEditing = !this.isEditing;
    },
    async confirmUpdate() {
      const updateSuccess = await this.updateRule({
        ...this.editableRule,
        id: this.ruleInfo.id,
      });
      if (updateSuccess) {
        this.isEditing = false;
      }
    },
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

.name-edit button {
  backface-visibility: hidden;
}

.name-edit .b-icon {
  color: #28a744;
  cursor: pointer;
}
</style>
