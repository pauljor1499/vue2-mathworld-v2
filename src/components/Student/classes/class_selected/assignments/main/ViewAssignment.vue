<template>
    <div class="view-assignment">
        <AnswerAssignment v-if="get_assignment.status === 'New'" />
        <ReviewAssignment v-else-if="get_assignment.status === 'Done'" />
    </div>
</template>

<script>
import { AssignmentService } from "@/api/Student/assignments/AssignmentService";
import AnswerAssignment from "../answer_assignment/AnswerAssignment.vue";
import ReviewAssignment from "../review_assignment/ReviewAssignment.vue";

export default {
    components: {
        AnswerAssignment,
        ReviewAssignment,
    },

    computed: {
        get_assignment() {
            return AssignmentService.prototype.get_assignment(this.class_title, this.assignment_title);
        },
    },

    methods: {
        set_assignment() {
            AssignmentService.prototype.set_assignment(this.class_title, this.assignment_title);
        },
    },

    created() {
        this.class_title = this.$route.params.classTitle;
        this.assignment_title = this.$route.params.assignmentTitle;
        this.set_assignment();
    },

    // beforeRouteLeave(to, from, next) {
    //     const answer = window.confirm("Do you really want to leave?");
    //     if (answer) {
    //         next();
    //     } else {
    //         next(false);
    //     }
    //     // console.log("click back");
    // },
};
</script>
