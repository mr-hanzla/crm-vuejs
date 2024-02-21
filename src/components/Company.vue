<script setup>
import { ref, reactive, onMounted } from 'vue';
import AddCompany from './AddCompany.vue';
import { compileScript } from 'vue/compiler-sfc';

const companyList = ref(JSON.parse(localStorage.getItem('company-list')));
const dialog = ref(false);
const curUser = ref(null);

function addSampleData() {
  const tempList = [
    {
      id: 1,
      name: 'Programmers Force',
      url: 'https://www.pf.com',
      logoUrl: 'https://www.pf.com/logo.png',
      description: 'Located in the business hub of Lahore, providing IT services across the globe.',
      departments: ['Admin', 'Sales'],
    },
    {
      id: 2,
      name: 'Tanbits',
      url: 'https://www.tanbits.com',
      logoUrl: 'https://www.tanbits.com/logo.png',
      description: 'Another IT service providing company, located in Johar Town.',
      departments: ['Admin', 'Sales'],
    },
    {
      id: 3,
      name: 'Nisum',
      url: 'https://www.nisum.com',
      logoUrl: 'https://www.nisum.com/logo.png',
      description: 'Very ambigious company, with no explaination of what exactly they do.',
      departments: ['Admin', 'Sales'],
    },
    {
      id: 4,
      name: 'NextBridge',
      url: 'https://www.nextbridge.com',
      logoUrl: 'https://www.nextbridge.com/logo.png',
      description: 'Spreading in Lahore, and providing good IT services, apparently!',
      departments: ['Admin', 'Marketing'],
    },
    {
      id: 5,
      name: 'ArhamSoft',
      url: 'https://www.arhamsoft.com',
      logoUrl: 'https://www.arhamsoft.com/logo.png',
      description: 'Having a red colored theme building, providing IT services around the globe.',
      departments: ['Admin', 'Sales', 'HR'],
    },
    {
      id: 6,
      name: 'Netsol',
      url: 'https://www.netsol.com',
      logoUrl: 'https://www.netsol.com/logo.png',
      description: 'Pakistan\'s first IT company to provide IPOs.',
      departments: ['Admin', 'Sales', 'HR'],
    },
  ]

  localStorage.setItem('company-list', JSON.stringify(tempList));
  console.log('Sample Company Data is added!');
}

const availableDepartments = reactive([]);

const temp = JSON.parse(localStorage.getItem('departments'));

function setDepartments() {
  const tempDeps = JSON.parse(localStorage.getItem('departments'))
  if (tempDeps) {
    availableDepartments.push(...tempDeps.map(dep => dep.name));
    console.log('Deps: ', availableDepartments)
    console.log('b', tempDeps);
  }
}


const company = reactive({
  id: null,
  name: 'Testing',
  url: 'https://www.testing.com',
  logoUrl: 'testing.com/logo.png',
  description: 'This is a sample description',
  departments: ['Admin', 'HR'],
})

let selectedCompany = null;

function setCompanyValues(id, name, url, logoUrl, description, departments) {
  company.id = id
  company.name = name;
  company.url = url;
  company.logoUrl = logoUrl;
  company.description = description;
  company.departments = departments;
}

function resetValues() {
  selectedCompany = null;
  setCompanyValues(null, '', '', '', '', []);
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
  // return; // uncomment to stop execution of the below code
  // if there is a company to edit
  if (company.id) {
    if (isCompanyDataValid()) {
      updateCompanyList();

      companyList.value.forEach(comp => {
        if (comp.id === company.id) {
          comp.name = company.name;
          comp.url = company.url;
          comp.logoUrl = company.logoUrl;
          comp.description = company.description;
          comp.departments = company.departments;
        }
      })

      localStorage.setItem('company-list', JSON.stringify(companyList.value));
      updateCompanyList();
      resetValues();
      dialog.value = false;
    } else {
      console.log('Invalid Company Data Values!')
    }
  }
  else {
    const maxId = JSON.parse(localStorage.getItem('max-id'));
    company.id = maxId ? maxId + 1 : 1;
    if (isCompanyDataValid()) {
      let companyList = JSON.parse(localStorage.getItem('company-list'));
      if (!companyList) {
        companyList = []
      }
      companyList.push(company);
      localStorage.setItem('company-list', JSON.stringify(companyList));
      localStorage.setItem('max-id', company.id);

      updateCurrentUser();
      if (curUser.value) {
        curUser.value.companies.push(company.id);
        console.log('curUser: ', curUser.value);
        localStorage.setItem('current-user', JSON.stringify(curUser.value));
      }
      console.log('Company is added!');
      updateCompanyList();
      resetValues();
      dialog.value = false;
    } else {
      console.log('Invalid Company Data Values!')
    }
  }
}

function editCompany(tempCompany) {
  selectedCompany = { ...tempCompany }
  setCompanyValues(tempCompany.id, tempCompany.name, tempCompany.url, tempCompany.logoUrl, tempCompany.description, tempCompany.departments);
  // console.log('company: ', company);
  dialog.value = true;
}

function deleteCompany(company) {
  companyList.value = companyList.value.filter(_company => _company !== company);
  localStorage.setItem('company-list', JSON.stringify(companyList.value));
}

function openModal() {
  resetValues();
  dialog.value = true;
}

function updateCurrentUser() {
  curUser.value = JSON.parse(localStorage.getItem('current-user'));
}

function updateCompanyList() {
  const companies = JSON.parse(localStorage.getItem('company-list'));
  curUser.value ? null : updateCurrentUser();
  if (curUser.value) {
    if (curUser.value.role === 'superuser') {
      companyList.value = companies;
    } else {
      companyList.value = companies.filter(company => curUser.value.companies.includes(company.id))
    }
  }
  // companyList.value = []
}

onMounted(() => {
  // addSampleData();
  setDepartments();
  updateCompanyList();
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
          <!-- <th class="text-left"><b>Logo URL</b></th> -->
          <th class="text-left"><b>Description</b></th>
          <th class="text-left"><b>Departments</b></th>
          <th class="text-center" colspan="3"><b>Action</b></th>
          <!-- <th class="text-left"><b>Action</b></th>
          <th class="text-left"><b>Action</b></th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companyList" :key="company.name">
          <td>{{ company.name }}</td>
          <td><a target="_blank" :href="company.url">{{ company.url }}</a></td>
          <!-- <td>{{ company.logoUrl }}</td> -->
          <td>{{ company.description }}</td>
          <td>{{ company.departments.join(', ') }}</td>
          <td><v-btn @click="editCompany(company)" color="primary">Edit</v-btn></td>
          <td><v-btn @click="deleteCompany(company)" color="error">Delete</v-btn></td>
        </tr>
      </tbody>
    </v-data-table>
  </div>

  <!-- Add New Company - Modal -->
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

        <v-select v-model="company.departments" label="Select Department(s)" :items="availableDepartments" multiple
          variant="outlined"></v-select>

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
