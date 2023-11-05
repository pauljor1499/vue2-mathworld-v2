<template>
    <div class="section2-content">
        <Requests />
    </div>
</template>

<script>
import Requests from "./Requests.vue";
export default {
    components: {
        Requests,
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
