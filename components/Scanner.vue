<template>
    <div>
        <!-- <p class="decode-result">
            Last result: <b>{{ result }}</b>
        </p> -->

        <qrcode-stream :paused="paused" @detect="onDetect" @error="onError" @camera-on="resetValidationState">
            <div v-if="validationSuccess" class="validation-success">Success, redirecting...</div>

            <div v-if="validationFailure" class="validation-failure">This is NOT a valid QR</div>

            <div v-if="validationPending" class="validation-pending">Checking Wallet...</div>
            <div v-if="noETH" class="validation-failure">Isnt Eth Address</div>
            <div v-if="routeETH" class="validation-success">Redirecting...</div>
            <div v-if="noPurchase" class="validation-failure">No order made</div>


        </qrcode-stream>
    </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'


export default {

    props: ['header', 'checkdpp', 'moveToDest', 'recyclePage'],
    components: { QrcodeStream },

    data() {
        return {

            routeandEth: undefined,
            isntETH: undefined,
            isValid: undefined,
            paused: false,
            result: null,
            hasPurchase: undefined,
            waiting: undefined
        }
    },

    computed: {
        routeETH() {
            return this.routeandEth === true
        },
        noPurchase() {
            return this.hasPurchase === false
        },
        noETH() {
            return this.isntETH === true
        },
        validationPending() {
            return this.waiting === true && this.isValid === undefined
        },

        validationSuccess() {
            return this.isValid === true
        },

        validationFailure() {
            return this.isValid === false
        }
    },

    methods: {
        onError: console.error,

        resetValidationState() {
            this.isValid = undefined
        },

        async onDetect([firstDetectedCode]) {
            this.result = firstDetectedCode.rawValue
            console.log(this.result)

            this.$emit('result-scan', this.result)
            if (this.recyclePage) {

                this.paused = true
                this.waiting = true
                // TODO: #2 Check for DPP
                // pretend it's taking really long
                if (!this.result.startsWith('tokenID: ')) {
                    this.isValid = false
                    this.paused = false
                    this.waiting = false
                    return;
                }
                const tokenid = this.result.replace('tokenID: ', '')
                console.log(tokenid)

                const { data } = await useFetch('/api/getToken/' + tokenid)
                console.log(data.value)

                if (data.nfts === null) {
                    this.isValid = false
                    this.paused = false
                    this.waiting = false
                    return;
                }
                else {
                    this.isValid = true
                    await this.timeout(3000)
                    await navigateTo("/recycle/" + tokenid)
                }
                // this.isValid = this.result.startsWith('tokenID: ')
                // await this.timeout(3000)
                // await navigateTo("/recycle/" + string)


                // some more delay, so users have time to read the message
                await this.timeout(2000)
                this.paused = false
                this.waiting = false
                return;
            }
            else if (!this.result.startsWith('ethereum:0x')) {
                const address = this.result.replace('ethereum:', '').split('@')[0]

                this.paused = true
                this.isntETH = true
                await this.timeout(3000)
                this.isntETH = undefined
                this.paused = false

                return;
            }
            if (this.moveToDest) {
                const address = this.result.replace('ethereum:', '').split('@')[0]

                // TODO: #1 Check for Purchase
                const { checkforPurchase } = useCryptoStore(this.$pinia)

                this.hasPurchase = await checkforPurchase(address)
                if (this.hasPurchase) {
                    await this.timeout(200)
                    await navigateTo("/buy/distributer/" + address)
                }
                await this.timeout(3000)

                this.hasPurchase = undefined
                return;
            }
            else if (this.checkdpp) {
                const address = this.result.replace('ethereum:', '').split('@')[0]

                this.paused = true
                // TODO: #2 Check for DPP
                // pretend it's taking really long
                await this.timeout(3000)
                this.isValid = this.result.startsWith('ethereum:0x')

                // some more delay, so users have time to read the message
                await this.timeout(2000)
                this.paused = false
            }

        },

        timeout(ms) {
            return new Promise((resolve) => {
                window.setTimeout(resolve, ms)
            })
        }
    }
}
</script>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
    color: black;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
}

.validation-success {
    color: green;
}

.validation-failure {
    color: red;
}
</style>