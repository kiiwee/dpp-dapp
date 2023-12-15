// import { Alchemy, Network } from 'alchemy-sdk'
import { acceptHMRUpdate, defineStore } from "pinia";
// Setup: npm install alchemy-sdk
const contractAddress = "0x170Dc614Ea5A2Df130763434aaB1BF1556D90cb5";
import { NFTStorage, File, Blob } from "nft.storage";
// The 'fs' builtin module on Node.js provides access to the file system
import fs from "fs";

// The 'path' module provides helpers for manipulating filesystem paths
import path from "path";
import contractABI from '../contract/DPP.sol/DPPContract.json'
// const contractAddress = '0x35708b2605A08A471a80059a8D89d3E1B098FB06'
// import alchemy from '../plugins/alchemy'
const NFT_STORAGE_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUwZDMzNWM4QTMwNGE3MzY3Q0U0ZERGRTMwRjU0QkNCRTc1YTVlNDEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NTcyNTI5MDY3OCwibmFtZSI6InNpNyJ9.GfTcnN3C_BPhh8F22HFMDn9MFk6D3rk1pS-EmlTrBgo";
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
import axios from "axios";
const address = "0x9e2BB71110d724d8712B94C5Ba4C07F2E7bcD3dA";
import { readContract, getAccount, writeContract, waitForTransaction } from '@wagmi/core'
import { parseEther, parseGwei, type Address } from "viem";
import { reset } from "viem/_types/actions/test/reset";


const baseURL = `https://eth-sepolia.g.alchemy.com/v3/1e3k-TtozfGSz3WflkBQZQVauAp1WYFv`;
// const url = `${baseURL}/getNFTMetadata/?contractAddress=${contractAddress}&tokenId=${route.params.id}`;
// const config = {
//     method: 'get',
//     url: url,
// };

// For example's sake, we'll fetch an image from an HTTP URL.
// In most cases, you'll want to use files provided by a user instead.
// async function getExampleImage() {
//     const imageOriginUrl =
//         "https://img.zolaprod.babsta.net/lti3zL6JeH7hOgHqjXQwnQiOE7M=/fit-in/1700x1700/244c47fd4bd54f37b2312bf1a5265c75";
//     const r = await useFetch(imageOriginUrl, { mode: "no-cors" });
//     if (!r.ok) {
//         throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
//     }
//     return r.blob();
// }

export const useCryptoStore = defineStore("user", () => {
    const account = ref(null);
    const loading = ref(true);
    const nfts: any = ref({});
    const orderUser = ref()
    const loaderPurchase = ref(0)

    async function approvePurchase(addressUser: any, purchaseDetails: {
        [key: string]: any;
    }) {
        console.log("setting loader");
        //setLoader(true)
        try {
            const account = getAccount()
            if (account) {
                loaderPurchase.value = 0

                const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
                //TODO: #4 Fix get wallet address before trigger
                const description = "Order Created by" + account.address
                const metadata = await client.store({
                    "name": "Digital Product Passport",
                    "description": description,
                    "image": new File(["<DATA>"], "../public/favicon.ico", {
                        type: "image/ico",
                    }),
                    "quantity": 1,
                    "bikeCost": purchaseDetails.bikeCost,
                    "deposit": {
                        "depositFrame": purchaseDetails.depositFrame,
                        "depositFrontWheel": purchaseDetails.depositFrontWheel,
                        "depositBackWheel": purchaseDetails.depositBackWheel,
                        "depositTotal": purchaseDetails.depositTotal,
                    },
                    "datetimePOS": purchaseDetails.datetimePOS,
                    "totalCost": purchaseDetails.totalCost,
                    "colour": purchaseDetails.colour,
                    "model": purchaseDetails.model,
                    "ids": purchaseDetails.ids,
                    "warranty": purchaseDetails.warranty,
                    "dateOfPurchase": purchaseDetails.warranty.startWarranty,
                    "distributor": account.address,
                });

                console.log("NFT data stored!");
                console.log("Metadata URI: ", metadata.url);
                loaderPurchase.value = 1

                const { hash } = await writeContract({
                    address: contractAddress,
                    abi: contractABI.abi,
                    functionName: 'approvePurchase',
                    args: [addressUser, metadata.url],
                })

                loaderPurchase.value = 2

                const data = await waitForTransaction({
                    hash: hash
                })
                loaderPurchase.value = 3

                console.log('Transaction mined at: ')
                console.log(data)
                return data;
            } else {
                console.log("No Connected account and/or purchase already made");
            }
        } catch (error) {
            loaderPurchase.value = 0
            //setLoader(false)
            console.log("Eroor");
            console.log(error);
        }
    }
    async function makePurchase(purchaseDetails: {
        [key: string]: any;
    }) {
        //setLoader(true)
        try {
            const account = getAccount()
            const orderBool = await checkforPurchase(account.address);

            if (account && !orderBool) {
                //TODO: #4 Fix get wallet address before trigger
                const description = "Order Created by" + account.address
                loaderPurchase.value = 0
                const metadata = await client.store({
                    "name": "Bike Order",
                    "description": description,
                    "image": new File(["<DATA>"], "../public/favicon.ico", {
                        type: "image/ico",
                    }),
                    "quantity": 1,
                    "bikeCost": purchaseDetails.bikeCost,
                    "depositFrame": purchaseDetails.depositFrame,
                    "depositFrontWheel": purchaseDetails.depositFrontWheel,
                    "depositBackWheel": purchaseDetails.depositBackWheel,
                    "depositTotal": purchaseDetails.depositTotal,
                    "totalCost": purchaseDetails.totalCost,
                    "colour": purchaseDetails.colour,
                    "model": purchaseDetails.model,
                    "datetimePOS": purchaseDetails.datetimePOS,
                });
                loaderPurchase.value = 1

                console.log("NFT data stored!");
                console.log("Metadata URI: ", metadata.url);
                const { hash } = await writeContract({
                    address: contractAddress,
                    abi: contractABI.abi,
                    functionName: 'makePurchase',
                    args: [metadata.url],
                    value: parseEther('0.0000000000000018'),
                })
                loaderPurchase.value = 2

                const data = await waitForTransaction({
                    hash: hash
                })
                loaderPurchase.value = 3

                console.log('Transaction mined at: ')
                console.log(data)
                return data;
                // console.log(
                //     hash,
                //     "Link to txn",
                //     "https://sepolia.etherscan.io/tx/" + hash
                // );
                // console.log("Mining...", hash);
            } else {
                console.log("No Connected account and/or purchase already made");
            }
        } catch (error) {
            loaderPurchase.value = 0
            return false;
            //setLoader(false)
            console.log("Eroor");
            console.log(error);
        }
    }
    async function getOrderByUser(address: `0x${string}` | any) {
        console.log("setting loader");
        //setLoader(true)
        try {
            const data: any = await readContract({
                address: contractAddress,
                abi: contractABI.abi,
                functionName: 'userOrderIPFS',
                args: [address]
            })
            if (data) {
                const fetched = await useLazyFetch(data.replace("ipfs://", "https://nftstorage.link/ipfs/"))
                orderUser.value = fetched.data.value
                return fetched.data.value
            }

        } catch (error) {
            //setLoader(false)
            console.log("Eroor");
            console.log(error);
        }
    }

    async function checkforPurchase(address: any) {
        //setLoader(true)
        try {
            const data = await readContract({
                address: contractAddress,
                abi: contractABI.abi,
                functionName: 'orderMade',
                args: [address]
            })
            return data
        } catch (error) {
            //setLoader(false)
            console.log("Eroor");
            console.log(error);
        }
    }

    async function cancelPurchaseUser() {
        console.log("setting loader");
        //setLoader(true)
        try {
            const { hash } = await writeContract({
                address: contractAddress,
                abi: contractABI.abi,
                functionName: 'cancelPurchase_User',
            })
            console.log("https://sepolia.etherscan.io/tx/" + hash)
            const data = await waitForTransaction({
                hash: hash
            })
            return data

        } catch (error) {
            //setLoader(false)
            console.log("Eroor");
            console.log(error);
        }
    }
    async function cancelPurchaseDistributer(address: any) {
        console.log("setting loader");
        //setLoader(true)
        try {
            loaderPurchase.value = 0

            const { hash } = await writeContract({
                address: contractAddress,
                abi: contractABI.abi,
                functionName: 'cancelPurchase_Distributor',
                args: [address]
            })
            loaderPurchase.value = 1

            const data = await waitForTransaction({
                hash: hash
            })
            loaderPurchase.value = 2

            console.log('Transaction mined at: ')
            console.log(data)
            return data;

        } catch (error) {
            //setLoader(false)
            loaderPurchase.value = 0

            console.log("Eroor");
            console.log(error);
        }
    }
    async function getNFTs() {
        try {
            loading.value = true;
            const { ethereum } = window;
            if (!ethereum) {
                alert("Must connect to MetaMask!");
                return;
            }
            // console.log(this.$config.INFURA_API_KEY)
            //const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })
            //const nftjson = await alchemy.nft.getNftsForOwner(myAccounts[0]);
            //console.log(nftjson.ownedNfts[3]);
            //nfts.value = nftjson.ownedNfts;

            const url = `${baseURL}/getNFTsForOwner/?owner=${address}&contractAddresses[]=${contractAddress}&withMetadata=true`;
            const config = {
                method: "get",
                url: url,
            };
            axios(config)
                .then((response) => {
                    // console.log(response['data'].ownedNfts)
                    nfts.value = response["data"].ownedNfts;
                    loading.value = false;
                })
                .catch((error) => console.log("error", error));
            console.log("nfts on store:", nfts.value);
        } catch (error) {
            console.log(error);
        }
    }
    async function getNFTsByContract() {
        try {
            const accountAddress = getAccount().address
            const url = `https://eth-sepolia.g.alchemy.com/nft/v3/1e3k-TtozfGSz3WflkBQZQVauAp1WYFv/getNFTsForOwner?owner=${accountAddress}&contractAddresses[]=${contractAddress}&withMetadata=true&pageSize=100`
            const config = {
                method: "get",
                url: url,
            };
            const res: any = await axios(config).catch((error) => console.log("error", error));
            nfts.value = res.data

            console.log("nfts on store updated:", nfts.value);
        } catch (error) {
            console.log(error);
        }
    }
    async function getNFTwithID(id: any) {
        try {


            const res = await useFetch(`https://eth-sepolia.g.alchemy.com/nft/v3/1e3k-TtozfGSz3WflkBQZQVauAp1WYFv/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${id}&refreshCache=false`)
            console.log("nft got:", res.data.value);

            return res.data.value
        } catch (error) {
            console.log(error);
        }
    }
    return {
        getNFTs,
        getNFTsByContract,
        checkforPurchase,
        makePurchase,
        getOrderByUser,
        cancelPurchaseUser,
        cancelPurchaseDistributer,
        approvePurchase, getNFTwithID,
        account,
        nfts,
        loading,
        orderUser,
        loaderPurchase,
    };
});
// contract adress 0x35708b2605A08A471a80059a8D89d3E1B098FB06
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot));
}
