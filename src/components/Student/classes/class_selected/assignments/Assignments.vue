<template>
    <div class="assignment-content">
        <YesNoOption v-if="dialog.status" @clickNo="dialog.status = false" @clickYes="clickAnswer()" :dialog_prop="this.dialog" />
        <v-col cols="4">
            <v-select v-model="filter_text" :items="filter" dense filled outlined />
        </v-col>
        <v-col cols="12" class="all-classes">
            <v-card class="card" hover v-for="(item, index) in this.filter_results" :key="index">
                <v-card-text class="card-content">
                    <div class="card-status-new" v-if="item.status === 'New'">NEW</div>
                    <div class="card-status-done" v-else-if="item.status === 'Done'">DONE</div>
                    <div class="card-status-closed" v-else-if="item.status === 'Closed'">CLOSED</div>
                    <div class="card-status-unsubmitted" v-else-if="item.status === 'Unsubmitted'">
                        <span>UNSUB</span>
                    </div>
                    <div class="card-details">
                        <div class="details-title">
                            <span class="title-main">
                                {{ item.title }}
                            </span>
                            <span class="title-sub">
                                {{ item.description }}
                            </span>
                        </div>
                        <br />
                        <div class="card-bottom">
                            <div class="details-due">
                                {{ "Due: " + item.date.close }}
                            </div>
                            <v-hover v-slot="{ hover }">
                                <v-btn :outlined="hover ? false : true" :color="hover ? 'primary' : '#A3A3A3'" @click="showDialog(item.title)">
                                    Answer
                                </v-btn>
                            </v-hover>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </div>
</template>

<script>
import { AllClassesService } from "@/api/Student/classes/ClassesService";
import YesNoOption from "@/components/Commons/popup_dialogs/YesNoOption.vue";

export default {
    components: {
        YesNoOption,
    },

    data() {
        return {
            class_title: "",
            assignment_title: "",
            filter: ["All", "New", "Done", "Closed", "Unsubmitted"],
            filter_text: "All",

            dialog: {
                status: false,
                title: "Answer Assignment",
                message: "",
            },
        };
    },

    computed: {
        filter_results() {
            var arr = [];
            var assignments = this.assignments();
            assignments.forEach((element) => {
                if (element.status === this.filter_text) {
                    arr.push(element);
                }
            });
            if (this.filter_text === "All") {
                return assignments;
            }
            return arr;
        },
    },

    methods: {
        assignments() {
            return AllClassesService.prototype.get_class(this.class_title).assignments;
        },

        showDialog(assignment_title) {
            this.assignment_title = assignment_title;
            this.dialog.status = true;
            this.dialog.message = "Do you want to answer " + assignment_title + "?";
        },

        clickAnswer() {
            this.$router.push({
                name: "StudentViewAssignment",
                params: {
                    classTitle: this.class_title,
                    assignmentTitle: this.assignment_title,
                },
            });
        },
    },

    created() {
        // this.class_title = this.$route.params.class_title;
        this.class_title = "Algebra";
    },
};
</script>

<style scoped>
.assignment-content {
    width: 100%;
}

.all-classes {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.card {
    width: 55%;
}

.card-content {
    width: 100%;
    display: flex;
    gap: 20px;
}

.card-status-new {
    width: 120px;
    height: auto;
    background-color: rgb(173, 255, 200);
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(0, 150, 67);
}

.card-status-done {
    width: 120px;
    height: auto;
    background-color: rgb(183, 223, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(0, 97, 177);
}

.card-status-closed {
    width: 120px;
    height: auto;
    background-color: rgb(255, 183, 183);
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
}

.card-status-unsubmitted {
    width: 120px;
    height: auto;
    background-color: rgb(228, 228, 228);
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(110, 110, 110);
}

.card-details {
    width: 100%;
}

.details-title {
    display: flex;
    flex-direction: column;
}

.title-main {
    font-size: 1.2em;
    font-weight: bold;
    color: black;
}

.card-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
