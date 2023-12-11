<template>
    <div>
        <div class="flex flex-row p-5 justify-center items-center">
            <h1 class="text-5xl">Purchase Page</h1>
        </div>
        <div class=" items-center  justify-center flex-col flex  gap-3  ">

            <button class="btn" disabled="disabled">Disabled using attribute

            </button>

            <NuxtLink class="btn btn-secondary btn-lg" to="/buy/distributer">
                Distributer Page
            </NuxtLink>
            <NuxtLink class=" btn btn-primary btn-lg" to="/buy/user">
                User Page
            </NuxtLink>


        </div>


    </div>
</template>

<script setup lang="ts">

const { getOrderByUser } = useCryptoStore()
import { getAccount } from '@wagmi/core'
const { orderUser } = storeToRefs(useCryptoStore())

console.log(getAccount())
const account = getAccount()
getOrderByUser(account.address)

const colorMode = useColorMode();

</script>

<style scoped></style>