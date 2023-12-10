<template>
    <div class="flex flex-row p-5 justify-center items-center">
        <h1 class="text-5xl">DPP Order Page</h1>
    </div>
    <div class="flex flex-row p-5 justify-center items-center">
        <h1 class="text-xl">Order for address: {{ route.params.address }}</h1>
    </div>
    <div class="flex flex-row  justify-center items-center p-10">

        <div class="card justify-center w-fit bg-base-100 shadow-xl ">
            <div class="card-body">
                <h1 class="card-title py-2">Order #{Order Number}</h1>
                <h2>POS Date Time: 00:00:00 1/1/2024 </h2>
                <div>
                    <h2>Colour: </h2>
                    <div class="ml-10">
                        <h2>{Chosen Color}</h2>
                    </div>
                </div>
                <div>
                    <h2>Type: </h2>
                    <div class="ml-10">
                        <h2>{Chosen Type}</h2>
                    </div>
                </div>
                <h2>Made From: </h2>
                <div class="ml-10">
                    <h2>Origin: </h2>
                    <div class="ml-10">
                        <h2> Frame: France</h2>
                        <h2> Wheels: France</h2>
                    </div>
                    <h2>Deposit: </h2>
                    <div class="ml-10">
                        <h2> Frame: 100</h2>
                        <h2> Wheels: 50</h2>
                    </div>
                </div>
                <div class="mt-5">
                    <button @click="checkforPurchase()" class="btn mr-5 text-xl btn-success "> Accept</button>
                    <button @click="declinePurchase()" class="btn ml-5 text-xl btn-error ">
                        Decline</button>

                </div>
                <!-- <h2>{{ itemJson.description }}</h2>

                <h2 v-if="itemJson.size">Size: {{ itemJson.size }}</h2>
                <h2 v-if="itemJson.size_h">Size Height: {{ itemJson.size_h }}</h2>
                <h2 v-if="itemJson.size_w">Size Width: {{ itemJson.size_w }}</h2> -->
            </div>
            <!-- <figure><img src="/dummy.avif" alt="Shoes" /></figure> -->
        </div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute()
// TODO: #3 Accept and decline Purchase
import { storeToRefs } from 'pinia'
import { useCryptoStore } from '../stores/index'
const cryptoStore = useCryptoStore()
const { checkforPurchase, connectWallet } = useCryptoStore()
connectWallet()

function acceptPurchase() {

}
function declinePurchase() {

}
// When accessing /posts/1, route.params.id will be 1
console.log(route.params.address)
</script>

<style scoped></style>