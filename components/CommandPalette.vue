<template>
    <div>
        <UCommandPalette ref="commandPaletteRef" :groups="groups" :autoselect="false" @update:model-value="onSelect" />
    </div>
</template>

<script setup lang="ts">
import { readContract, getAccount, writeContract, waitForTransaction } from '@wagmi/core'
const userAddress = ref('')
defineProps({
    userAddress: String,
    bikeList: Array
})
const router = useRouter()
const toast = useToast()
const accountAddress = getAccount().address
const commandPaletteRef = ref()
async function copyAddress() {
    if (accountAddress) {
        await navigator.clipboard.writeText(accountAddress.toString());
        toast.add({
            title: 'Address Copied!',
        })
        return;
    }
    toast.add({
        title: 'No address to copy!', icon: "i-heroicons-x-circle",
        timeout: 1000,
        color: "red"
    })

}
const users = [
    { id: 'buyabike', label: 'Buy A Bike', to: '/buy/user', icon: 'i-heroicons-window' },
    { id: 'approveabike', label: 'Approve A Purchase', to: '/buy/user', icon: 'i-heroicons-window' },
    { id: 'authorize', label: 'Authorize Bike', to: '/authenticate', icon: 'i-heroicons-window' },
    { id: 'checkorder', description: 'Check your pending order', label: 'Preview Purchase', to: `/buy/user/${accountAddress}`, icon: 'i-heroicons-window' },
    { id: 'about', label: 'About The Project', to: '/about', target: '_blank', icon: 'i-heroicons-window' },
    { id: 'abuotus', label: 'About Us', to: '/aboutus', target: '_blank', icon: 'i-heroicons-window' },
    { id: 'recycle', label: 'Recycle ', to: '/recycle', target: '_blank', icon: 'i-heroicons-window' },
]

const actions = [
    { id: 'new-file', label: 'Copy your address', icon: 'i-heroicons-document-plus', click: copyAddress, shortcuts: ['⌘', 'N'] },
    // { id: 'new-folder', label: 'Add new folder', icon: 'i-heroicons-folder-plus', click: () => toast.add({ title: 'New folder added!' }), shortcuts: ['⌘', 'F'] },
    // { id: 'hashtag', label: 'Add hashtag', icon: 'i-heroicons-hashtag', click: () => toast.add({ title: 'Hashtag added!' }), shortcuts: ['⌘', 'H'] },
    // { id: 'label', label: 'Add label', icon: 'i-heroicons-tag', click: () => toast.add({ title: 'Label added!' }), shortcuts: ['⌘', 'L'] }
]

const groups = computed(() =>
    [commandPaletteRef.value?.query ? {
        key: 'users',
        commands: users
    } : {
        key: 'recent',
        label: 'Recent searches',
        commands: users.slice(0, 4)
    }, {
        key: 'actions',
        commands: actions
    }].filter(Boolean))

function onSelect(option: any) {
    if (option.click) {
        option.click()
    } else if (option.to) {
        if (option.to == '/recycle') {
            console.log(option.to + "/" + accountAddress)
            router.push(option.to + "/" + accountAddress)
        }
        router.push(option.to)
        emit('to-page')
    } else if (option.href) {
        window.open(option.href, '_blank')
    }
}
const emit = defineEmits(['to-page'])

</script>

