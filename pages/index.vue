<script setup lang="ts">
const route = useRoute()
import { storeToRefs } from 'pinia'
import { useCryptoStore } from '../stores/index'
const cryptoStore = useCryptoStore()
const { } = useCryptoStore()
useSeoMeta({
  title: 'DPP Control Centre',
  description: 'A webApp that allows interacting with the DPP Smart Contract',
  ogTitle: 'DPP Control Centre',
  ogDescription: 'A webApp that allows interacting with the DPP Smart Contract',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: 'DPP Control Centre',
  twitterDescription: 'A webApp that allows interacting with the DPP Smart Contract',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary'
})
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Hello there</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
          In deleniti eaque aut repudiandae et a id nisi.</p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
</template>
