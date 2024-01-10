<template>
    <div class="pt-20">
        <div class="flex  flex-row p-5 justify-center items-center ">
            <h1 class="text-5xl">DPP Recycling Page </h1>
        </div>
        <div class="flex flex-row p-5 justify-center items-center ">

            <Scanner recycle-page="true" class=" w-96" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
const recycleForm = ref()
async function onSubmit() {
    // Do something with data
    console.log(date)
}
const date = ref(new Date())

const label = computed(() => date.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
)
</script>

<style scoped></style>