<template>
    <div class="navbar bg-base-100 z-10">
        <div class="navbar-start">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </label>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <NuxtLink to="/authenticate">
                            Authenticate
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/preview">
                            Preview
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/maintenance">
                            Maintenance
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/recycle">
                            Recycle
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/buy">
                            Buy
                        </NuxtLink>
                    </li>
                    <li><a>About</a></li>
                </ul>
            </div>
        </div>
        <div class="navbar-center">
            <NuxtLink class="btn btn-ghost text-xl" to="/">
                DPP Control Centre
            </NuxtLink>
            <!-- <h1 class="btn btn-ghost text-xl">DPP Control Centre</h1> -->
        </div>
        <ClientOnly>
            <div class="navbar-end ">
                <div class="flex  items-center invisible lg:visible  gap-2 shadow-2xl">

                    <div class="">
                        <UKbd>⌘</UKbd>
                        +
                        <UKbd>K</UKbd>
                    </div>
                </div>
                <w3m-button balance="hide" />
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { getAccount } from '@wagmi/core'
const userAddress = getAccount().address
function goToPreviewPage() {
    const addressLink = "/preview/" + userAddress
    navigateTo(addressLink)
}
</script>

