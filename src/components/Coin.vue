<template>
    <div>
        <va-card class="card-content" :bordered="true" square outlined>
            <va-card-title class="coin-header">{{ name }} ({{ short }})</va-card-title>
            <va-card-content>
                <div class="coin-image">
                    <va-image contain :src="image" />
                </div>
                <va-button-group class="coin-buttons">
                    <va-button icon="add" @click="onSettingAddClick" />
                    <va-button icon="visibility" @click="onSettingViewClick" />
                </va-button-group>
            </va-card-content>
        </va-card>
        <add-modal :state="showAddForm" :coin="{ name, short, id }" @settingAdded="showAddForm = false" />
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
            default: 'coins/ergo.png'
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
    methods: {
        onSettingViewClick () {
            this.$store.state.searchedCoin = this.short
            console.log(this.$store.state)
        },
        onSettingAddClick () {
            this.showAddForm = true
        }
    }
}
</script>

<style lang="scss" scoped>
.card-content {
    color: black;
    width: 190px;
    height: 150px;

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
    }
}
</style>