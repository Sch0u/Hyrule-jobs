<script lang="ts">
import Job from '@/types/job';
import {computed, defineComponent, Prop, PropType } from 'vue';
import OrderTerm from '@/types/OrderTerm';

export default defineComponent({
    props: {
        jobs: {
            required: true,
            type: Array as PropType<Job[]>
        },
        order: {
            required: true,
            type: String as PropType<OrderTerm>
        }
    },
    setup(props) {
        const orderedJobs = computed(() => {
            return [...props.jobs.sort((a: Job, b: Job) => {
                return a[props.order] > b[props.order] ? 1 : -1
            })]
        })

        return { orderedJobs }
    }
})
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
        <p> Ordered by {{ order }}</p>
        <ul>
            <li v-for="job in orderedJobs" :key="job.id">
                <h2>{{ job.title }} in {{ job.location }}</h2>
                <div class="salary">
                    <p>{{ job.salary }} </p>
                    <img src="@/assets/Rupee.png" alt="Rupee">
                </div>
                <div class="description">
                    <p>
                        Lerem ipsum dolor sit amet consectetur, adipisicing elit.
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>