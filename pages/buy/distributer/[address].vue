<template>
    <div class="flex flex-row pb-2 justify-center items-center">
        <h1 class="text-5xl">DPP Distributer Order Page</h1>
    </div>
    <div v-if="orderContents">
        <ClientOnly>

            <div>

                <div class="flex flex-row  justify-center items-center">
                    <h1 class="text-xl">Order for address: {{ route.params.address }}</h1>
                </div>
                <div class="flex flex-row  justify-center items-center ">
                    <div class="card justify-center w-fit bg-base-100 shadow-xl ">
                        <div class="card-body">
                            <h1 class="card-title py-2">Order #{Order Number}</h1>
                            <h2>POS Date Time: 00:00:00 1/1/2024 ADD TO PROCESS</h2>
                            <div>
                                <h2>Colour: </h2>
                                <div class="ml-10">
                                    <h2>{{ orderContents.colour }}</h2>
                                </div>
                            </div>
                            <div>
                                <h2>Type: </h2>
                                <div class="ml-10">
                                    <h2>{{ orderContents.model }}</h2>
                                </div>
                            </div>
                            <div>
                                <h2>Bike Cost: {{ orderContents.bikeCost }} wei </h2>

                            </div>
                            <!-- <div>
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
                                <h2>Total Cost : </h2>
                                <div class="ml-10">
                                    <h2>{{ orderContents.totalCost }}</h2>
                                </div>
                            </div> -->
                            <div>
                                <h2>Origin: </h2>
                                <div class="ml-10">
                                    <h2> Frame: France</h2>
                                    <h2> Wheels: France</h2>
                                </div>
                            </div>
                            <div>
                                <h1>Frame ID:</h1>
                                <UInput class="w-72" v-model="dppContents.frameID" name="q" placeholder="Search..."
                                    icon="i-heroicons-identification" autocomplete="off"
                                    :ui="{ icon: { trailing: { pointer: '' } } }">
                                    <template #trailing>
                                        <UButton v-show="dppContents.frameID !== ''" color="gray" variant="link"
                                            icon="i-heroicons-x-mark-20-solid" :padded="false"
                                            @click="dppContents.frameID = ''" />
                                    </template>
                                </UInput>
                            </div>
                            <div>
                                <h1>Front Wheel ID:</h1>
                                <UInput class="w-72" v-model="dppContents.frontWheelID" name="q" placeholder="Search..."
                                    icon="i-heroicons-identification" autocomplete="off"
                                    :ui="{ icon: { trailing: { pointer: '' } } }">
                                    <template #trailing>
                                        <UButton v-show="dppContents.frontWheelID !== ''" color="gray" variant="link"
                                            icon="i-heroicons-x-mark-20-solid" :padded="false"
                                            @click="dppContents.frameID = ''" />
                                    </template>
                                </UInput>
                            </div>
                            <div>
                                <h1>Back Wheel ID:</h1>
                                <UInput class="w-72" v-model="dppContents.backWheelID" name="q" placeholder="Search..."
                                    icon="i-heroicons-identification" autocomplete="off"
                                    :ui="{ icon: { trailing: { pointer: '' } } }">
                                    <template #trailing>
                                        <UButton v-show="dppContents.backWheelID !== ''" color="gray" variant="link"
                                            icon="i-heroicons-x-mark-20-solid" :padded="false"
                                            @click="dppContents.frameID = ''" />
                                    </template>
                                </UInput>
                            </div>
                            <div>
                                <h1>

                                </h1>
                                <div class="flex justify-center items-center">
                                    <UPopover :popper="{ placement: 'bottom-start' }">
                                        <UButton icon="i-heroicons-calendar-days-20-solid" :label="label" />

                                        <template #panel="{ close }">
                                            <LazyDatePicker v-model="endWarranty" @close="close" />
                                        </template>
                                    </UPopover>
                                </div>

                            </div>
                            <div>
                                <h2>Start of warranty: </h2>
                                <div class="ml-10">
                                    <h2>{{ todayDate }}</h2>
                                </div>
                            </div>
                            <div class="card-actions justify-center mt-2">
                                <button @click="acceptPurchase()" class="btn mr-5 text-xl btn-success "> Accept</button>
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
        </ClientOnly>
    </div>
    <div v-else>
        <div class="flex flex-row p-5 justify-center items-center">
            <h1 class="text-5xl text-red-500">No order on this account</h1>
        </div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute()

const { checkforPurchase, getOrderByUser, cancelPurchaseDistributer, approvePurchase } = useCryptoStore()
const endWarranty = ref(new Date())
const today = new Date();

const todayDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

const label = computed(() => endWarranty.value.toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' })
)
const orderContents = await getOrderByUser(route.params.address)
const dppContents = ref({
    frameID: '',
    frontWheelID: '',
    backWheelID: '',
})
console.log(orderContents)
// TODO: #3 Accept and decline Purchase
import { storeToRefs } from 'pinia'
const cryptoStore = useCryptoStore()
function acceptPurchase() {
    const dppToIPFS = {
        ...orderContents,
        ids: dppContents.value,
        warranty: {
            startWarranty: todayDate,
            endWarranty: label.value,
        },
        distributerAddress: "TO_BE_ADDED"
    }
    console.log(dppToIPFS)
    approvePurchase(route.params.address, dppToIPFS)

}
function declinePurchase() {
    cancelPurchaseDistributer(route.params.address)
}
</script>

<style scoped></style>