import axios from 'axios';



export default defineEventHandler(async (event) => {
    const dataStorage = useStorage('data');
    await dataStorage.setItem('hello', 'world');
    const id: any = getRouterParam(event, 'id')

    return {
        nft: await dataStorage.getItem(id?.toString()),
    }
})