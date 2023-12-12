<template>
    <div>
        <div class="flex flex-row p-5 justify-center items-center pb-24">
            <h1 class="text-5xl">Purchase a Bike Page</h1>
        </div>
        <div v-if="!purchase">

            <ClientOnly>
                <div class=" items-center  justify-center flex-col flex  gap-2 ">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Choose Your Model</span>
                        </div>
                        <select class="select select-bordered" v-model="toIPFS.model">
                            <option disabled selected>Model</option>
                            <option v-for="model of models" :key="model">{{ model }}</option>

                        </select>
                    </label>
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Choose Your Colour</span>
                        </div>
                        <select class="select select-bordered" v-model="toIPFS.colour">
                            <option disabled selected>Color</option>
                            <option v-for="colour of colours" :key="colour">{{ colour }}</option>
                        </select>
                    </label>
                    <h2 class="p-2"> Bike Cost : {{ toIPFS.bikeCost }} wei</h2>
                    <h2> Deposit Frame : {{ toIPFS.depositFrame }} wei</h2>
                    <h2> Deposit Wheel Front : {{ toIPFS.depositFrontWheel }} wei</h2>
                    <h2> Deposit Wheel Back : {{ toIPFS.depositBackWheel }} wei</h2>
                    <h1>Deposit Total: {{ toIPFS.depositTotal }} wei</h1>
                    <h2 class="p-5"> Total: {{ toIPFS.totalCost }} wei</h2>
                    <button class="btn btn-lg btn-success" @click="pushToIPFS()">
                        Purchase
                    </button>
                </div>
            </ClientOnly>
        </div>
        <div v-else>
            <div class="flex flex-row justify-center items-center">
                <h1 class="text-5xl text-red-500">You have already made a purchase of a bike!</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { makePurchase, account, checkforPurchase } = useCryptoStore()
import { getAccount } from '@wagmi/core'
const loggedAccount = getAccount()
const purchase = await checkforPurchase(loggedAccount.address)
const models = ['Retro', 'Sporty', 'City']
const colours = ['Red', 'Green', 'Blue', 'Brown']
const selected_model = ref({});
const toIPFS = {
    bikeCost: 1000,
    depositFrame: 400,
    depositFrontWheel: 200,
    depositBackWheel: 200,
    depositTotal: 200,
    totalCost: 1800,
    colour: "",
    model: "",
    accountAddress: account,
}

function pushToIPFS() {
    if (toIPFS.colour == "" && toIPFS.model == "") {
        console.log("error")
        return
    }
    console.log(toIPFS)
    makePurchase(toIPFS)
}


console.log(account)
useSeoMeta({
    title: 'Bike Purchase',
    description: '[description]',
    ogTitle: '[og:title]',
    ogDescription: '[og:description]',
    ogImage: '[og:image]',
    ogUrl: '[og:url]',
    twitterTitle: '[twitter:title]',
    twitterDescription: '[twitter:description]',
    twitterImage: '[twitter:image]',
    twitterCard: 'summary'
})

</script>

<style scoped></style>