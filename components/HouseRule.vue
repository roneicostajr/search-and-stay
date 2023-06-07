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
          <b-button
            class="action delete"
            :id="'delete-rule-' + ruleInfo.id"
            @click="promptDelete"
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
    ...mapActions(['updateRule', 'deleteRule']),
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
    promptDelete() {
      const swalOptions = {
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#FF6767',
        cancelButtonColor: '#D9D9D9',
        showCancelButton: true,
        text: `Confirmar a exclusão da regra "${this.ruleInfo.name}"`,
        customClass: {
          cancelButton: 'delete-cancel',
        },
      };
      this.$swal(swalOptions).then((result) => {
        if (result.isConfirmed) return this.confirmDelete();
        return this.$swal.close();
      });
    },
    async confirmDelete() {
      const { error } = await this.deleteRule(this.ruleInfo.id);
      if (!error) {
        return this.$bvToast.toast('Rule removed successfully', {
          autoHideDelay: 5000,
          variant: 'success',
          title: 'Removed',
        });
      }
      return this.$bvToast.toast('There was an error deleting this rule', {
        autoHideDelay: 5000,
        variant: 'danger',
        title: 'Error',
      });
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

.delete-cancel {
  color: black;
}
</style>
