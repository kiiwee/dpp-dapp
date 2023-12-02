<script setup lang="ts">
const route = useRoute()
import { storeToRefs } from 'pinia'
import { useCryptoStore } from '../stores/index'
const cryptoStore = useCryptoStore()
const { connectWallet, mintAsset, getNFTs, mint_with_uri } = useCryptoStore()
connectWallet()
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>

  </div>
</template>
