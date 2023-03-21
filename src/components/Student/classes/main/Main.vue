<template>
    <div class="allclasses-content">
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
                    <v-btn
                        color="primary"
                        elevation="0"
                        height="40"
                        class="rounded-l-0"
                    >
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
                <v-card
                    hover
                    class="card"
                    v-for="(item, index) in search_results"
                    :key="index"
                >
                    <div class="card-image">
                        <img src="@/assets/sample1.jpg" alt="card image" />
                    </div>
                    <v-card-title>
                        <span class="text-subtitle-2">
                            {{ item.description }}
                        </span>
                    </v-card-title>
                    <v-card-subtitle>
                        <span>
                            {{ item.title + " (" + item.section + ")" }}
                        </span>
                    </v-card-subtitle>
                    <v-card-text>
                        <div class="card-teacher">
                            <img
                                :src="item.class_details.teacher.photo"
                                alt="teacher photo"
                            />
                            <span>{{ item.class_details.teacher.name }}</span>
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
                                        params: { classTitle: item.title },
                                    })
                                "
                            >
                                View
                            </v-btn>
                            <v-btn v-else outlined color="#A3A3A3" width="100%">
                                Pending Request
                            </v-btn>
                        </v-hover>
                    </v-card-actions>
                </v-card>
            </div>
            <div
                class="no-class-added"
                v-else-if="search_results.length === 0 && search_class === null"
            >
                <img width="40%" src="@/assets/class/no_class.jpg" alt="" />
                <h4>Add a class to get started</h4>
            </div>
            <div
                class="no-class-added"
                v-else-if="search_results.length === 0 && search_class !== null"
            >
                <img width="20%" src="@/assets/class/no_results.jpg" alt="" />
                <h4>No results found</h4>
            </div>
        </div>
    </div>
</template>

<script>
import { AllClassesService } from "@/api/Student/classes/ClassesService";
import AddNewClass from "./dialogs/AddNewClass.vue";

export default {
    components: {
        AddNewClass,
    },

    data() {
        return {
            search_class: null,
            all_class: AllClassesService.prototype.get_enrolled_classes(),
        };
    },

    computed: {
        search_results() {
            var results = [];
            var all_classes = this.all_class;
            if (this.search_class === "" || this.search_class === null) {
                return all_classes;
            } else {
                all_classes.forEach((element) => {
                    if (
                        JSON.stringify(element.title)
                            .toLowerCase()
                            .includes(this.search_class.toLowerCase())
                    ) {
                        results.push(element);
                    }
                });
                return results;
            }
        },
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
