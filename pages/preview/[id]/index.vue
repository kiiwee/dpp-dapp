<template>
    <div class="flex flex-row p-5 justify-center items-center pt-20">
        <h1 class="text-5xl">DPP Preview Page</h1>
    </div>
    <ClientOnly>
        <div v-if="NFT.raw">
            <div class="flex flex-row  justify-center items-center p-10">

                <div class="card justify-center  bg-base-100 shadow-xl ">
                    <div class="card-body">
                        <h1 class="card-title py-2">Digital Product Passport</h1>
                        <h2 v-if="NFT.raw.metadata.datetimePOS">POS Date Time:{{ NFT.raw.metadata.datetimePOS.timePOS }} {{
                            NFT.raw.metadata.datetimePOS.datePOS
                        }}</h2>
                        <h1>Description: {{ NFT.raw.metadata.description }}</h1>
                        <h1>Distributer address: <div class="ml-10">
                                {{ NFT.raw.metadata.distributor }}
                            </div>
                        </h1>
                        <h1>Colour: {{ NFT.raw.metadata.colour }}</h1>
                        <h1>Model: {{ NFT.raw.metadata.model }}</h1>
                        <h2>Origin: </h2>
                        <div class="ml-10">
                            <h2> Frame: France</h2>
                            <h2> Wheels: France</h2>
                        </div>

                        <h2>Deposit: </h2>
                        <div class="ml-10">
                            <h2> Frame: {{ NFT?.raw.metadata.deposit.depositBackWheel }}</h2>
                            <h2> Wheels: {{ NFT?.raw.metadata.deposit.depositFrame }}</h2>
                            <h2> Total: {{ NFT.raw.metadata.deposit.depositTotal }}</h2>
                        </div>
                        <h1>IDs of Parts: </h1>
                        <div class="ml-10">
                            <h2> Frame: {{ NFT.raw.metadata.ids.frameID }}</h2>
                            <h2> Back Wheel: {{ NFT.raw.metadata.ids.backWheelID }}</h2>
                            <h2> Front Wheel: {{ NFT.raw.metadata.ids.frontWheelID }}</h2>
                        </div>
                        <h2> Warranty</h2>
                        <div class="ml-10">
                            <h2>Until: {{ NFT.raw.metadata.warranty.endWarranty }}</h2>
                            <div v-if="NFT.raw.metadata.warranty.used">
                                <h2>Used at: </h2>
                                <div class="ml-10">
                                    Date: 1/6/2205
                                    <div class="ml-10"> Changed: Front wheel</div>
                                </div>
                            </div>
                        </div>
                        <div class="card-actions justify-center mt-10">
                            <button @click="markForRecycle(NFT.tokenId)" class="btn ml-5 text-xl btn-error ">
                                Mark For Recycling</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </ClientOnly>
</template>
<script setup lang="ts">
const { getNFTsByContract, getNFTwithID, markForRecycle } = useCryptoStore()
const route = useRoute()
const NFT = ref()
NFT.value = await getNFTwithID(route.params.id)
console.log(NFT.value)

// NFT.value = NFT.value.raw.metadata
// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
</script>

<style scoped></style>