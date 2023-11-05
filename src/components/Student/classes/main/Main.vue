<template>
    <div class="allclasses-content">
        <SimpleLoading :show_loading="student_class_store.loading" />
        <div class="content-title">
            <span>Classes</span>
        </div>
        <div class="content-body">
            <div class="card-actions">
                <div class="search-bar">
                    <v-text-field
                        v-model="search_class"
                        class="rounded-r-0"
                        style="max-width: 40%"
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
                <AddNewClass />
            </div>
            <br />
            <br />
            <br />
            <br />
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
                    </v-card-subtitle>
                    <v-card-text>
                        <div class="card-teacher">
                            <img :src="item.teacher.profile_picture" alt="Teacher photo" v-if="item.teacher.profile_picture !== null" />
                            <img src="@/assets/blue_round_person.jpg" alt="" v-else />
                            <span>{{ item.teacher.first_name + " " + item.teacher.middle_name + " " + item.teacher.last_name }}</span>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-hover v-slot="{ hover }">
                            <v-btn
                                v-if="item.status !== 'pending'"
                                :outlined="hover ? false : true"
                                :color="hover ? 'primary' : '#A3A3A3'"
                                width="100%"
                                @click="
                                    $router.push({
                                        name: 'StudentClassSelected',
                                        params: { class_title: item.uuid },
                                    })
                                "
                            >
                                View
                            </v-btn>
                            <v-btn v-else outlined color="#A3A3A3" width="100%"> Pending Request </v-btn>
                        </v-hover>
                    </v-card-actions>
                </v-card>
            </div>
            <div class="no-class-added" v-else-if="search_results.length === 0 && search_class === null">
                <img width="40%" src="@/assets/class/no_class.jpg" alt="" />
                <h4>Add a class to get started</h4>
            </div>
            <div class="no-class-added" v-else-if="search_results.length === 0 && search_class !== null">
                <img width="20%" src="@/assets/class/no_results.jpg" alt="" />
                <h4>No results found</h4>
            </div>
        </div>
    </div>
</template>

<script>
import { StudentClassData } from "@/store/Student/StudentClassData";
import SimpleLoading from "@/components/Commons/loadings/SimpleLoading.vue";
import AddNewClass from "./dialogs/AddNewClass.vue";

export default {
    components: {
        AddNewClass,
        SimpleLoading,
    },

    data() {
        return {
            student_class_store: StudentClassData(),
            search_class: null,
        };
    },

    computed: {
        search_results() {
            return this.student_class_store.all_class;
        },
    },

    created() {
        this.student_class_store.get_all_class();
    },
};
</script>

<style scoped>
* {
    text-decoration: none;
    text-transform: none;
}

.allclasses-content {
    width: 100%;
}

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
    width: 100%;
    padding: 5%;
}

.card-actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-bar {
    width: 100%;
    display: flex;
}

.content-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
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

.card-teacher img {
    width: 25px;
    height: 25px;
    object-fit: cover;
    border-radius: 50%;
}

.card-class-name {
    font-size: 1.2em;
    font-weight: bold;
    color: black;
}

.no-class-added {
    width: 100%;
    display: flex;
    row-gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
