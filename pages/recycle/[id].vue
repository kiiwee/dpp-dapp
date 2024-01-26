<template>
    <div class="pt-20">
        <div class="flex flex-row p-5 justify-center items-center">
            <h1 class="text-5xl">Bike Recycling Number #{{ route.params.id }}</h1>
        </div>
        <ClientOnly>
            <div class="flex flex-col p-5 justify-center items-center ">
                <form>


                    <div class="form-control w-full max-w-xs">
                        <div>
                            <h1>User Address</h1>
                            <UInput class="w-72" v-model="userAddress" name="q" placeholder="Search..."
                                icon="i-heroicons-identification" autocomplete="off"
                                :ui="{ icon: { trailing: { pointer: '' } } }">
                                <template #trailing>
                                    <UButton v-show="userAddress !== ''" color="gray" variant="link"
                                        icon="i-heroicons-x-mark-20-solid" :padded="false" @click="userAddress = ''" />
                                </template>
                            </UInput>
                        </div>



                    </div>


                </form>
                <div class=" flex flex-row p-5 justify-center items-center">
                    <button class="m-4 btn btn-lg hover:btn-error  " @click='Recycle(route.params.id)'>
                        Approve for Recycle
                    </button>
                </div>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
const userAddress = ref("")
const { getNFTsByContract, getNFTwithID, Recycle } = useCryptoStore()
const route = useRoute()

async function onSubmit() {
    // Do something with data
    console.log(date)
    console.log(recycleForm.value)
}
const date = ref(new Date())

const label = computed(() => date.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
)
</script>

<style scoped></style>