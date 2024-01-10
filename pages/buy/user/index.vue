<template>
    <div class="flex flex-col p-5 justify-center items-center pt-20">
        <div class="flex flex-row p-5 justify-center items-center pb-14">
            <h1 class="text-5xl">Purchase a Bike Page</h1>
        </div>
        <ClientOnly>

            <div v-if="!purchase">

                <div class=" items-center  justify-center flex-col flex w-96 gap-1">
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
                    <button :disabled="loaderShow" class="btn btn-lg hover:btn-success" @click="pushToIPFS()">
                        <span v-if="loaderShow" class="loading loading-spinner"></span>

                        Purchase
                    </button>


                </div>
                <div v-if="loaderShow" class="flex flex-col justify-center items-center w-96 pt-12">
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
            <div v-else>
                <div class="flex flex-col justify-center items-center">
                    <h1 class="text-5xl text-red-500">You have already made a purchase of a bike!</h1>
                    <button class="btn btn-lg ml-5 text-xl btn-primary mt-24 " @click="goToOrderPage">View Purchase</button>

                </div>
            </div>

        </ClientOnly>


    </div>
</template>

<script setup lang="ts">
const { makePurchase, account, checkforPurchase } = useCryptoStore()
import { getAccount } from '@wagmi/core'
import { transactionType } from 'viem';
const toast = useToast()

const loggedAccount = getAccount()
const purchase = await checkforPurchase(loggedAccount.address)
const models = ['Retro', 'Sporty', 'City']
const colours = ['Red', 'Green', 'Blue', 'Brown']
const cryptoStore = useCryptoStore()
const { loaderPurchase } = storeToRefs(cryptoStore)
const today = new Date();

const todayDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
const todayTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

const toIPFS = {
    bikeCost: 1000,
    depositFrame: 400,
    depositFrontWheel: 200,
    depositBackWheel: 200,
    depositTotal: 800,
    totalCost: 1800,
    colour: "",
    model: "",
    accountAddress: account,
    datetimePOS: {
        datePOS: todayDate,
        timePOS: todayTime
    }
}
function print() {
    console.log(toIPFS)
}
const loaderShow = ref(false)
const steps = [
    'Uploading to IPFS...',
    'Awaiting Approval...',
    'Awaiting transaction to be mined...',
    'Transaction mined!',
]
function goToOrderPage() {
    const link = "/buy/user/" + loggedAccount.address
    navigateTo(link)
}
async function pushToIPFS() {
    if (toIPFS.colour == "" && toIPFS.model == "") {
        toast.add({
            id: 'update_downloaded',
            title: 'Please select model and colour',
            icon: "i-heroicons-x-circle",
            timeout: 5000,
            color: "red"

        })
        console.log("error")
        return
    }
    loaderShow.value = !loaderShow.value

    // loaderShow.value = !loaderShow.value
    // console.log("loader")
    // console.log(loaderShow.value)
    // console.log(toIPFS)
    const transcationData = await makePurchase(toIPFS)
    // test()
    if (transcationData) {
        const link = "https://sepolia.etherscan.io/tx/" + transcationData?.transactionHash
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
    await setTimeout(() => { goToOrderPage() }, 5000); // 5 sec

    loaderShow.value = !loaderShow.value

    // loaderShow.value = !loaderShow.value

}


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