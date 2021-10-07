<template>
    <va-card class="card" color="#4006bfdd" :bordered="false" square>
        <va-card-title class="card-title">Results {{ searchedCoin ? `for "${searchedCoin.name}"` : '' }} </va-card-title>
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
                    <va-button :rounded="false" disabled>Sort By: </va-button>
                    <va-button :rounded="false" @click="sortBy('rating')">Score</va-button>
                    <va-button :rounded="false" @click="sortBy('popularity')">Popularity</va-button>
                    <va-button :rounded="false" @click="sortBy('efficiency')">Efficiency</va-button>
                    <va-button :rounded="false" @click="sortBy('hashrate')">Hashrate</va-button>
                    <va-button :rounded="false" @click="sortBy('wattage')">Wattage</va-button>
                </va-button-group>
                <va-select class="results-gpu-select" v-model="selectedGPU" label="GPU" :options="gpuList" text-by="name" track-by="id" clearable
                    placeholder="Select a GPU from the list below..." searchable @update:model-value="onGPUChange"
                />
            </div>
            <div v-if="shownResults.length > 0" class="results">
                <result-item v-for="result in shownResults" :key="result.id"
                    :result="result" :gpu="gpuList.length && (gpuList.filter(gpu => result.gpu === gpu.id)[0] || {}).name" :id="result.id"
                />
            </div>
            <div v-else-if="shownResults.length === 0 && searchedCoin" class="no-results">
                No results for this coin! Be the first one to add one!<br><br>
                <va-button class="add-button" rounded @click="showAddForm = true">+ Add setting for "{{ searchedCoin.name }}"</va-button>
            </div>
            <div v-else-if="shownResults.length === 0 && !searchedCoin" class="no-results">
                Select a coin first, then a GPU. Results will be shown here.<br>
                You can also add a setting for a coin and a GPU by clicking the button below!<br><br>
                <va-button class="add-button" rounded @click="showAddForm = true">+ Add setting</va-button>
            </div>
        </va-card-content>
        <add-modal v-if="showAddForm" :coin="searchedCoin ? { name: searchedCoin.name, short: searchedCoin.short, id: searchedCoin.id } : null"
            @closed="showAddForm = false" @settingAdded="showAddForm = false"
        />
    </va-card>
</template>

<script>
import ResultItem from './ResultItem.vue'
import AddModal from './AddModal.vue'

export default {
    components: {
        ResultItem,
        AddModal
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
            results: [],
            sortedProp: '',
            showAddForm: false
        }
    },
    computed: {
        searchedCoin () {
            return this.$store.state.searchedCoin
        },
        gpuList () {
            return this.$store.state.gpus || []
        },
        settings () {
            return this.$store.state.settings || []
        }
    },
    watch: {
        searchedCoin () {
            this.filter()
            this.sortBy('rating')
        },
    },
    async created () {
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
            if (this.searchedCoin) {
                filteredResult = filteredResult.filter(setting => setting.coin === this.searchedCoin.id)
            }
            if (this.selectedGPU) {
                filteredResult = filteredResult.filter(setting => setting.gpu === this.selectedGPU.id)
            }
            this.shownResults = filteredResult
        },
        sortBy (prop) {
            if (!this.shownResults || (Array.isArray(this.shownResults) && !this.shownResults.length)) {
                return
            }
            const results = [ ...this.shownResults ]

            let sortFn = (a, b) => (a[prop] > b[prop]) ? -1 : ((b[prop] > a[prop]) ? 1 : 0)
            if (prop === 'rating') {
                sortFn = (a, b) => {
                    const scoreA = a.upvotes / ((a.upvotes + a.downvotes) || 1)
                    const scoreB = b.upvotes / ((b.upvotes + b.downvotes) || 1)
                    return (scoreA > scoreB) ? -1 : ((scoreB > scoreA) ? 1 : 0)
                }
            } else if (prop === 'popularity') {
                sortFn = (a, b) => {
                    const popA = a.upvotes + a.downvotes
                    const popB = b.upvotes + b.downvotes
                    return (popA > popB) ? -1 : ((popB > popA) ? 1 : 0)
                }
            }
            if (this.sortedProp !== prop || this.sortDir === -1 || this.sortDir === 0) {
                this.shownResults = results.sort(sortFn)
                this.sortDir = 1
            } else if (this.sortDir === 1) {
                this.shownResults = results.sort(sortFn).reverse()
                this.sortDir = -1
            }

            this.sortedProp = prop
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
    box-shadow: none !important;

    .card-title {
        font-size: medium;
    }

    .top-filter {
        display: flex;
        gap: 20px;

        .results-sort {
            flex-shrink: 0;
            flex-grow: 0;
        }

        .results-gpu-select {
            width: 17vw !important;
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
        flex-flow: wrap;
        gap: 10px;
        align-items: stretch;
    }

    .no-results {
        text-align: center;
        margin-top: 3%;
        line-height: 22px;
    }
}

.pagination {
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    background: #eeeeee;
}
</style>