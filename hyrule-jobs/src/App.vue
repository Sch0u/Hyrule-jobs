<script lang="ts">
import { defineComponent, onRenderTracked, ref } from "vue";
import JobList from "./components/JobList.vue";
import JobModal from "./components/JobModal.vue";
import Job from "./types/job";
import OrderTerm from "./types/OrderTerm";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/firebaseinit";

export default defineComponent({
  name: "App",
  components: { JobList, JobModal },
  data(){
    return {
      form: {
        title: "",
        location: "",
        salary: 0,
        description: "",
      }
    }
  },
  setup() {
    const jobs = ref<Job[]>([
      {
        title: "Farmworker",
        location: "Lon lon ranch",
        salary: 30000,
        id: "1",
        description: "I am a Farmworker",
      },
      {
        title: "Quarryman",
        location: "Death mountian",
        salary: 60000,
        id: "2",
        description: "I am a Quarryan",
      },
      {
        title: "Fisher",
        location: "Laje hylia",
        salary: 20000,
        id: "3",
        description: "I am a Fisher",
      },
      {
        title: "Flute player",
        location: "The lost woods",
        salary: 30,
        id: "4",
        description: "I am a Flute player",
      },
      {
        title: "Prison guard",
        location: "Gerudo Vally",
        salary: 130000,
        id: "5",
        description: "I am a Prison guard",
      },
    ]);

    const order = ref<OrderTerm>("title");

    const dbData = ref<any[]>([]);

    const handleClick = (term: OrderTerm) => {
      order.value = term;
    };

    return { jobs, handleClick, order, dbData };
  },
  methods: {
    async checkDb() {
      console.log("Checking database");
      let currentData: string[] = [];
      const snapshop = await getDocs(collection(db, "Jobs"));
      snapshop.forEach((doc) => {
        currentData.push(doc.data()["id"]);
      });

      this.jobs.forEach((job) => {
        try {
          if (!currentData.includes(job.id)) {
            console.log(`id ${job.id} does not exist inside the database!`)
            addDoc(collection(db, "Jobs"), {
              id: job.id,
              title: job.title,
              location: job.location,
              description: job.description,
              salary: job.salary,
            });
            this.updateData();
          } else {
            console.log(`id ${job.id} already exists inside the database!`);
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    async getData(){
      const snapshop = await getDocs(collection(db, "Jobs"));
      snapshop.forEach((doc) => {
        this.dbData.push(doc.data());
      });
    },
    async addJob(){
      console.log(this.form)
      try {
        // Add data to database
        const docRef = await addDoc(collection(db, "Jobs"), {
          id: this.dbData.length + 1,
          title: this.form.title,
          location: this.form.location,
          description: this.form.description,
          salary: this.form.salary,
        });
        console.log("Document written with ID: ", docRef.id);
        // Get data from database
        this.updateData();
      } catch (e) {
        // Error handling
        console.error("Error adding document: ", e);
      }

    },
    async updateData(){
      console.log("Updating Data")
      this.dbData = [];
      this.getData();
    }
  },
  mounted() {
    this.checkDb();
    this.getData();
  },
});
</script>

<template>
  <div class="app m-4">
    <h1>Hyryle Jobs ({{ dbData.length }})</h1>
    <hr>
    <div class="d-flex gap-2 order mb-2">
      <button type="button" class="btn btn-primary" @click="handleClick('title')">Order by title</button>
      <button type="button" class="btn btn-primary" @click="handleClick('salary')">Order by salary</button>
      <button type="button" class="btn btn-primary" @click="handleClick('location')">Order by location</button>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addJob">
        Add new job
      </button>
    </div>
    <JobList v-on:update-jobs="updateData" :jobs="dbData" :order="order" />

    <JobModal v-on:call-function="addJob" :form="form" :modal-title="'Add a new job'" :modal-button="'Add'" :modal-id="'addJob'" />
</div>
</template>
