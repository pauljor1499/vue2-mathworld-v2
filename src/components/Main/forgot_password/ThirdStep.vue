<template>
    <div class="password-code-content">
        <v-card width="400">
            <v-card-title>
                <h3>Reset Password</h3>
            </v-card-title>
            <v-card-text>
                <p>Please enter your new password</p>
                <v-text-field
                    outlined
                    :append-icon="show_eye1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show_eye1 ? 'text' : 'password'"
                    @click:append="show_eye1 = !show_eye1"
                    placeholder="New password"
                />
                <v-text-field
                    outlined
                    :append-icon="show_eye2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show_eye2 ? 'text' : 'password'"
                    @click:append="show_eye2 = !show_eye2"
                    placeholder="Confirm password"
                />
                <v-btn width="100%" color="primary" @click="clickReset()">Reset password</v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show_eye1: false,
            show_eye2: false,
        };
    },

    methods: {
        clickReset() {
            this.$emit("thirdStepComplete");
        },
    },
};
</script>

<style scoped>
* {
    text-transform: none;
}
</style>
