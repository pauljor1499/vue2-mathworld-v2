<template>
    <div class="breadcrumbs-content">
        <v-breadcrumbs :items="items">
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item :to="item.path" :exact="item.exact" :disabled="item.disabled">
                    {{ item.text.toUpperCase() }}
                </v-breadcrumbs-item>
            </template>
        </v-breadcrumbs>
    </div>
</template>

<script>
export default {
    props: {
        items: Array,
    },

    data() {
        return {};
    },
};
</script>

<style scoped>
.breadcrumbs-content {
    padding: 0% 3%;
}
</style>
