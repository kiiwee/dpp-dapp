<template>
    <div class="flex flex-row p-5 justify-center items-center pb-24">
        <h1 class="text-5xl">Purchase a Bike Page</h1>
    </div>
    <div class=" items-center  justify-center flex-col flex  gap-2 ">
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Choose Your Model</span>
            </div>
            <select class="select select-bordered" v-model="selected_model.model">
                <option disabled selected>Model</option>
                <option v-for="model of models" :key="model">{{ model }}</option>

            </select>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Choose Your Colour</span>
            </div>
            <select class="select select-bordered" v-model="selected_model.colour">
                <option disabled selected>Color</option>
                <option v-for="colour of colours" :key="colour">{{ colour }}</option>

            </select>
        </label>
        <h2 class="p-2"> Bike Cost : 800</h2>
        <h2> Deposit Frame : 200</h2>
        <h2> Deposit Wheel Front : 100</h2>
        <h2> Deposit Wheel Back : 100</h2>
        <h1>Deposit Total: 400</h1>
        <h2 class="p-5"> Total: 1200$</h2>
        <button class="btn" @click="makePurchase()">
            Purchase
        </button>
    </div>
</template>

<script setup lang="ts">
const models = ['Retro', 'Sporty', 'City']
const colours = ['Red', 'Green', 'Blue', 'Brown']
const selected_model = ref({});
function printall() {
    console.log(selected_model.value)
}
const cryptoStore = useCryptoStore()
const { makePurchase, connectWallet } = useCryptoStore()

useSeoMeta({
    title: '[title]',
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
useHead({
    htmlAttrs: {
        lang: 'en'
    },
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon.png'
        }
    ]
})
</script>

<style scoped></style>