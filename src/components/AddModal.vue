<template>
    <va-modal
      v-model="show"
      hide-default-actions
      overlay-opacity="0.2"
    >
        <template #header>
            <h2>Add setting<span v-if="coin !== null"> for {{ coin.name }} ({{ coin.short }})</span></h2>
        </template>
        <slot>
            <va-form class="add-form">
                <va-card class="form-group">
                    <va-card-title>General information</va-card-title>
                    <va-card-content>
                        <va-input
                            label="Title"
                            v-model="title"
                            :rules="[value => (value && value.length > 0) || 'Field is required']"
                        />
                        <br>
                        <va-select class="results-gpu-select" v-model="gpu" label="GPU" :options="gpuList" text-by="name" track-by="id" />
                        <br>
                        <va-select v-if="!coin" class="results-gpu-select" v-model="selectedCoin" label="Coin" :options="coinList" text-by="name" track-by="id" />
                    </va-card-content>
                </va-card>
                <va-card class="form-group">
                    <va-card-title>Settings</va-card-title>
                    <va-card-content>
                        <va-input
                            label="Core Clock"
                            v-model="coreClock"
                            :rules="[value => (value && value.length > 0) || 'Field is required']"
                        />
                        <br>
                        <va-input
                            label="Memory Clock"
                            v-model="memClock"
                            :rules="[value => (value && value.length > 0) || 'Field is required']"
                        />
                        <br>
                        <va-input
                            label="Power Target"
                            v-model="powerTarget"
                            :rules="[value => (value && value.length > 0) || 'Field is required']"
                        />
                        <br>
                        <va-input
                            label="Voltage"
                            v-model="voltage"
                            :rules="[value => (value && value.length > 0) || 'Field is required']"
                        />
                    </va-card-content>
                </va-card>
                <va-card class="form-group">
                    <va-card-title>Results</va-card-title>
                    <va-card-content>
                        <div class="hashrate-field">
                            <va-input
                                label="Hashrate"
                                v-model="hashrate"
                                :rules="[value => (value && value.length > 0) || 'Field is required']"
                            />
                            <va-select class="results-gpu-select" v-model="hashrateUnit" label="Unit" :options="['Kh/s', 'Mh/s']" style="width: 20%" />
                        </div>
                        <br>
                        <va-input
                            label="Wattage"
                            v-model="wattage"
                            :rules="[value => (value && value.length > 0) || 'Field is required']"
                        />
                    </va-card-content>
                </va-card>
            </va-form>
        </slot>
        <template #footer>
            <va-button @click="onAddSetting">Add setting</va-button>
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
    emits: ['settingAdded'],
    data () {
        return {
            show: true,
            title: '',
            selectedCoin: this.coin ? this.coin : null,
            gpu: '',
            coreClock: 0,
            memClock: 0,
            powerTarget: 0,
            voltage: 0,
            hashrate: 0,
            wattage: 0,
            hashrateUnit: ''
        }
    },
    computed: {
        gpuList () {
            return this.$store.state.gpus
        },
        coinList () {
            return this.$store.state.coins
        }
    },
    watch: {
        state (newValue) {
            this.show = newValue
        }
    },
    methods: {
        async onAddSetting () {
            let hashrate = this.hashrate
            if (this.hashrateUnit === 'Kh/s') {
                hashrate *= 1000
            } else if (this.hashrateUnit === 'Mh/s') {
                hashrate *= 1000000
            }
            await fetch('http://localhost:3000/settings', {
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
            this.show = false
            this.title = ''
            this.selectedCoin = null
            this.gpu = 0
            this.coreClock = 0
            this.memClock = 0
            this.powerTarget = 0
            this.voltage = 0
            this.hashrate = 0
            this.wattage = 0

            const response = await fetch('http://localhost:3000/settings')
            this.$store.state.settings = response.json()

            this.$emit('settingAdded')
        }
    }
}
</script>

<style lang="scss" scoped>
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