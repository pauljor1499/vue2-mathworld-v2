<template>
    <div class="section2-content">
        <AssignmentsGraph />
        <PassingRate />
    </div>
</template>

<script>
import AssignmentsGraph from "./AssignmentsGraph.vue";
import PassingRate from "./PassingRate.vue";
export default {
    components: {
        AssignmentsGraph,
        PassingRate,
    },
};
</script>

<style scoped>
.section2-content {
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: row;
    gap: 20px;
}
</style>
