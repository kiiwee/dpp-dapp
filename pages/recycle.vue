<template>
    <div>
        <div class="flex flex-row p-5 justify-center items-center">
            <h1 class="text-5xl">DPP Recycling Page</h1>
        </div>
        <div class="flex flex-row p-5 justify-center items-center ">
            <form>

                <div class="p-10">
                    <h2 class="text-2xl">Date of Recycling</h2>
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-calendar-days-20-solid" :label="label" />

                        <template #panel="{ close }">
                            <LazyDatePicker v-model="date" @close="close" />
                        </template>
                    </UPopover>
                </div>
                <div class="form-control w-full max-w-xs">
                    <h2>Frame recycled to:</h2>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                    <h2>Wheels recycled to:</h2>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                </div>
                <UButton class="m-4 " @click=onSubmit>
                    Submit
                </UButton>
            </form>

        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

async function onSubmit(event: FormSubmitEvent<any>) {
    // Do something with data
    console.log(event.data)
    console.log(date)
}
const date = ref(new Date())

const label = computed(() => date.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
)
</script>

<style scoped></style>