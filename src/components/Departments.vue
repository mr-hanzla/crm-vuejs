<script setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';

const departmentList = reactive([
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Sales' },
  { id: 3, name: 'Technical' },
  { id: 4, name: 'Marketing' },
  { id: 5, name: 'HR' },
  { id: 6, name: 'Office Staff' },
])

onMounted(() => {
  console.log('Departments are mounted!')
})
</script>

<template>
  <div style="margin-left: 50%;">
    <h1>Departments</h1>
    <h1>Departments</h1>
    <h1>Departments</h1>
    <h1>Departments</h1>
    <h1>Departments</h1>
  </div>
</template>

<style></style>
