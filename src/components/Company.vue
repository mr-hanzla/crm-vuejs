<script setup>
</script>

<template>
  <h1>Company Data</h1>
  <v-list lines="two" style="margin-left: 30%;">
    <v-list-item v-for="n in 3" :key="n" :title="'Item ' + n"
      subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"></v-list-item>
    <v-list-item>
      <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250"
        rounded max-width="900" width="100%">
        <div>
          <h2 class="text-h4 font-weight-black text-orange">Congratulations!</h2>

          <div class="text-h5 font-weight-medium mb-2">
            You are officially a part of the Vuetify Community!
          </div>

          <p class="text-body-2 mb-4">
            Please head over to your inbox/spam or others folder to find our verificaiton email.
          </p>

          <v-btn variant="text" color="orange">Go to Login</v-btn>
        </div>
      </v-sheet>
    </v-list-item>
  </v-list>
</template>
