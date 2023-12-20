<template data-theme="light">
  <div>

    <NavBar class=" fixed backdrop-blur-xl  	" />
    <div class="pt-20">
      <NuxtPage />
    </div>
    <UNotifications />
    <UModal v-model="isOpen">
      <CommandPalette @to-page="isOpen = !isOpen"></CommandPalette>

    </UModal>

  </div>
</template>
<script setup>

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