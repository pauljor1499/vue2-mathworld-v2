<template>
    <div>
        <SimpleLoading :show_loading="teacher_class_store.loading" />
        <SuccessSnackbar :text="success_snackbar.message" v-if="success_snackbar.status" @closeSnackbar="success_snackbar.status = false" />
        <div class="all-classes-content" v-if="teacher_class_store.all_class !== null">
            <div class="content-title">
                <span>All Classes</span>
            </div>
            <div class="content-body">
                <div class="card-actions">
                    <div class="search-bar">
                        <v-text-field
                            v-model="search_class"
                            class="rounded-r-0"
                            placeholder="Enter class name"
                            outlined
                            dense
                            clearable
                            hide-details
                        />
                        <v-btn color="primary" elevation="0" height="40" class="rounded-l-0">
                            <v-icon>mdi-magnify </v-icon>
                        </v-btn>
                    </div>
                    <div class="button-create">
                        <AddNewClass @showSuccessMessage="showSuccessMessage($event)" />
                    </div>
                </div>
                <div class="content-cards" v-if="search_results != ''">
                    <v-card hover class="card" v-for="(item, index) in search_results" :key="index">
                        <div class="card-image">
                            <img src="@/assets/sample1.jpg" alt="card image" />
                        </div>
                        <v-card-title>
                            <span class="text-subtitle-2 font-weight-bold">
                                {{ item.title + " (" + item.section + ")" }}
                            </span>
                        </v-card-title>
                        <v-card-subtitle>
                            <span class="font-weight-bold">
                                {{ item.description }}
                            </span>
                            <br />
                            <span>
                                {{ item.code }}
                            </span>
                            <div class="student-requests">
                                <span> <v-icon color="primary">mdi-account-school </v-icon> {{ get_total_accepted_students(item.students) }} </span>
                                <span> <v-icon color="error">mdi-account-alert </v-icon> {{ get_total_pending_students(item.students) }} </span>
                            </div>
                        </v-card-subtitle>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-hover v-slot="{ hover }">
                                <v-btn
                                    :outlined="hover ? false : true"
                                    :color="hover ? 'primary' : '#A3A3A3'"
                                    right
                                    width="100%"
                                    @click="
                                        $router.push({
                                            name: 'TeacherViewClass',
                                            params: {
                                                class_title: item.uuid,
                                            },
                                        })
                                    "
                                >
                                    View
                                </v-btn>
                            </v-hover>
                        </v-card-actions>
                    </v-card>
                </div>
                <div class="no-class-added" v-else-if="search_results.length === 0 && search_class === null">
                    <img width="40%" src="@/assets/class/no_class.jpg" alt="" />
                    <h4>Create a class to get started</h4>
                </div>
                <div class="no-class-added" v-else-if="search_results.length === 0 && search_class !== null">
                    <img width="20%" src="@/assets/class/no_results.jpg" alt="" />
                    <h4>No results found</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { TeacherClassData } from "@/store/Teacher/TeacherClassData";
import SuccessSnackbar from "@/components/Commons/snackbars/Success.vue";
import SimpleLoading from "@/components/Commons/loadings/SimpleLoading.vue";
import AddNewClass from "./dialogs/AddNewClass.vue";

export default {
    components: {
        SuccessSnackbar,
        AddNewClass,
        SimpleLoading,
    },

    data() {
        return {
            teacher_class_store: TeacherClassData(),
            search_class: null,
            success_snackbar: {
                status: false,
                message: "",
            },
        };
    },

    computed: {
        search_results() {
            var results = [];
            var all_classes = this.teacher_class_store.all_class;
            if (this.search_class === "" || this.search_class === null) {
                return this.sortArrayAscending(all_classes);
            } else {
                all_classes.forEach((element) => {
                    if (JSON.stringify(element.title).toLowerCase().includes(this.search_class.toLowerCase())) {
                        results.push(element);
                    }
                });
                return this.sortArrayAscending(results);
            }
        },
    },

    methods: {
        sortArrayAscending(array) {
            return array.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
        },

        public_snackbar(snackbar) {
            if (snackbar != null) {
                if (snackbar.status) {
                    this.success_snackbar.status = true;
                    this.success_snackbar.message = snackbar.message;
                }
            }
        },

        showSuccessMessage(message) {
            this.success_snackbar.status = true;
            this.success_snackbar.message = message;
        },

        get_total_accepted_students(students) {
            var accepted_students = [];
            students.forEach((student) => {
                if (student.status == "Accepted") {
                    accepted_students.push(student);
                }
            });
            return accepted_students.length;
        },

        get_total_pending_students(students) {
            var pending_students = [];
            students.forEach((student) => {
                if (student.status == "Pending") {
                    pending_students.push(student);
                }
            });
            return pending_students.length;
        },
    },

    created() {
        this.teacher_class_store.get_all_class();
        this.public_snackbar(this.$route.params.public_snackbar);
    },
};
</script>

<style scoped>
.content-title {
    display: flex;
    flex-direction: column;
    padding: 25px 5% 25px 5%;
    background-color: var(--blue-1);
}

.content-title span {
    font-size: 1.5em;
    color: var(--white-1);
}

.content-body {
    padding: 5%;
    margin-bottom: 10%;
}

.card-actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.search-bar {
    width: 40%;
    display: flex;
}

.content-cards {
    margin-top: 5%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.student-requests {
    display: flex;
    justify-content: space-between;
}

.card {
    width: 100%;
}

.card-image img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 5px 5px 0px 0px;
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.card-teacher {
    display: flex;
    gap: 8px;
}

.card-class-name {
    font-size: 1.2em;
    font-weight: bold;
    color: black;
}

.card-teacher img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
}

.no-class-added {
    margin-top: 10%;
    display: flex;
    row-gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

@media only screen and (max-width: 800px) {
    .content-title {
        padding: 5%;
    }

    .content-title span {
        font-size: 1rem;
    }

    .search-bar {
        width: 50%;
        display: flex;
    }

    .content-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }
}

@media only screen and (max-width: 450px) {
    .card-actions {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .search-bar {
        width: 100%;
        display: flex;
    }

    .content-cards {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
    }
}
</style>
