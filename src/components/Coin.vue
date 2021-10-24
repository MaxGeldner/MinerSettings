<template>
    <div>
        <va-card :class="`card-content ${selected ? 'active' : ''}`" :bordered="true" :color="(selected || typeof searchedCoin === 'undefined') ? '#ffffff' : '#dddddd'" square outlined>
            <va-card-title class="coin-header">{{ name }} ({{ short }})</va-card-title>
            <va-card-content>
                <div class="coin-image">
                    <va-image contain :src="image" />
                </div>
                <div class="coin-buttons">
                    <va-button icon="add" @click="onSettingAddClick">&nbsp;Add Setting</va-button><br>
                    <va-button icon="visibility" @click="onSettingViewClick">&nbsp;View Settings</va-button>
                </div>
            </va-card-content>
        </va-card>
        <add-modal v-if="showAddForm" :coin="{ name, short, id }" @closed="showAddForm = false" @settingAdded="onSettingAdded" />
    </div>
</template>

<script>
import AddModal from './AddModal.vue'

export default {
    components: {
        AddModal
    },
    props: {
        name: {
            type: String,
            default: 'Coin'
        },
        short: {
            type: String,
            default: 'CIN'
        },
        image: {
            type: String,
            default: 'coins/placeholder.png'
        },
        id: {
            type: Number,
            default: -1
        }
    },
    data () {
        return {
            showAddForm: false
        }
    },
    computed: {
        gpuList () {
            return this.$store.state.gpus || []
        },
        searchedCoin () {
            return this.$store.state.searchedCoin.id
        },
        selected () {
            return this.searchedCoin === this.id
        }
    },
    methods: {
        async onSettingViewClick () {
            if (this.selected) {
                return
            }
            const response = await fetch(`${process.env.VUE_APP_API_URL}/settings?coin=${this.id}`)
            const settings = await response.json()
            settings.forEach(setting => {
                setting.efficiency = setting.hashrate / setting.wattage || 1
                setting.gpuName = (this.gpuList.find(gpu => gpu.id === setting.gpu) || {}).name
            })
            this.$store.state.settings = settings
            this.$store.state.searchedCoin = { id: this.id, short: this.short, name: this.name }
        },
        onSettingAddClick () {
            this.showAddForm = true
        },
        onSettingAdded () {
            this.showAddForm = false
            this.$store.state.searchedCoin = { id: this.id, short: this.short, name: this.name }
        }
    }
}
</script>

<style lang="scss" scoped>
.active {
    outline: orange solid 2px;;
}

.card-content {
    color: black;
    width: 210px;
    height: 190px;

    .coin-header {
        color: black;
        white-space: nowrap;
        margin-bottom: 0px;
        padding-bottom: 10px;
    }

    .coin-image {
        vertical-align: middle;
        width: 50px;
        margin: auto;
        margin-bottom: 10px;
    }

    .coin-buttons {
        margin: auto;

        button {
            width: 100%;
            margin-bottom: 7px
        }
    }
}
</style>