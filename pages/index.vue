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
  <!--
// v0 by Vercel.
// https://v0.dev/t/0W13RkH
-->
  <section class="">
    <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          Digital Product Passport
          <strong class="font-extrabold text-red-700 sm:block">Own More. Think Less.</strong>
        </h1>

        <p class="mt-4 sm:text-xl/relaxed">
          Blockchain supported implementation of product tracking, for personal use!
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">

          <NuxtLink
            class="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            to="/buy/user/"> Get Started</NuxtLink>
          <NuxtLink
            class="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
            to="/about">
            Learn More
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
