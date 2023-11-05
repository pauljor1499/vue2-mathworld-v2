<template>
    <div class="text-center">
        <v-dialog v-if="show_loading ? (dialog = true) : ''" persistent v-model="dialog" width="250">
            <v-card>
                <v-card-title></v-card-title>
                <v-card-text class="justify-center">
                    <v-progress-circular indeterminate color="primary" />
                    <span style="margin-left: 20px"> Please wait... </span>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        show_loading: Boolean,
    },

    data() {
        return {
            dialog: false,
        };
    },
};
</script>
