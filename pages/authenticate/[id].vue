<template>
    <div>
        <div class="flex flex-row p-5 justify-center items-center">
            <h1 class="text-5xl">DPP Authentication Page {{ $route.params.id }}</h1>
        </div>
        <div class="flex flex-row p-5 justify-center items-center ">
            <Scanner class=" w-96" />
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()

</script>

<style scoped></style>