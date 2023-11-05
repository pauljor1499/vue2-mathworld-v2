<template>
    <div class="main-content">
        <MathWorld v-if="assignment_type == 'MW'" />
        <STAAR v-if="assignment_type == 'STAAR'" />
        <TSI v-if="assignment_type == 'TSI'" />
    </div>
</template>

<script>
import MathWorld from "@/components/Teacher/assignments/MathWorld/update_assignment/MainPage.vue";
import STAAR from "@/components/Teacher/assignments/STAAR/update_assignment/MainPage.vue";
import TSI from "@/components/Teacher/assignments/TSI/update_assignment/MainPage.vue";

export default {
    components: {
        MathWorld,
        STAAR,
        TSI,
    },

    data() {
        return {
            assignment_type: "",
        };
    },

    methods: {
        checkAssignmentType() {
            if (this.$route.params.assignment_type == "MW") {
                this.assignment_type = "MW";
            } else if (this.$route.params.assignment_type == "TSI") {
                this.assignment_type = "TSI";
            } else if (this.$route.params.assignment_type == "STAAR") {
                this.assignment_type = "STAAR";
            } else {
                // this.$router
                //     .push({ name: "TeacherNotFound" })
                //     .catch((err) => err);
            }
        },
    },

    created() {
        this.checkAssignmentType();
    },
};
</script>
