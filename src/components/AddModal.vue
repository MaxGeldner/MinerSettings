<template>
    <va-modal
      v-model="show"
      hide-default-actions
      overlay-opacity="0.2"
    >
        <template #header>
            <h2>Add setting for {{ coin.name }} ({{ coin.short }})</h2>
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
        state: {
            type: Boolean,
            default: false
        },
        coin: {
            type: Object,
            default () {
                return {
                    name: 'Coin',
                    id: -1
                }
            }
        },
    },
    data () {
        return {
            show: this.state,
            title: '',
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
                        coin: this.coin.id,
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
            this.gpu = 0
            this.coreClock = 0
            this.memClock = 0
            this.powerTarget = 0
            this.voltage = 0
            this.hashrate = 0
            this.wattage = 0
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