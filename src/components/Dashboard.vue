<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Company from '@/components/Company.vue';
import AddCompany from '@/components/AddCompany.vue';
import Departments from './Departments.vue';

const userStore = useStore('UserStore');
const currentUser = ref('');
const router = useRouter();

let tempComponent = Company;
const curCompo = ref(Company);

function changeComponent(componentName) {
  switch (componentName) {
    case "company-data":
      tempComponent = Company;
      break;
    case "register-company":
      tempComponent = AddCompany;
      break;
    default:
      break;
  }
}

function signout() {
  console.log('signing out...');
  // userStore.dispatch('signout');
  localStorage.removeItem('current-user');
  router.push({ name: 'signin' });
}

onMounted(() => {
  currentUser.value = JSON.parse(localStorage.getItem('current-user'));
  // currentUser.value = userStore.getters.getUser;
  if (!currentUser.value) {
    console.log('in da if')
    // router.push({ name: 'signin' })
  }
})
</script>

<template>
  <component :is="curCompo"></component>

  <!-- <Company/>
  <Departments /> -->

  <v-card>
    <v-layout>
      <!-- expand-on-hover rail -->
      <v-navigation-drawer permanent location="left">
        <template v-slot:prepend>
          <v-list-item v-if="currentUser" lines="two" :prepend-avatar="'https://robohash.org/Maurine.png?set=set4'"
            :title="currentUser.username.toUpperCase()"
            :subtitle="currentUser ? 'Signed In' : 'Signed Out'"></v-list-item>
        </template>

        <v-divider></v-divider>
        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item @click="curCompo = Company" prepend-icon="mdi-home-city" title="Companies" value="companies"></v-list-item>
          <v-list-item @click="curCompo = Departments" prepend-icon="mdi-home-city" title="Departments" value="departments"></v-list-item>
          <v-list-item v-if="currentUser" @click="signout" prepend-icon="mdi-account" title="Sign Out" value="signout"></v-list-item>
          <v-list-item v-else @click="router.push({name: 'signin'})" prepend-icon="mdi-account" title="Sign In" value="signin"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 10%"></v-main>
    </v-layout>
  </v-card>
</template>

<style scoped></style>
