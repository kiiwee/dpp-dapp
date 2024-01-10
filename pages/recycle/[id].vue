<template>
    <div class="pt-20">
        <div class="flex flex-row p-5 justify-center items-center">
            <h1 class="text-5xl">Bike Recycling Page</h1>
        </div>
        <ClientOnly>
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
                        <div>
                            <h1>Front Wheel ID:</h1>
                            <UInput class="w-72" v-model="recycleForm" name="q" placeholder="Search..."
                                icon="i-heroicons-identification" autocomplete="off"
                                :ui="{ icon: { trailing: { pointer: '' } } }">
                                <template #trailing>
                                    <UButton v-show="recycleForm !== ''" color="gray" variant="link"
                                        icon="i-heroicons-x-mark-20-solid" :padded="false" @click="recycleForm = ''" />
                                </template>
                            </UInput>
                        </div>
                        <div>
                            <h1>Back Wheel ID:</h1>
                            <UInput class="w-72" v-model="recycleForm" name="q" placeholder="Search..."
                                icon="i-heroicons-identification" autocomplete="off"
                                :ui="{ icon: { trailing: { pointer: '' } } }">
                                <template #trailing>
                                    <UButton v-show="recycleForm !== ''" color="gray" variant="link"
                                        icon="i-heroicons-x-mark-20-solid" :padded="false" @click="recycleForm = ''" />
                                </template>
                            </UInput>
                        </div>
                        <div>
                            <h1>Frame Wheel ID:</h1>
                            <UInput class="w-72" v-model="recycleForm" name="q" placeholder="Search..."
                                icon="i-heroicons-identification" autocomplete="off"
                                :ui="{ icon: { trailing: { pointer: '' } } }">
                                <template #trailing>
                                    <UButton v-show="recycleForm !== ''" color="gray" variant="link"
                                        icon="i-heroicons-x-mark-20-solid" :padded="false" @click="recycleForm = ''" />
                                </template>
                            </UInput>
                        </div>


                    </div>
                    <div class=" flex flex-row p-5 justify-center items-center">
                        <button class="m-4 btn btn-lg hover:btn-success  " @click='onSubmit'>
                            Approve for Recycle
                        </button>
                    </div>

                </form>

            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
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