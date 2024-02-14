<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  const curUser = localStorage.getItem('current-user');
  if (!curUser) {
    router.push({ name: 'signin' })
  }
})
</script>

<template>
  <h1>Dashboard</h1>
</template>

<style scoped></style>
