<template>
    <va-modal
      v-model="show"
      hide-default-actions
      overlay-opacity="0.2"
    >
        <template #header>
            <h2>Add setting for {{ coin }}</h2>
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
                        <!--<va-select
                            v-model="gpu"
                            label="GPU"
                            :options="gpus"
                            bordered
                        />-->
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
                        <va-input
                            label="Hashrate"
                            v-model="hashrate"
                            :rules="[value => (value && value.length > 0) || 'Field is required']"
                        />
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
            type: String,
            default: 'Coin'
        },
        gpus: {
            type: Array,
            default () {
                return ['NVidia 3060ti LHR']
            }
        }
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
        }
    },
    watch: {
        state (newValue) {
            this.show = newValue
        }
    },
    methods: {
        onAddSetting () {
            this.show = false
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
    }
}
</style>