<template data-theme="light">
  <div>

    <NavBar class=" fixed backdrop-blur-xl  	" />
    <div class="">
      <NuxtPage />
    </div>
    <UNotifications />
    <UModal v-model="isOpen">
      <CommandPalette :user-address="userAddress" @to-page="isOpen = !isOpen"></CommandPalette>

    </UModal>

  </div>
  <footer
    class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024
      <NuxtLink to="/" class="hover:underline">DigitalProductPassports</NuxtLink>
      . All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
      <NuxtLink class="hover:underline me-4 md:me-6" to="/about">
        About The Project
      </NuxtLink>
      <NuxtLink class="hover:underline me-4 md:me-6" to="/aboutus">
        About Us
      </NuxtLink>

    </ul>
  </footer>
</template>
<script setup>
import { getAccount } from '@wagmi/core'

const account = getAccount()
const userAddress = account.address
const isOpen = ref(false)

defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      console.log(isOpen.value)
      isOpen.value = !isOpen.value
    }
  }
})

</script>