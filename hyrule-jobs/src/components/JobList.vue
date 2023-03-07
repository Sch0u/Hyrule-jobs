<script lang="ts">
import Job from "@/types/job";
import JobModal from "./JobModal.vue";
import { computed, defineComponent, Prop, PropType } from "vue";
import OrderTerm from "@/types/OrderTerm";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  QuerySnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebaseinit";

export default defineComponent({
components: { JobModal },
  props: {
    jobs: {
      required: true,
      type: Array as PropType<Job[]>,
    },
    order: {
      required: true,
      type: String as PropType<OrderTerm>,
    },
  },
  data() {
    return {
      form: {
        id: "",
        title: "",
        location: "",
        salary: 0,
        description: "",
      },
    };
  },
  setup(props) {
    const orderedJobs = computed(() => {
      return [
        ...props.jobs.sort((a: Job, b: Job) => {
          return a[props.order] > b[props.order] ? 1 : -1;
        }),
      ];
    });

    return { orderedJobs };
  },
  methods: {
    findDocFromJobAtribute(docs: QuerySnapshot<DocumentData>, atribute: string, value: string): string {
      let id = "";

      docs.forEach((doc) => {
        if (doc.data()[atribute] == value) {
          id = doc.id;
        }
      });

      return id;
    },

    async editJob(id: string) {
      let docs = await getDocs(collection(db, "Jobs"));
      let docId = this.findDocFromJobAtribute(docs, "id", id);

      try {
        await updateDoc(doc(db, "Jobs", docId), {
          title: this.form.title,
          location: this.form.location,
          salary: this.form.salary,
          description: this.form.description,
        });
        this.$emit('update-jobs')
        console.log("Document successfully updated!");
      } catch (e) {
        console.log(e);
      }
    },

    async deleteJob(id: string) {
      let docs = await getDocs(collection(db, "Jobs"));
      let docId = this.findDocFromJobAtribute(docs, "id", id);

      try {
        await deleteDoc(doc(db, "Jobs", docId));
        this.$emit('update-jobs')
        console.log("Document successfully deleted!");
      } catch (e) {
        console.log(e);
      }
    },

    setForm(job: Job) {
      this.form.description = job.description;
      this.form.id = job.id;
      this.form.location = job.location;
      this.form.salary = job.salary;
      this.form.title = job.title;
    },
  },
});
</script>

<style scoped>
.job-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.job-list li {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.job-list h2 {
  margin: 0 0 10px;
  padding: capitalize;
}

.salary {
  font-weight: flex;
  display: flex;
  align-items: center;
}

.salary img {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}

.salary p {
  margin: 0;
  font-weight: bold;
  margin: 10px 0;
  color: #17bf66;
}
</style>

<template>
  <div class="job-list">
    <p>Ordered by {{ order }}</p>
    <ul>
      <li v-for="job in orderedJobs" :key="job.id">
        <h2>{{ job.title }} in {{ job.location }}</h2>
        <div class="salary">
          <p>{{ job.salary }}</p>
          <img src="@/assets/Rupee.png" alt="Rupee" />
        </div>
        <div class="description">
          <p>{{ job.description }}</p>
        </div>
        <div class="d-flex gap-2">
            <!-- Edit Job -->
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editJob" @click="setForm(job)">
                <font-awesome-icon :icon="['fas', 'edit']" /> Edit
            </button>
            
            <!-- Delete job -->
            <button class="btn btn-danger" @click="deleteJob(job.id)">
                <font-awesome-icon :icon="['fas', 'trash-can']" /> Delete
            </button>
        </div>
      </li>
    </ul>
    <!-- Modal -->
    <JobModal v-on:call-function="editJob" :form="form" :modal-title="'Edit a job'" :modal-button="'Edit'" :modal-id="'editJob'" />
  </div>
</template>