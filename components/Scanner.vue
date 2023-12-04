<template>
    <div>
        <!-- <p class="decode-result">
            Last result: <b>{{ result }}</b>
        </p> -->

        <qrcode-stream :paused="paused" @detect="onDetect" @error="onError" @camera-on="resetValidationState">
            <div v-if="validationSuccess" class="validation-success">This is wallet does have a valid DPP</div>

            <div v-if="validationFailure" class="validation-failure">This is NOT a ethereum address</div>

            <div v-if="validationPending" class="validation-pending">Checking Wallet for DPP...</div>
            <div v-if="noETH" class="validation-failure">Isnt Eth Address</div>
            <div v-if="routeETH" class="validation-success">Redirecting...</div>


        </qrcode-stream>
    </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    props: ['header', 'checkdpp', 'moveToDest'],
    components: { QrcodeStream },

    data() {
        return {
            routeandEth: undefined,
            isntETH: undefined,
            isValid: undefined,
            paused: false,
            result: null
        }
    },

    computed: {
        routeETH() {
            return this.routeandEth === true
        },
        noETH() {
            return this.isntETH === true
        },
        validationPending() {
            return this.isValid === undefined && this.paused
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
            this.$emit('result-scan', this.result)
            if (!this.result.startsWith('ethereum:0x')) {
                this.paused = true
                this.isntETH = true
                await this.timeout(3000)
                this.isntETH = undefined
                this.paused = false

                return;
            }
            if (this.moveToDest) {
                this.paused = true

                // TODO: #1 Check for Purchase

                this.hasPurchase = true
                await this.timeout(200)
                await navigateTo("/buy/distributer/" + this.result)
                return;
            }
            else if (this.checkdpp) {
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