<script setup>
import { ref, reactive, onMounted } from 'vue';

const companyList = ref(JSON.parse(localStorage.getItem('companyList')));

const dialog = ref(false);
// const headers = [
//   { title: 'Name', value: 'name' },
//   { title: 'Url', value: 'url' },
//   { title: 'Logo Url', value: 'logoUrl' },
//   { title: 'Description', value: 'description' },
//   {
//     title: 'Actions',
//     align: 'center',
//     children: [
//       // { title: 'Edit', value: 'eidt' },
//       // { title: 'Delete', value: 'Delete' },
//     ],
//   },
// ]

const company = reactive({
  name: 'Some sample name!',
  url: 'googoo.com',
  logoUrl: 'hotlo.com/logo.png',
  description: 'This is some same description'
})

function resetValues() {
  company.name = '';
  company.url = '';
  company.logoUrl = '';
  company.description = '';
}

function isCompanyDataValid() {
  for (const key in company) {
    if (!company[key])
      return false;
  }
  return true;
}

function addCompany() {
  console.log(company);
  if (isCompanyDataValid()) {
    let companyList = JSON.parse(localStorage.getItem('companyList'));
    if (!companyList) {
      companyList = []
    }
    companyList.push(company);

    localStorage.setItem('companyList', JSON.stringify(companyList));
    console.log('Company is added!');
    resetValues();
  } else {
    console.log('Invalid Company Data Values!')
  }
}

function editCompany(company) {
  console.log(company);
}

function deleteCompany(company) {
  console.log(company);
}

onMounted(() => {
  companyList.value = JSON.parse(localStorage.getItem('companyList'));
})
</script>

<template>
  <div id="inspire" style="margin-left: 20%;">
    <v-data-table :items="companyList" item-key="name" fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left"><b>Name</b></th>
          <th class="text-left"><b>URL</b></th>
          <th class="text-left"><b>Logo URL</b></th>
          <th class="text-left"><b>Description</b></th>
          <th class="text-center" colspan="3"><b>Action</b></th>
          <!-- <th class="text-left"><b>Action</b></th>
          <th class="text-left"><b>Action</b></th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companyList" :key="company.name">
          <td>{{ company.name }}</td>
          <td>{{ company.url }}</td>
          <td>{{ company.logoUrl }}</td>
          <td>{{ company.description }}</td>
          <td><v-btn @click="editCompany(company)" color="primary">Edit</v-btn></td>
          <td><v-btn @click="deleteCompany(company)" color="error">Delete</v-btn></td>
          <td><v-btn @click="dialog = true" color="info">Modal</v-btn></td>
        </tr>
      </tbody>
    </v-data-table>
  </div>

  <div class="text-center">
    <v-dialog v-model="dialog" width="800">
      <v-card class=" pa-12 pb-8" elevation="15" max-width="1800" rounded="lg">
        <v-text-field v-model="company.name" clearable label="Company Name" placeholder="Sample Name"
          variant="outlined"></v-text-field>
        <v-text-field v-model="company.url" clearable label="Website URL" placeholder="https//www.sample.com"
          variant="outlined"></v-text-field>
        <v-text-field v-model="company.logoUrl" clearable label="Logo URL" placeholder="https//www.sample.com/logo.jpg"
          variant="outlined"></v-text-field>

        <v-textarea v-model="company.description" clearable label="Description" placeholder="Tell about the company"
          variant="outlined"></v-textarea>

        <v-btn @click="addCompany" class="mx-auto mb-8" size="large" color="black">Add Company</v-btn>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
#inspire table.v-table thead th {
  font-size: 50px !important;
  font-weight: 800;
}
</style>
