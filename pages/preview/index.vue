<template>
    <div class="flex flex-row p-5 justify-center items-center pt-20">
        <h1 class="text-5xl">DPP Preview Page</h1>
    </div>
    <ClientOnly>
        <div>

            <div v-if="nfts.totalCount == 0">
                <div class="flex flex-row p-5 justify-center items-center">
                    <h1 class="text-3xl text-slate-600">You do not own any DPPs</h1>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center">
            <div class="grid lg:grid-cols-3  gap-5 p-10 sm:grid-row-1 ">
                <div v-for="( nft, index ) in  nfts.ownedNfts ">

                    <div class="card w-96 bg-base-100 shadow-xl">
                        <figure class="px-10 pt-10">
                            {{ index }}
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">{{ nft!['raw']['metadata']['name'] }} #{{ nft!['tokenId'] }}</h2>
                            <p>Date Of Purchase: {{ nft!['raw']['metadata']['dateOfPurchase'] }}</p>
                            <div class="card-actions pt-2">
                                <button @click="goToOrderPage(nft!['tokenId'])" class="btn btn-primary">Preview</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>
<script setup lang="ts">
const { getNFTsByContract } = useCryptoStore()
await getNFTsByContract()
const route = useRoute()
const { nfts } = storeToRefs(useCryptoStore())
const ownedNFTS = ref()
ownedNFTS.value = nfts.value
console.log("Loaded", ownedNFTS.value)
// When accessing /posts/1, route.params.id will be 1
async function goToOrderPage(additive: any) {
    const link = "/preview/" + additive
    await navigateTo(link)
}
console.log(route.params.address)
</script>

<style scoped></style>