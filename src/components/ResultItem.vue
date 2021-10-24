<template>
    <va-card class="result-card" color="#682beb" :bordered="true" square outlined>
        <va-card-title class="result-title">
            <div class="vote-buttons">
                <va-button class="vote-up" :disabled="modifiedResult.votedUpByUser" icon="expand_less" @click="vote(1)" />
                <va-button class="vote-down" :disabled="modifiedResult.votedDownByUser" icon="expand_more" @click="vote(-1)" />
            </div>
            &nbsp;
            <va-chip :color="getRatingColor(getRating(modifiedResult.upvotes, modifiedResult.downvotes))">
                {{ getRating(modifiedResult.upvotes, modifiedResult.downvotes).toFixed(0) }}
            </va-chip>
            <va-divider vertical />
            {{ result.gpuName }}: {{ result.title }}
        </va-card-title>
        <va-card-content>
            <div class="result-description">
                {{ result.description }}
                Core Clock: {{ result.coreClock }}<br>
                Memory Clock: {{ result.memClock }}<br>
                Power Target: {{ result.powerTarget }} %<br>
                Voltage: {{ result.voltage }} V<br>
            </div>
            <div class="result-chips">
                <va-chip class="result-chip" color="primary">{{ (result.efficiency / (1000 * 1000)).toFixed(2) }} Mh/Watt</va-chip>
                <va-chip class="result-chip" color="primary">{{ (result.hashrate / (1000 * 1000)).toFixed(2)}} Mh/s</va-chip>
                <va-chip class="result-chip" color="primary">{{ result.wattage }} W</va-chip>
            </div>
            <div class="result-created-date"><small>{{ createdDate }}</small></div>
            <!--<div class="result-report"><small>Report</small></div>-->
        </va-card-content>
    </va-card>
</template>

<script>
export default {
    props: {
        result: {
            type: Object,
            default: -1
        }
    },
    data () {
        return {
            efficiency: ((this.result.hashrate / (1000 * 1000)) / this.result.wattage).toFixed(2),
            modifiedResult: this.result
        }
    },
    computed: {
        createdDate () {
            const date = new Date(this.result.created)
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}`
        }
    },
    methods: {
        async vote (value) {
            await fetch(`${process.env.VUE_APP_API_URL}/rate`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        id: this.result.id,
                        upvote: value > 0,
                        downvote: value < 0
                    }
                )
            });

            // get setting with new information about vote and score
            const response = await fetch(`${process.env.VUE_APP_API_URL}/settings?id=${this.result.id}`)
            const responseJSON = await response.json()
            this.modifiedResult = responseJSON[0]
        },
        getRating (upvotes, downvotes) {
            return upvotes / ((upvotes + downvotes) || 1) * 100
        },
        getRatingColor (rating) {
            if (rating >= 75) {
                return 'success'
            } else if (rating < 75 && rating >= 50) {
                return 'warning'
            } else if (rating < 50) {
                return 'danger'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.result-card {
    text-align: left;
    min-width: 24.5%;
    max-width: 24.5%;
    border: 1px solid #eeeeee22;
    border-radius: 5px;

    .result-title {
        color: white;
        font-size: large;

        .vote-buttons {
            transform: scale(0.7);
            height: 50px;
            margin-top: -12px;

            button {
                color: white;
                cursor: pointer;
                display: block;
                padding-left: 16%;
                border-radius: 30px;
                font-size: 5pt !important;
            }

            .vote-up {
                border-bottom-right-radius: 0px;
                border-bottom-left-radius: 0px;
            }

            .vote-down {
                border-top-right-radius: 0px;
                border-top-left-radius: 0px;
            }
        }
    }

    .result-description {
        margin-bottom: 10px;
        color: #ffffffee;
        line-height: 17pt;
        font-size: 13pt;
    }

    .result-chip {
        margin: 5px;
    }

    .result-created-date {
        color: #ffffffaa;
        position: absolute;
        bottom: 1%;
        right: 1%;
    }

    .result-report {
        color: #ffffffaa;
        position: absolute;
        bottom: 1%;
        left: 1%;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>