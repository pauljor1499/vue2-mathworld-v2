<template>
    <div class="classperiods-content">
        <div class="content-card">
            <v-card>
                <v-card-title>
                    <v-col cols="12">
                        <v-text-field v-model="search" label="Search" append-icon="mdi-magnify" single-line hide-details outlined dense />
                    </v-col>
                </v-card-title>
                <br />
                <v-card-text>
                    <v-data-table :headers="get_headers" :items="get_records" sort-by="lastname" :search="search" hide-default-footer>
                        <template v-slot:[`item.number`]="{ index }">
                            <span> {{ index + 1 }} </span>
                        </template>
                        <template v-slot:[`item.average`]="data">
                            <span style="color: gray" v-if="data.item.average == 0">
                                {{ data.item.average }}
                            </span>
                            <span style="color: red" v-else-if="data.item.average < 70">
                                {{ data.item.average }}
                            </span>
                            <span style="color: green" v-if="data.item.average >= 70">
                                {{ data.item.average }}
                            </span>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { ClassPeriodsService } from "@/api/Teacher/gradebook/class_periods/ClassPeriodsService";

export default {
    data() {
        return {
            search: "",
        };
    },

    computed: {
        get_records() {
            return ClassPeriodsService.prototype.get_records();
        },

        get_headers() {
            return ClassPeriodsService.prototype.get_headers();
        },
    },

    methods: {
        get_average(data) {
            var total = 0;
            var counter = 0;
            Object.keys(data).forEach((key) => {
                if (key !== "id" && key !== "firstname" && key !== "middlename" && key !== "lastname") {
                    total += data[key];
                    counter++;
                }
            });
            return (total / counter).toFixed(2);
        },

        modify_text(title) {
            if (JSON.stringify(title.length) > 10) {
                var result = title.substring(0, 10);
                return result + "...";
            }
            return title;
        },
    },

    beforeCreate() {
        ClassPeriodsService.prototype.get_class(this.$route.params.class_title);
    },
};
</script>

<style scoped>
.v-text-field {
    width: 40%;
}

.content-card {
    padding: 1%;
}

@media only screen and (max-width: 800px) {
    .v-text-field {
        width: 50%;
    }
}

@media only screen and (max-width: 450px) {
    .v-text-field {
        width: 100%;
    }
}
</style>
