<script lang="ts">
import { defineComponent, onRenderTracked, ref } from 'vue'
import JobList from './components/JobList.vue'
import Job from './types/job'
import OrderTerm from './types/OrderTerm'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '@/firebaseinit'

export default defineComponent({
  name: 'App',
  components: {JobList},
  async setup() {
    const jobs = ref<Job[]>([
      {title: 'Farmworker', location: 'Lon lon ranch', salary: 30000, id: '1', description: 'I am a Farmworker'},
      {title: 'Quarryman', location: 'Death mountian', salary: 60000, id: '2', description: 'I am a Quarryan'},
      {title: 'Fisher', location: 'Laje hylia', salary: 20000, id: '3', description: 'I am a Fisher'},
      {title: 'Flute player', location: 'The lost woods', salary: 30, id: '4', description: 'I am a Flute player'},
      {title: 'Prison guard', location: 'Gerudo Vally', salary: 130000, id: '5', description: 'I am a Prison guard'}
    ])

    const order = ref<OrderTerm>('title')
    
    let currentData: string[] = []
    const snapshop = getDocs(collection(db, "Jobs")).then((data) => {
      data.forEach((doc) => {
        currentData.push(doc.data()["id"])
      })
      
    })
    jobs.value.forEach((job) => {
      try {
        if (!currentData.includes(job.id)) {
          addDoc(collection(db, "Jobs"), {
            "id": job.id, 
            "title": job.title, 
            "location": job.location, 
            "description": job.description,
            "salary": job.salary
          })
        }
        else {
          console.log(`id ${job.id} already exists inside the database!`);
        }
      }
      catch (e) {
        console.log(e);
      }
    })

    const handleClick = (term: OrderTerm) => {
      order.value = term
    }

    return {jobs, handleClick, order}
  },
  methods: {
    
  }
})
</script>

<template>
  <div class="app">
      <h1>Hyryle Jobs ({{ jobs.length }})</h1>
      <div class="order">
        <button @click="handleClick('title')">Order by title</button>
        <button @click="handleClick('salary')">Order by salary</button>
        <button @click="handleClick('location')">Order by location</button>
      </div>
    <JobList :jobs="jobs" :order="order"/>
  </div>
</template>
