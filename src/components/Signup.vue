<script setup>
import { ref } from 'vue';
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

const username = ref('');
const password = ref('');

function signInUser() {
  console.log(username.value, password.value);
}

const initialState = {
  name: '',
  email: '',
  select: null,
  checkbox: null,
}

const state = reactive({
  ...initialState,
})

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
]

const rules = {
  name: { required },
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
</script>

<template>
  <v-sheet width="500" class="mx-auto">
    <form>
      <v-text-field v-model="state.name" :error-messages="v$.name.$errors.map(e => e.$message)" :counter="10" label="Name"
        required @input="v$.name.$touch" @blur="v$.name.$touch"></v-text-field>

      <v-text-field v-model="state.email" :error-messages="v$.email.$errors.map(e => e.$message)" label="E-mail" required
        @input="v$.email.$touch" @blur="v$.email.$touch"></v-text-field>

      <v-select v-model="state.select" :items="items" :error-messages="v$.select.$errors.map(e => e.$message)"
        label="Item" required @change="v$.select.$touch" @blur="v$.select.$touch"></v-select>

      <v-btn class="me-4" color="primary" @click="v$.$validate">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
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
