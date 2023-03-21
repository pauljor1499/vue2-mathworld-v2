<template>
    <div class="gradesCon">
        <div class="headerTitle">Grades</div>
        <div class="panelsCon">
            <v-expansion-panels focusable>
                <v-expansion-panel v-for="(item, i) in 5" :key="i">
                    <v-expansion-panel-header
                        ><div class="panelHeaderCon">
                            <div class="subjectName">Subject {{ item }}</div>
                            <div class="percentageCon">Current: 85%</div>
                        </div></v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                        <v-sheet>
                            <v-sparkline
                                ref="sparkline"
                                :value="value"
                                color="#a5a5a5"
                                stroke-linecap="round"
                                smooth="20"
                                :fill="true"
                                line-width="2"
                                :labels="labels"
                                width="500"
                                height="100"
                                padding="15"
                            >
                            </v-sparkline>
                        </v-sheet>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        labels: ["Fall", "Spring", "Summer 1", "Summer 2", "Winter"],
        value: [30, 40, 35, 40, 30],
    }),
};
</script>

<style scoped>
.gradesCon {
    margin: 20px auto;
    width: 1000px;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
        0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    padding-bottom: 20px;
}

.headerTitle {
    padding: 15px 40px;
    background-color: #0080c5;
    color: white;
    font-size: 18px;
}

.panelHeaderCon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
}

.panelsCon {
    margin: 40px;
}
</style>
