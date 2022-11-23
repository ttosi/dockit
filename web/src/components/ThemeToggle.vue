<template>
  <div>
    <label class="swap swap-rotate text-gray-400">
      <input type="checkbox" @click="toggleTheme" />
      <mdicon
        name="weather-sunny"
        size="20"
        class="swap-on fill-current text-orange-500" />
      <mdicon
        name="weather-night"
        size="20"
        class="swap-off fill-current text-orange-500" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const themeElement: any = ref()
const toggleTheme = () => {
  const theme =
    themeElement.value.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
  themeElement.value.setAttribute('data-theme', theme)
}

onMounted(() => {
  themeElement.value = document.getElementsByTagName('html')[0]
})
</script>

<style scoped></style>
