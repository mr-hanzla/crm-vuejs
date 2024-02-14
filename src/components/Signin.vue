<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

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

  const signinSuccess = await userStore.dispatch('signin', { username: username.value, password: password.value });
  if (signinSuccess) {
    username.value = '';
    password.value = '';
    router.push({ name: 'home' });
  }

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

onMounted(() => {
  console.log(userStore.state.count);
})
</script>

<template>
  <v-sheet class="mx-auto">
    <v-img :width="300" aspect-ratio="16/9" cover v-if="imageData" :src="imageData"></v-img>
    <v-form @submit.prevent="signInUser">
      <v-text-field v-model="username" label="Username" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-btn type="submit" color="primary" class="me-2">Sign In</v-btn>

      <v-btn class="me-4" >Sign Up</v-btn>
      <v-btn @click="">clear</v-btn>
    </v-form>
    <v-text-field>Don't have an account? </v-text-field>
  </v-sheet>
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
