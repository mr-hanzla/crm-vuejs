<script setup>
import { ref, reactive, onMounted } from 'vue';
import AddCompany from './AddCompany.vue';

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

function addSampleData() {
  const tempList = [
    {
      id: 1,
      name: 'Programmers Force',
      url: 'https://www.pf.com',
      logoUrl: 'https://www.pf.com/logo.png',
      description: 'Located in the business hub of Lahore, providing IT services across the globe.'
    },
    {
      id: 2,
      name: 'Tanbits',
      url: 'https://www.tanbits.com',
      logoUrl: 'https://www.tanbits.com/logo.png',
      description: 'Another IT service providing company, located in Johar Town.'
    },
    {
      id: 3,
      name: 'Nisum',
      url: 'https://www.nisum.com',
      logoUrl: 'https://www.nisum.com/logo.png',
      description: 'Very ambigious company, with no explaination of what exactly they do.'
    },
    {
      id: 4,
      name: 'NextBridge',
      url: 'https://www.nextbridge.com',
      logoUrl: 'https://www.nextbridge.com/logo.png',
      description: 'Spreading like a virus, with everyone wondering \'HOW THE HELL ARE THEY GETTING PROJECTS?\', they are providing good IT services, apparently!'
    },
  ]

  localStorage.setItem('company-list', JSON.stringify(tempList));
  console.log('Sample Company Data is added!');
}

const company = reactive({
  id: null,
  name: 'Some sample name!',
  url: 'googoo.com',
  logoUrl: 'hotlo.com/logo.png',
  description: 'This is some same description'
})

function setCompanyValues(name, url, logoUrl, description) {
  company.name = name;
  company.url = url;
  company.logoUrl = logoUrl;
  company.description = description;
}

function resetValues() {
  setCompanyValues('', '', '', '');
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
  const maxId = JSON.parse(localStorage.getItem('max-id'));
  company.id = maxId ? maxId + 1 : 1;
  if (isCompanyDataValid()) {
    let companyList = JSON.parse(localStorage.getItem('companyList'));
    if (!companyList) {
      companyList = []
    }
    companyList.push(company);

    localStorage.setItem('companyList', JSON.stringify(companyList));
    localStorage.setItem('max-id', company.id);
    console.log('Company is added!');
    resetValues();
  } else {
    console.log('Invalid Company Data Values!')
  }
}

function editCompany(tempCompany) {
  setCompanyValues(tempCompany.name, tempCompany.url, tempCompany.logoUrl, tempCompany.description);
  console.log(tempCompany);
  dialog.value = true;

  const tempList = JSON.parse(localStorage.getItem('companyList'));
}

function deleteCompany(company) {
  companyList.value = companyList.value.filter(_company => _company !== company);
  localStorage.setItem('companyList', JSON.stringify(companyList.value));
}

function openModal() {
  resetValues();
  dialog.value = true;
}

onMounted(() => {
  companyList.value = JSON.parse(localStorage.getItem('companyList'));
})
</script>

<template>
  <div id="inspire" style="margin-left: 20%;">
    <v-btn @click="openModal" color="info" style="margin-bottom: 10px; margin-top: 10px;">Add A Company</v-btn>
    <v-data-table :items="companyList" item-key="name" fixed-header height="600px">
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
        </tr>
      </tbody>
    </v-data-table>
  </div>

  <div class="text-center">
    <v-dialog v-model="dialog" width="800">
      <!-- Having a component as a modal is one of the way to do it -->
      <!-- <AddCompany /> -->
      <v-card class="pa-12 pb-8" elevation="15" max-width="1800" rounded="lg">
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
          <v-btn color="primary" block @click="dialog = false">Close</v-btn>
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
