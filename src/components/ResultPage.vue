<template>
    <va-card class="card" color="#682beb" :bordered="false" square outlined>
        <va-card-title>Results {{ searchedCoin ? `for ${searchedCoin}` : '' }} </va-card-title>
        <va-card-content>
            <!--<va-card class="result-filter" square outlined>
                <va-card-title>Filter Results</va-card-title>
                <va-card-content>
                    Wattage:
                    <va-slider v-model="wattageSliderRange" range @change="onWattageChange">
                        <template #prepend>
                            <va-input v-model="lowWattage" readonly />
                        </template>
                        <template #append>
                            <va-input v-model="highWattage" readonly />
                        </template>
                    </va-slider>
                </va-card-content>
            </va-card>-->
            <div class="top-filter mb-4">
                <va-button-group class="results-sort">
                    <va-button :rounded="false" @click="sortBy('rating')" disabled>Sort By: </va-button>
                    <va-button :rounded="false" @click="sortBy('rating')">Score</va-button>
                    <va-button :rounded="false" @click="sortBy('eff')">Efficiency</va-button>
                    <va-button :rounded="false" @click="sortBy('hashrate')">Hashrate</va-button>
                    <va-button :rounded="false" @click="sortBy('wattage')">Wattage</va-button>
                </va-button-group>
                <va-select class="results-gpu-select" v-model="selectedGPU" label="GPU" :options="gpuList" text-by="name" track-by="id" clearable
                    @update:model-value="onGPUChange"
                />
            </div>
            <div v-if="shownResults.length > 0" class="results">
                <result-item v-for="result in shownResults" :key="result.id"
                    :title="result.title" :rating="(result.upvotes || 1) / (result.downvotes || 1) * 100" :efficiency="result.efficiency || 0" :hashrate="result.hashrate || 0" :wattage="result.wattage || 0"
                    :gpu="gpuList.length && gpuList.filter(gpu => result.gpu === gpu.id)[0].name" :id="result.id"
                />
            </div>
            <div v-else>
                No results for this coin! Be the first one to add one!<br><br>
                <va-button rounded @click="sortBy('wattage')">+ Add setting for "{{ searchedCoin }}"</va-button>
            </div>
        </va-card-content>
    </va-card>
</template>

<script>
import ResultItem from './ResultItem.vue'

export default {
    components: {
        ResultItem
    },
    data () {
        return {
            /*wattageSliderRange: [0, 100],
            lowWattage: 0,
            highWattage: 100,
            maxWattage: 1000,*/
            shownResults: this.settings || [],
            sortDir: 0,
            selectedGPU: '',
            selectedCoin: '',
            results: []
        }
    },
    computed: {
        searchedCoin () {
            return this.$store.state.searchedCoin
        },
        gpuList () {
            return this.$store.state.gpus || [{ name: 'Coin', id: 1}]
        },
        settings () {
            return this.$store.state.settings || []
        }
    },
    watch: {
        searchedCoin (newValue) {
            this.selectedCoin = newValue
            this.filter()
            this.sortBy('rating')
        },
    },
    async created () {
        const response = await fetch('http://localhost:3000/settings')
        this.$store.state.settings = await response.json()
        this.shownResults = this.settings
        this.sortBy('rating')
    },
    methods: {
        onWattageChange (evt) {
            this.lowWattage = evt[0] * this.maxWattage
            this.highWattage = evt[1] * this.maxWattage
        },
        onGPUChange () {
            this.filter()
        },
        async filter () {
            let filteredResult = this.settings
            if (this.selectedCoin) {
                filteredResult = filteredResult.filter(setting => setting.coin === this.selectedCoin)
            }
            if (this.selectedGPU) {
                filteredResult = filteredResult.filter(setting => setting.gpu === this.selectedGPU.id)
            }
            this.shownResults = filteredResult
        },
        sortBy (prop) {
            if (this.shownResults || (Array.isArray(this.shownResults) && !this.shownResults.length)) {
                return
            }
            const results = [ ...this.shownResults ]
            if (this.sortDir === -1 || this.sortDir === 0) {
                this.shownResults = results.sort((a, b) => (a[prop] > b[prop]) ? -1 : ((b[prop] > a[prop]) ? 1 : 0))
                this.sortDir = 1
            } else if (this.sortDir === 1) {
                this.shownResults = results.sort((a, b) => (a[prop] > b[prop]) ? -1 : ((b[prop] > a[prop]) ? 1 : 0)).reverse()
                this.sortDir = -1
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    color: white;
    height: 100%;
    float: left;
    max-width: 100%;
    min-width: 100%;

    .top-filter {
        display: flex;
        gap: 20px;

        .results-sort {
            flex-shrink: 0;
            flex-grow: 0;
        }

        .results-gpu-select {
            width: 15vw !important;
            flex-shrink: 0;
            flex-grow: 0;
        }
    }

    .result-filter {
        float: left;
        width: 15vw;
    }

    .results {
        max-width: 100%;
        min-width: 100%;
        display: flex;
        gap: 10px;
        align-items: stretch;
    }
}
</style>