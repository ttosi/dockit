<template>
  <div class="grid h-screen place-items-center">
    <div class="card card-side bg-base-100 shadow-xl border border-base-300">
      <figure>
        <img class="object-fill w-72" src="@/assets/images/lightbulb.jpg" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-orange-500">Dockit Login</h2>
        Email
        <input
          v-model="email"
          type="text"
          placeholder=""
          class="input w-full border border-slate-400" />
        Password
        <input
          v-model="password"
          type="password"
          placeholder=""
          class="input w-full border border-slate-400" />
        <div class="card-actions justify-end">
          <button
            class="btn btn-sm btn-primary bg-orange-500 border-none mt-3"
            @click="login">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { email } = storeToRefs(authStore)
const password = ref('')

const login = async () => {
  if (!(await authStore.login(password.value))) {
    alert('Unable to login')
    return
  }
}

email.value = 'ttosi519@gmail.com'
</script>

<style scoped></style>
