<template>
    <div class="section2-content">
        <AssignmentsTable />
    </div>
</template>

<script>
import AssignmentsTable from "./AssignmentsTable.vue";
export default {
    components: {
        AssignmentsTable,
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
