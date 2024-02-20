<script setup>

const users = [
  { id: 1, username: 'hanzla', password: 'abc123', role: 'superuser', companies: [] },
  { id: 2, username: 'mashhood', password: 'abc123', role: 'admin', companies: [1, 2] },
  { id: 3, username: 'kayani', password: 'abc123', role: 'admin', companies: [3] },
  { id: 4, username: 'testuser', password: 'abc123', role: 'admin', companies: [4, 5] },
]

localStorage.setItem('users', JSON.stringify(users));



</script>

<template>

</template>

<style scoped>
</style>

