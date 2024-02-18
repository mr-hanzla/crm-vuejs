<script setup>
import { ref } from 'vue';

const companyName = ref('');
const companyUrl = ref('');
const companyLogoUrl = ref('');
const companyDescription = ref('');

function addCompany() {
  const companyData = {
    name: companyName.value,
    url: companyUrl.value,
    logoUrl: companyLogoUrl.value,
    description: companyDescription.value,
  }

  let companyList = JSON.parse(localStorage.getItem('companyList'));
  if (!companyList) {
    companyList = []
  }
  companyList.push(companyData);

  localStorage.setItem('companyList', JSON.stringify(companyList));
  console.log('Company is added!');
  resetValues();
}

function resetValues() {
  companyName.value = '';
  companyUrl.value = '';
  companyLogoUrl.value = '';
  companyDescription.value = '';
}
</script>

<template>
  <div class="register-company-form">
    <!-- <v-img class="mx-auto my-6" max-width="500"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->

    <v-card class="mx-auto pa-12 pb-8" elevation="15" max-width="800" rounded="lg">
      <v-text-field v-model="companyName" clearable label="Company Name" placeholder="Sample Name"
        variant="outlined"></v-text-field>
      <v-text-field v-model="companyUrl" clearable label="Website URL" placeholder="https//www.sample.com"
        variant="outlined"></v-text-field>
      <v-text-field v-model="companyLogoUrl" clearable label="Logo URL" placeholder="https//www.sample.com/logo.jpg"
        variant="outlined"></v-text-field>

      <v-textarea v-model="companyDescription" label="Description" placeholder="Tell about the company"
        variant="outlined"></v-textarea>

      <v-btn @click="addCompany" class="mx-auto mb-8" size="large" color="black">Add Company</v-btn>
      <!-- <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
          Add Company <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text> -->
    </v-card>
  </div>
</template>

<style scoped>
/* .register-comapny-form {
  border: 4px solid red;
  margin-bottom: 50%;
} */
</style>
