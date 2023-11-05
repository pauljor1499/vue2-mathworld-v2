<template>
    <div class="password-code-content">
        <v-card width="400">
            <v-card-title>
                <h4>Password successfully changed</h4>
            </v-card-title>
            <v-card-text>
                <p>You successfully changed your password. You can now sign in using your new password.</p>
                <div class="content-icon">
                    <img src="@/assets/password_change_success.jpg" alt="" />
                </div>
                <v-col cols="12">
                    <router-link :to="'/signin'">
                        <span>Back to Sign in</span>
                    </router-link>
                </v-col>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>

<style scoped>
.content-icon {
    display: flex;
    justify-content: center;
    align-items: center;
}

.content-icon img {
    width: 50%;
}
</style>
