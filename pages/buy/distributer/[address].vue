<template>
    <div class="flex flex-row pb-2 justify-center items-center">
        <h1 class="text-5xl">DPP Distributer Order Page</h1>
    </div>
    <div v-if="orderContents">
        <ClientOnly>

            <div>


                <div class="flex flex-row  justify-center items-center ">
                    <div class="card justify-center w-96 bg-base-100 shadow-xl ">
                        <div class="card-body">
                            <h1 class="card-title py-2 truncate">Order for {{ route.params.address }}</h1>
                            <h2>POS Date Time: {{ orderContents.datetimePOS.datePOS }} {{ orderContents.datetimePOS.timePOS
                            }} </h2>
                            <div>
                                <h2>Colour: {{ orderContents.colour }}</h2>

                            </div>
                            <div>
                                <h2>Type: {{ orderContents.model }}</h2>

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
                                <h2>Start of warranty: {{ todayDate }}</h2>
                                <div class="ml-10">
                                    <h2></h2>
                                </div>
                            </div>
                            <div>
                                <h1 class="flex flex-row">
                                    End of Warranty:
                                    <div class=" pl-4">
                                        <UPopover :popper="{ placement: 'bottom' }">
                                            <UButton icon="i-heroicons-calendar-days-20-solid" :label="label" />

                                            <template #panel="{ close }">
                                                <LazyDatePicker v-model="endWarranty" @close="close" />
                                            </template>
                                        </UPopover>
                                    </div>
                                </h1>


                            </div>

                            <div class="card-actions justify-center mt-2">
                                <button :disabled="loaderShow" v-if="acceptShow" @click="acceptPurchase()"
                                    class="btn mr-5 text-xl btn-success "> <span v-if="loaderShow"
                                        class="loading loading-spinner"></span>
                                    Accept</button>
                                <button :disabled="loaderShow" v-if="declineShow" @click="declinePurchase()"
                                    class="btn ml-5 text-xl btn-error ">
                                    <span v-if="loaderShow" class="loading loading-spinner"></span>
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
            <div v-if="loaderShow" class="flex flex-row items-center justify-center  ">
                <div class="w-96 pt-5">
                    <UProgress :value="loaderPurchase" :max="steps" indicator>
                        <template #step-0="{ step }">
                            <span class="text-amber-500">
                                <UIcon name="i-heroicons-arrow-up-on-square-stack" /> {{ step }}
                            </span>
                        </template>

                        <template #step-1="{ step }">
                            <span class="text-amber-500">
                                <UIcon name="i-heroicons-arrow-path" /> {{ step }}
                            </span>
                        </template>
                        <template #step-2="{ step }">
                            <span class="text-amber-500">
                                <UIcon name="i-heroicons-cursor-arrow-rays" /> {{ step }}
                            </span>
                        </template>
                        <template #step-3="{ step }">
                            <span class="text-amber-500">
                                <UIcon name="i-heroicons-arrow-path" /> {{ step }}
                            </span>
                        </template>
                        <template #step-4="{ step }">
                            <span class="text-green-500">
                                <UIcon name="i-heroicons-hand-thumb-up" /> {{ step }}
                            </span>
                        </template>
                    </UProgress>
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
const toast = useToast()

const todayDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

const label = computed(() => endWarranty.value.toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' })
)
const orderContents = await getOrderByUser(route.params.address)
const dppContents = ref({
    frameID: "",
    frontWheelID: "",
    backWheelID: "",
})
const declineShow = ref(true)
const acceptShow = ref(true)
const loaderShow = ref(false)
const { loaderPurchase } = storeToRefs(useCryptoStore())
const steps = ref()
const stepsApprove = [
    'Uploading to IPFS...',
    'Awaiting Approval...',
    'Awaiting transaction to be mined...',
    'Transaction mined!',
]
const stepsDecline = [
    'Awaiting Approval...',
    'Awaiting transaction to be mined...',
    'Transaction mined!',
]
console.log(orderContents)
// TODO: #3 Accept and decline Purchase

async function acceptPurchase() {

    if (dppContents.value.frameID == "" || dppContents.value.frontWheelID == "" || dppContents.value.backWheelID == "") {
        toast.add({
            id: 'update_downloaded',
            title: 'Please fill in the IDs',
            icon: "i-heroicons-x-circle",
            timeout: 5000,
            color: "red"

        })
        console.log("error")
        return
    }
    steps.value = stepsApprove
    loaderShow.value = !loaderShow.value
    declineShow.value = !declineShow.value
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
    const transactionData = await approvePurchase(route.params.address, dppToIPFS)
    if (transactionData) {
        const link = "https://sepolia.etherscan.io/tx/" + transactionData?.transactionHash
        toast.add({
            id: 'update_downloaded',
            title: 'Transaction Mined Succesfully',
            description: 'Click to view transaction in explorer',
            icon: "i-heroicons-check-circle",
            timeout: 5000,
            click: () => {
                navigateTo(link, {
                    external: true,
                    open: {
                        target: "_blank",
                    },
                });
            }
        })
    }
    else {
        toast.add({
            id: 'update_downloaded',
            title: 'Transaction Failed',
            icon: "i-heroicons-x-circle",
            timeout: 5000,
            color: "red"

        })
    }
    await setTimeout(() => { console.log("Approve Purchase Complete") }, 10000); // 3 sec
    declineShow.value = !declineShow.value
    loaderShow.value = !loaderShow.value


}
async function declinePurchase() {
    steps.value = stepsDecline

    loaderShow.value = !loaderShow.value
    acceptShow.value = !acceptShow.value

    const transactionData = await cancelPurchaseDistributer(route.params.address)
    if (transactionData) {
        const link = "https://sepolia.etherscan.io/tx/" + transactionData?.transactionHash
        toast.add({
            id: 'update_downloaded',
            title: 'Transaction Mined Succesfully',
            description: 'Click to view transaction in explorer',
            icon: "i-heroicons-check-circle",
            timeout: 5000,
            click: () => {
                navigateTo(link, {
                    external: true,
                    open: {
                        target: "_blank",
                    },
                });
            }
        })
    }
    else {
        toast.add({
            id: 'update_downloaded',
            title: 'Transaction Failed',
            icon: "i-heroicons-x-circle",
            timeout: 5000,
            color: "red"

        })
    }
    await setTimeout(() => { console.log("Cancel Purchase Complete") }, 10000); // 3 sec
    loaderShow.value = !loaderShow.value
    acceptShow.value = !acceptShow.value

    steps.value = ""

}
</script>

<style scoped></style>