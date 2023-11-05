<template>
    <div class="forgot-password-content">
        <FirstStep v-if="step1 === false && step2 === false && step3 === false" @firstStepComplete="firstStepComplete()" />
        <SecondStep v-else-if="step1 === true && step2 === false && step3 === false" @secondStepComplete="secondStepComplete()" />
        <ThirdStep v-else-if="step1 === true && step2 === true && step3 === false" @thirdStepComplete="thirdStepComplete()" />
        <PasswordReset v-else-if="step1 === true && step2 === true && step3 === true" />
    </div>
</template>

<script>
import FirstStep from "./FirstStep.vue";
import SecondStep from "./SecondStep.vue";
import ThirdStep from "./ThirdStep.vue";
import PasswordReset from "./PasswordReset.vue";

export default {
    components: {
        FirstStep,
        SecondStep,
        ThirdStep,
        PasswordReset,
    },

    data() {
        return {
            step1: false,
            step2: false,
            step3: false,
        };
    },

    methods: {
        firstStepComplete() {
            this.step1 = true;
        },

        secondStepComplete() {
            this.step2 = true;
        },

        thirdStepComplete() {
            this.step3 = true;
        },
    },
};
</script>

<style scoped>
* {
    text-transform: none;
}

.forgot-password-content {
    padding: 2% 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.v-card {
    margin: auto;
}
</style>
