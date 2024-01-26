import axios from 'axios';
const contractAddress = "0x170Dc614Ea5A2Df130763434aaB1BF1556D90cb5";

async function reloadKV() {

    const responseData: any = []
    try {
        const url = `https://eth-sepolia.g.alchemy.com/nft/v3/1e3k-TtozfGSz3WflkBQZQVauAp1WYFv/getNFTsForContract?contractAddress=0x170Dc614Ea5A2Df130763434aaB1BF1556D90cb5&withMetadata=true`
        const config = {
            method: "get",
            url: url,
        };
        const res: any = await axios(config).catch((error) => console.log("error", error));
        responseData.value = res.data
        // console.log("nfts on back end:", res.data);
    } catch (error) {
        console.log(error);
    }
    const dataStorage = useStorage('data');

    for (let i = 0; i < responseData.value.nfts.length; i++) {
        await dataStorage.setItem(i.toString(), responseData.value.nfts[i]);

    }
    return responseData.value.nfts;
}

export default defineEventHandler(async (event) => {
    const dataStorage = useStorage('data');
    const name = getRouterParam(event, 'name')


    return {
        value: await reloadKV()
    }
})