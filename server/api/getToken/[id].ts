


export default defineEventHandler(async (event) => {
    const dataStorage = useStorage('data');
    const id: any = getRouterParam(event, 'id')

    return {
        nft: await dataStorage.getItem(id?.toString()),
    }
})