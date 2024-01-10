export default defineNuxtRouteMiddleware(async (to, from) => {

    if (to.fullPath.includes('/recycle/') && to.params.id) {
        console.log(to.params.id)
        const { data } = await useFetch('/api/getToken/' + to.params.id)
        console.log(data.value.nft)
        if (!data.value.nft) {
            return abortNavigation()
        }
    }
})