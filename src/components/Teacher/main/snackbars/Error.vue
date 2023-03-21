<template>
    <div class="main-content">
        <v-snackbar
            class="success-snackbar"
            top
            right
            min-width="200"
            timeout="3000"
            color="red"
            v-model="snackbar"
        >
            <v-icon> mdi-exclamation-thick </v-icon>
            {{ text }}
        </v-snackbar>
    </div>
</template>

<script>
export default {
    props: {
        text: String,
    },

    data: () => ({
        snackbar: true,
    }),

    watch: {
        snackbar() {
            if (this.snackbar == false) {
                this.$emit("closeSnackbar");
            }
        },
    },
};
</script>

<style scoped>
.success-snackbar {
    top: 10%;
}
</style>
