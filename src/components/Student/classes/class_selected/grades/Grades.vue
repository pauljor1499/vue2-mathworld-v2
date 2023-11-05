<template>
    <div class="grades-content">
        <v-expansion-panels focusable popout>
            <v-expansion-panel v-for="(item, index) in class_grades" :key="index">
                <v-expansion-panel-header expand-icon="mdi-menu-down">
                    <template v-slot:default="{ open }">
                        <span class="item-title" v-if="!open">
                            {{ item.test_title }}
                        </span>
                        <div class="item-subtitle" v-if="!open">
                            <span> {{ item.date_submitted }} </span>
                            <span>
                                {{ "My Grade: " + item.grades[0].my_grade }}
                            </span>
                        </div>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div class="item-content">
                        <span> Class Summary </span>
                        <br />
                        <br />
                        <div class="content-header">
                            <div class="header-top">
                                <div class="student">
                                    <span>
                                        {{
                                            store.current_user.credentials.name.first_name +
                                            " " +
                                            store.current_user.credentials.name.middle_name +
                                            " " +
                                            store.current_user.credentials.name.last_name
                                        }}
                                    </span>
                                    <span>
                                        {{ store.current_user.credentials.school }}
                                    </span>
                                </div>
                                <div class="date">
                                    <span> {{ item.season }} </span>
                                    <span> {{ item.date_submitted }} </span>
                                </div>
                            </div>
                            <div class="header-bottom">
                                <span class="bottom-title">
                                    {{ item.test_title }}
                                </span>
                                <span class="bottom-subtitle">{{ get_class.title }} </span>
                            </div>
                        </div>
                        <br />
                        <v-data-table hide-default-footer :headers="headers" :items="item.grades" item-key="name" class="elevation-1"> </v-data-table>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
import { AllClassesService } from "@/api/Student/classes/ClassesService";
import { storeCurrentUser } from "@/store/CurrentUser";

export default {
    data: () => ({
        store: storeCurrentUser(),

        class_title: "",

        headers: [
            {
                text: "My Grade",
                align: "start",
                sortable: false,
                value: "my_grade",
            },
            {
                text: "Min Grade",
                align: "start",
                sortable: false,
                value: "min_grade",
            },
            {
                text: "First Quartile",
                align: "start",
                sortable: false,
                value: "first_quartile",
            },
            {
                text: "Median Grade",
                align: "start",
                sortable: false,
                value: "median_grade",
            },
            {
                text: "Third Quartile",
                align: "start",
                sortable: false,
                value: "third_quartile",
            },
            {
                text: "Max Grade",
                align: "start",
                sortable: false,
                value: "max_grade",
            },
            {
                text: "Class Average",
                align: "start",
                sortable: false,
                value: "class_average",
            },
            {
                text: "Total Students",
                align: "start",
                sortable: false,
                value: "total_students",
            },
        ],
    }),

    computed: {
        class_grades() {
            return AllClassesService.prototype.get_class(this.class_title).tests;
        },

        get_class() {
            return AllClassesService.prototype.get_class(this.class_title);
        },
    },

    created() {
        // this.class_title = this.$route.params.class_title;
        this.class_title = "Algebra";
    },
};
</script>

<style scoped>
.grades-content {
    padding: 20px;
}

.item-title {
    width: 100%;
    font-size: 0.8rem;
    font-weight: bold;
    flex-wrap: wrap;
}

.item-subtitle {
    width: 100%;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    margin: 0px 5% 0px 15%;
    color: var(--gray-2);
}

.item-content {
    padding: 15px 10px;
}

.content-header {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.header-top {
    display: flex;
    justify-content: space-between;
}

.student,
.date {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
}

.header-bottom {
    display: flex;
    flex-direction: column;
}

.bottom-title {
    font-weight: bold;
}

.bottom-subtitle {
    font-size: 0.9rem;
}
</style>
