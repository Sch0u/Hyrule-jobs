<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        modalId:{
            required: true,
            type: String,
        },
        modalTitle: {
            required: true,
            type: String,
        },
        modalButton: {
            required: true,
            type: String,
        },
        form: {
            required: true,
            type: Object,
        },
    },
    setup() {
        // console.log(modalId)
    },
    methods: {
        callFunction() {
            console.log("callFunction")
            this.$emit('call-function')
        }
    }
})
</script>

<template>
    <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="modalId" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="titleLabel">{{ modalTitle }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="titleInput" class="form-label">Title</label>
                <input type="text" class="form-control" id="titleInput" v-model="form.title" >
              </div>
              <div class="mb-3">
                <label for="locationInput" class="form-label">Location</label>
                <input type="text" class="form-control" id="locationInput" v-model="form.location">
              </div>
              <div class="mb-3">
                <label for="salaryInput" class="form-label">Salary</label>
                <input type="number" class="form-control" id="salaryInput" v-model="form.salary">
              </div>
              <div class="mb-3">
                <label for="descriptionInput" class="form-label">Description</label>
                <textarea class="form-control" id="descriptionInput" rows="3" v-model="form.description"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" @click="callFunction()" data-bs-dismiss="modal" class="btn btn-primary">{{ modalButton }}</button>
          </div>
        </div>
      </div>
    </div>
</template>