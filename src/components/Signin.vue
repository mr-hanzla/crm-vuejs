<script setup>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

const router = useRouter();
const userStore = useStore('UserStore');

const username = ref('');
const password = ref('');
const imageData = ref(null);

async function signInUser() {
  await captureImage();
  const formData = new FormData();
  formData.append('username', username.value);
  formData.append('password', password.value);
  if (imageData.value) {
    formData.append('user-image', imageData.value);
  }
  console.log('Form data to be submitted:', ...formData);


  // to authenticate using the localStorage
  const users = JSON.parse(localStorage.getItem('users'));
  if (users) {
    const currentUser = users.find(user => user.username === username.value && user.password === password.value);
    if (currentUser) {
      localStorage.setItem('current-user', JSON.stringify(currentUser))
      router.push({ name: 'home' });
    } else {
      console.log('Invalid Username Or Password!')
    }
  }

  // to authenticate using the API
  // const signinSuccess = await userStore.dispatch('signin', { username: username.value, password: password.value });
  // if (signinSuccess) {
  //   username.value = '';
  //   password.value = '';
  //   router.push({ name: 'home' });
  // }

  // console.log(username.value, password.value);
  // console.log('Form submitted with image data:', typeof imageData.value);
  // console.log('Form submitted with image data:', imageData.value);
}
// ==================================================

async function captureImage() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoTrack = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(videoTrack);
    const blob = await imageCapture.takePhoto();
    const imageUrl = URL.createObjectURL(blob);
    console.log(blob);
    imageData.value = blob;
    stream.getTracks().forEach(track => track.stop());
  } catch (error) {
    console.error('Error capturing image:', error);
  }
}

const hello = 'some error message';

const initialState = {
  username: '',
  email: '',
  password: '',
}

const state = reactive({
  ...initialState,
})

const rules = {
  username: { required },
  email: { required, email },
  select: { required },
  items: { required },
  checkbox: { required },
}

const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}

// to toggle visibility of password field
const visible = ref(false);

onMounted(() => {
  console.log(userStore.state.count);
})
</script>

<template>
  <div class="register-company-form">
    <v-img class="mx-auto my-6" max-width="500"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="15" max-width="800" rounded="lg">
      <v-form @submit.prevent="signInUser" width="3000">
        <v-text-field v-model="username" clearable label="Username" placeholder="johndoe"
          variant="outlined"></v-text-field>
        <v-text-field v-model="password" clearable type="password" label="Password" placeholder="abc123"
          variant="outlined"></v-text-field>

        <v-btn type="submit" class="mx-auto mb-8" size="large" color="black">Sign In</v-btn>
      </v-form>
      <!-- <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
          Add Company <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text> -->
    </v-card>
  </div>
</template>

<style scoped>
form {
  width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

label {
  color: #aaaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
}

input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}

.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eeee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}

button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}

.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
