<template>
    <div class="flex flex-row p-5 justify-center items-center">
        <h1 class="text-5xl">DPP Preview Page</h1>
    </div>
    <div class="flex flex-row  justify-center items-center p-10">

        <div class="card justify-center  bg-base-100 shadow-xl ">
            <div class="card-body">
                <h1 class="card-title py-2">DPP Owner: address</h1>
                <h2>POS Date Time: 00:00:00 1/1/2024 </h2>
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
                <h2>Maintenance done: </h2>
                <div class="ml-10">
                    <h2>In meintenance: false</h2>
                    <h2>Maintanaces: </h2>
                    <div class="ml-10">
                        <h2>#1</h2>
                        <div class="ml-10">
                            <h2> Datetime: France</h2>
                            <h2> Reason: France</h2>
                            <h2> Work done: France</h2>
                        </div>

                    </div>
                </div>
                <h2>Changed Parts: </h2>
                <div class="ml-10">
                    <h2> #1</h2>
                    <div class="ml-10">
                        <h2>Rear wheel
                        </h2>
                        <div class="ml-10">
                            <h2> ID: 100</h2>
                            <h2> Deposit: 50</h2>
                            <h2> Date: 50</h2>
                        </div>

                    </div>
                </div>
                <h2> Ownership History</h2>
                <div class="ml-10">
                    <h2>#1</h2>
                    <div class="ml-10">
                        Date: 1/6/2205
                    </div>
                </div>
                <h2> Warranty</h2>
                <div class="ml-10">
                    <h2>Until: 1/1/2025</h2>
                    <h2>Used at: </h2>
                    <div class="ml-10">
                        Date: 1/6/2205
                        <div class="ml-10"> Changed: Front wheel</div>
                    </div>
                </div>
                <h2> Recycling</h2>
                <div class="ml-10">
                    <h2>Recycled: False</h2>
                    <h2>Recycled at: False</h2>
                    <h2>Recycled to: False</h2>
                    <div class="ml-10">
                        Date: 1/6/2205
                    </div>
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
const { getNFTsByContract } = useCryptoStore()
getNFTsByContract()
const route = useRoute()
const { data: itemJson } = await useFetch("https://bafybeifwrdj7ircxzaqkwzacdp3gkcamnhgawmflnyh7lccusd43niyvpu.ipfs.nftstorage.link/000000000000000000000000000000000000000000000000000000000000000" + route.params.id + ".json")

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
</script>

<style scoped></style>