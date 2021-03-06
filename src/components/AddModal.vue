<template>
    <va-modal
      v-model="show"
      @click-outside="onModalClosed"
      hide-default-actions
      overlay-opacity="0.2"
    >
        <template #header>
            <h2>Add setting<span v-if="coin !== null"> for {{ coin.name }} ({{ coin.short }})</span></h2>
        </template>
        <slot v-if="!settingCompleted">
            <va-form class="add-form">
                <va-card class="form-group">
                    <va-card-title>General information</va-card-title>
                    <va-card-content>
                        <va-input
                            label="Title"
                            v-model="title"
                            :rules="[value => (value !== null && value !== '' && value.length > 0) || 'Field is required',
                                (value) => (value.length < 120) || 'Title should not be longer then 120 characters']"
                        />
                        <br>
                        <va-select class="results-gpu-select" v-model="gpu" label="GPU" :options="gpuList" text-by="name" track-by="id" 
                            :rules="[value => (value !== null) || 'Field is required']" searchable />
                        <br>
                        <va-select v-if="!coin" class="results-gpu-select" v-model="selectedCoin" label="Coin" :options="coinList" text-by="name" track-by="id"
                            :rules="[value => (value !== null) || 'Field is required']" searchable
                        />
                    </va-card-content>
                </va-card>
                <va-card class="form-group">
                    <va-card-title>Settings</va-card-title>
                    <va-card-content>
                        <va-input
                            label="Core Clock (MHz)"
                            type="number"
                            v-model="coreClock"
                            :rules="[value => (value !== null && value.length > 0) || 'Field is required']"
                        />
                        <br>
                        <va-input
                            label="Memory Clock (MHz)"
                            type="number"
                            v-model="memClock"
                            :rules="[value => (value !== null && value.length > 0) || 'Field is required']"
                        />
                        <br>
                        <va-input
                            label="Power Target (%)"
                            type="number"
                            v-model="powerTarget"
                            :rules="[value => (value !== null && value.length > 0) || 'Field is required', value => (value >= 0 && value <= 100) || 'Value must be between 0 and 100']"
                        />
                        <br>
                        <va-input
                            label="Voltage (V)"
                            type="number"
                            v-model="voltage"
                            :rules="[value => (value !== null) || 'Field is required']"
                        />
                    </va-card-content>
                </va-card>
                <va-card class="form-group">
                    <va-card-title>Results</va-card-title>
                    <va-card-content>
                        <div class="hashrate-field">
                            <va-input
                                label="Hashrate"
                                type="number"
                                v-model="hashrate"
                                :rules="[value => (value !== null && value.length > 0) || 'Field is required']"
                            />
                            <va-select class="results-gpu-select" v-model="hashrateUnit" label="Unit" :options="hashrateUnitList" style="width: 20%" />
                        </div>
                        <br>
                        <va-input
                            label="Wattage (W)"
                            type="number"
                            v-model="wattage"
                            :rules="[value => (value !== null && value.length > 0 && value > 0) || 'Field is required']"
                        />
                    </va-card-content>
                </va-card>
            </va-form>
        </slot>
        <slot v-else>
            <va-card class="preview">
                <div class="preview-item"><div>Title:</div><div>{{ title }}</div></div>
                <div class="preview-item"><div>GPU:</div><div>{{ gpu.name }}</div></div>
                <div class="preview-item"><div>Coin:</div><div>{{ selectedCoin.name }}</div></div>
            </va-card>
            <va-card class="preview">
                <div class="preview-item"><div>Core Clock:</div><div>{{ coreClock }} MHz</div></div>
                <div class="preview-item"><div>Memory Clock:</div><div>{{ memClock }} MHz</div></div>
                <div class="preview-item"><div>Power target:</div><div>{{ powerTarget }} %</div></div>
                <div class="preview-item"><div>Voltage:</div><div>{{ voltage }} V</div></div>
            </va-card>
            <va-card class="preview">
                <div class="preview-item"><div>Hashrate:</div><div>{{ hashrate }} {{ hashrateUnit }}</div></div>
                <div class="preview-item"><div>Wattage:</div><div>{{ wattage }} W</div></div>
            </va-card>
            <div v-if="isError" class="add-error">
                Something went wrong while adding your setting!<br>Please check your inputs, try later again or
                <br>consider <a href="mailto:support@minersettings.com">writing a bug report!</a>
            </div>
        </slot>
        <template #footer>
            <va-button v-if="!settingCompleted" :disabled="!formValid" @click="settingCompleted = true">Preview Setting</va-button>
            <div v-else class="preview-buttons">
                <va-button @click="onBack" color="secondary">Back</va-button>&nbsp;
                <va-button @click="onSubmitSetting"><va-icon v-if="isLoading" name="loop" spin="counter-clockwise" />Submit Setting</va-button>
            </div>
        </template>
    </va-modal>
</template>

<script>
export default {
    props: {
        coin: {
            type: Object,
            default () {
                return null
            }
        },
    },
    emits: ['settingAdded', 'closed'],
    data () {
        return {
            show: true,
            hashrateUnitList: ['Kh/s', 'Mh/s'],
            isLoading: false,
            isError: false,
            title: '',
            selectedCoin: this.coin ? this.coin : {},
            gpu: {},
            coreClock: 0,
            memClock: 0,
            powerTarget: 0,
            voltage: 0,
            hashrate: 0,
            wattage: 0,
            hashrateUnit: 'Kh/s',
            settingCompleted: false
        }
    },
    computed: {
        gpuList () {
            return this.$store.state.gpus
        },
        coinList () {
            return this.$store.state.coins
        },
        formValid () {
            return this.title !== '' && this.title !== null && typeof this.gpu.id !== 'undefined' && this.coreClock !== null
                && this.memClock !== null && this.powerTarget >= 0 && this.powerTarget <= 100
                && this.voltage !== null && this.voltage && this.hashrate !== null && this.hashrateUnitList.includes(this.hashrateUnit)
                && this.wattage !== null && this.wattage > 0 && typeof this.selectedCoin.id !== 'undefined'
        }
    },
    watch: {
        state (newValue) {
            this.show = newValue
        }
    },
    methods: {
        async onSubmitSetting () {
            let hashrate = this.hashrate
            if (this.hashrateUnit === 'Kh/s') {
                hashrate *= 1000
            } else if (this.hashrateUnit === 'Mh/s') {
                hashrate *= 1000000
            }
            const addResponse = await fetch(`${process.env.VUE_APP_API_URL}/settings`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        coin: this.selectedCoin.id,
                        title: this.title,
                        gpu: this.gpu.id,
                        coreClock: this.coreClock,
                        memClock: this.memClock,
                        powerTarget: this.powerTarget,
                        voltage: this.voltage,
                        hashrate: hashrate,
                        wattage: this.wattage,
                    }
                )
            });
            const success = await addResponse.json()

            if (!success) {
                this.isError = true
                this.isLoading = false
                return
            }

            this.show = false
            this.title = ''
            this.gpu = {}
            this.coreClock = 0
            this.memClock = 0
            this.powerTarget = 0
            this.voltage = 0
            this.hashrate = 0
            this.wattage = 0

            const settingsResponse = await fetch(`${process.env.VUE_APP_API_URL}/settings?coin=${this.selectedCoin.id}`)
            this.$store.state.settings = await settingsResponse.json()
            this.$store.state.searchedCoin = this.selectedCoin
            this.selectedCoin = {}

            this.isLoading = false

            this.$emit('settingAdded')
        },
        onBack() {
            this.settingCompleted = false
            this.isError = false
        },
        onModalClosed () {
            this.$emit('closed')
        }
    }
}
</script>

<style lang="scss" scoped>
.preview {
    padding: 10px;
    width: fit-content;
    min-width: 20vw;
    line-height: 26px;
    font-size: large;
    font-family: var(--va-button-font-family);
    margin-bottom: 10px;

    .preview-item {
        display: flex;
        flex-flow: row;

        div:first-child {
            min-width: 33%;
            width: fit-content;
        }

        div:last-child {
            word-break: break-all;
            width: 67%;
        }
    }
}


.add-error {
    width: 100%;
    text-align: center;
    color: red;
}

.add-form {
    width: 500px;

    .form-group {
        margin-bottom: 10px;

        .hashrate-field {
            display: flex;
            gap: 5px;
        }
    }
}
</style>