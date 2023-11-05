<template>
    <div class="password-code-content">
        <v-card width="400">
            <v-card-title>
                <h3>Reset code</h3>
            </v-card-title>
            <v-card-text>
                <p>Please enter the 6-digit verification code from <b>teacher@gmail.com </b></p>
                <v-row>
                    <v-col cols="2">
                        <v-text-field outlined placeholder="" type="number" hide-spin-buttons min="0" max="9" />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field outlined placeholder="" type="number" hide-spin-buttons min="0" max="9" />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field outlined placeholder="" type="number" hide-spin-buttons min="0" max="9" />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field outlined placeholder="" type="number" hide-spin-buttons min="0" max="9" />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field outlined placeholder="" type="number" hide-spin-buttons min="0" max="9" />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field outlined placeholder="" type="number" hide-spin-buttons min="0" max="9" />
                    </v-col>
                </v-row>
                <span v-if="countdown !== 0">{{ "Code will expire after: " + this.minutes + ":" + this.seconds }}</span>
                <v-btn text outlined v-else @click="startCountdown()"> Resend code </v-btn>
                <br />
                <br />
                <v-btn width="100%" color="primary" @click="clickReset()">Submit code</v-btn>
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
        return {
            countdown: 0,
            minutes: 0,
            seconds: 0,
        };
    },

    methods: {
        clickReset() {
            this.$emit("secondStepComplete");
        },

        startCountdown() {
            this.countdown = 300; //seconds
            this.countdownInterval = setInterval(() => {
                if (this.countdown > 0) {
                    this.minutes = Math.floor(this.countdown / 60);
                    this.seconds = this.countdown % 60;
                    this.countdown--; // Decrease countdown by 1 every second
                } else {
                    clearInterval(this.countdownInterval); // Stop the countdown when it reaches 0
                }
            }, 1000); // Update the countdown every 1 second (1000 milliseconds)
        },
    },

    mounted() {
        // Start the countdown when the component is mounted
        this.startCountdown();
    },

    beforeDestroy() {
        // Clear the interval when the component is destroyed to prevent memory leaks
        clearInterval(this.countdownInterval);
    },
};
</script>

<style scoped>
* {
    text-transform: none;
}
</style>
