<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Company from '@/components/Company.vue';
import AddCompany from '@/components/AddCompany.vue';

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
  userStore.dispatch('signout');
}

onMounted(() => {
  // currentUser.value = localStorage.getItem('current-user');
  currentUser.value = userStore.getters.getUser;
  console.log('CurrenUser: ', currentUser.value)
  console.log('CurrenUser: ', currentUser)
  if (!currentUser.value) {
    console.log('in da if')
    // router.push({ name: 'signin' })
  }
})
</script>

<template>
  <!-- <component :is="curCompo"></component> -->

  <Company />

  <v-card>
    <v-layout>
      <!-- expand-on-hover rail -->
      <v-navigation-drawer permanent location="left">
        <template v-slot:prepend>
          <v-list-item v-if="currentUser" lines="two" :prepend-avatar="currentUser.image"
            :title="currentUser.firstName + ' ' + currentUser.lastName"
            :subtitle="currentUser ? 'Signed In' : 'Signed Out'"></v-list-item>
        </template>

        <v-divider></v-divider>
        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item @click="curCompo = Company" prepend-icon="mdi-home-city" title="Company Data" value="company"></v-list-item>
          <v-list-item @click="curCompo = AddCompany" prepend-icon="mdi-home-city" title="Add New Company" value="reg-company"></v-list-item>
          <v-list-item v-if="currentUser" @click="signout" prepend-icon="mdi-account" title="Sign Out" value="signout"></v-list-item>
          <v-list-item v-else @click="router.push({name: 'signin'})" prepend-icon="mdi-account" title="Sign In" value="signin"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 10%"></v-main>
    </v-layout>
  </v-card>
</template>

<style scoped></style>
