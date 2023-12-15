<template>
    <div class="flex flex-row p-5 justify-center items-center">
        <h1 class="text-5xl">DPP Order Page</h1>
    </div>
    <ClientOnly>

        <div v-if="orderContents">


            <div class="flex flex-row  justify-center items-center ">
                <div class="card justify-center  bg-base-100 shadow-xl w-96 ">
                    <div class="card-body">
                        <h1 class="card-title py-2 truncate">Order for {{ route.params.address }}</h1>
                        <h2>POS Date Time: {{ orderContents.datetimePOS.datePOS }} {{ orderContents.datetimePOS.timePOS }}
                        </h2>
                        <div>
                            <h2>Colour: {{ orderContents.colour }}</h2>

                        </div>
                        <div>
                            <h2>Type: {{ orderContents.model }}</h2>

                        </div>
                        <div>
                            <h2>Bike Cost: {{ orderContents.bikeCost }} wei </h2>

                        </div>
                        <div>
                            <h2>Deposit Break Down: </h2>
                            <div class="ml-10 mb-2">
                                <h2>Frame: {{ orderContents.depositFrame }}</h2>
                            </div>
                            <div class="ml-10 mb-2">
                                <h2>Front Wheel: {{ orderContents.depositFrontWheel }}</h2>
                            </div>
                            <div class="ml-10 mb-2">
                                <h2>Back Wheel: {{ orderContents.depositBackWheel }}</h2>
                            </div>
                        </div>
                        <div>
                            <h2>Total Cost: {{ orderContents.totalCost }}</h2>

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
                        <div class="card-actions justify-center mt-10">
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


        </div>
        <div v-else>
            <div class="flex flex-col p-5 justify-center items-center">
                <h1 class="text-5xl text-red-500">No order on this account</h1>

                <NuxtLink class="btn btn-lg ml-5 text-xl btn-primary mt-24 " to="/buy/user/">Buy A Bike</NuxtLink>

            </div>

        </div>
    </ClientOnly>
</template>
<script setup lang="ts">
const route = useRoute()

const { checkforPurchase, getOrderByUser, cancelPurchaseUser } = useCryptoStore()

const orderContents = await getOrderByUser(route.params.address)

// TODO: #3 Accept and decline Purchase
import { storeToRefs } from 'pinia'
const cryptoStore = useCryptoStore()
function acceptPurchase() {

}
function declinePurchase() {
    cancelPurchaseUser()
}

</script>

<style scoped></style>