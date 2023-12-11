// import { Alchemy, Network } from 'alchemy-sdk'
import { acceptHMRUpdate, defineStore } from "pinia";
// Setup: npm install alchemy-sdk
import { ethers } from "ethers";
const contractAddress = "0x64401922261928ca18e405c4b0c48d3f1641463e";
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
import { readContract, getAccount, writeContract } from '@wagmi/core'
import { parseEther, parseGwei, type Address } from "viem";


const baseURL = `https://eth-sepolia.g.alchemy.com/v2/1e3k-TtozfGSz3WflkBQZQVauAp1WYFv`;
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
    const nfts = ref(null);
    const orderUser = ref({})

    async function makePurchase(purchaseDetails: {
        [key: string]: any; // 👈️ variable key
    }) {
        console.log("setting loader");
        //setLoader(true)
        try {
            const account = getAccount()

            if (account) {
                const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
                //TODO: #4 Fix get wallet address before trigger
                const description = "Order Created by" + account.address
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
                    "model": purchaseDetails.model
                });

                console.log("NFT data stored!");
                console.log("Metadata URI: ", metadata.url);
                const { hash } = await writeContract({
                    address: contractAddress,
                    abi: contractABI.abi,
                    functionName: 'makePurchase',
                    args: [metadata.url],
                    value: parseEther('0.0000000000000018'),
                })

                console.log(
                    hash,
                    "Link to txn",
                    "https://sepolia.etherscan.io/tx/" + hash
                );
                console.log("Mining...", hash);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
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
                console.log("Hello")
                console.log(fetched)
                orderUser.value = fetched.data.value
                return fetched.data.value
            }

        } catch (error) {
            //setLoader(false)
            console.log("Eroor");
            console.log(error);
        }
    }

    async function checkforPurchase(address: string) {
        console.log("setting loader");
        //setLoader(true)
        try {
            console.log(address)
            const data = await readContract({
                address: contractAddress,
                abi: contractABI.abi,
                functionName: 'orderMade',
                args: [address]
            })
            console.log(data)
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
            console.log(address)
            const { hash } = await writeContract({
                address: contractAddress,
                abi: contractABI.abi,
                functionName: 'cancelPurchase_User',
            })
            console.log("https://sepolia.etherscan.io/tx/" + hash)
            return hash
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
            console.log(address)
            const { hash } = await writeContract({
                address: contractAddress,
                abi: contractABI.abi,
                functionName: 'cancelPurchase_Distributor',
                args: [address]
            })
            console.log("https://sepolia.etherscan.io/tx/" + hash)
            return hash
        } catch (error) {
            //setLoader(false)
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
            const url = `${baseURL}/getNFTs/?owner=${address}&contractAddresses[]=0xffde398a3dc75b951b750e3db6dbd2a99aa2503b&withMetadata=true`;
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
            const url = `${baseURL}/getNFTsForContract?contractAddress=0xffde398a3dc75b951b750e3db6dbd2a99aa2503b&withMetadata=true`;
            const config = {
                method: "get",
                url: url,
            };
            axios(config)
                .then((response) => {
                    // console.log(response['data'].ownedNfts)
                    nfts.value = response["data"];
                    loading.value = false;
                })
                .catch((error) => console.log("error", error));
            console.log("nfts on store:", nfts.value);
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
        account,
        nfts,
        loading,
        orderUser,
    };
});
// contract adress 0x35708b2605A08A471a80059a8D89d3E1B098FB06
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot));
}
