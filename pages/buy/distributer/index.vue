<template>
    <div class="flex flex-row p-5 justify-center items-center pt-20">
        <h1 class="text-5xl">DPP Distributer Purchase Page</h1>
    </div>
    <div class="flex flex-col p-5 justify-center items-center">
        <h1 class="text-4xl mb-10">Please Scan Your Wallet</h1>
        <Scanner moveToDest="true" @result-scan="getResult" class=" w-96" />
        <div v-if="scannedResult">
            Result: {{ scannedResult }}

        </div>

    </div>
</template>

<script setup lang="ts">
let scannedResult = ref('')
function getResult(result: string) {
    scannedResult.value = result;
}
</script>

<style scoped></style>