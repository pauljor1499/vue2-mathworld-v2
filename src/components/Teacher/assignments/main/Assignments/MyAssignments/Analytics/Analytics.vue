<template>
    <div class="all-classes-content">
        <div class="content-title">
            <span>Assignment Title</span>
        </div>
        <div class="content-body">
            <AreaChart />
        </div>
    </div>
</template>

<script>
import AreaChart from "./AreaChart.vue";

export default {
    components: {
        AreaChart,
    },
};
</script>

<style scoped>
.all-classes-content {
    width: 100%;
}

.content-title {
    display: flex;
    flex-direction: column;
    padding: 25px 5% 25px 5%;
    background-color: var(--blue-1);
}

.content-title span {
    font-size: 1.5em;
    color: var(--white-1);
}

.content-body {
    padding: 5%;
    margin-bottom: 10%;
}
</style>
