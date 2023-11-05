<template>
    <div class="main-content">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" fab outlined x-small v-bind="attrs" v-on="on" @click="dialog = true">
                    <v-icon dense>mdi-trash-can</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="error" dark>
                    <span>Remove Education Details</span>
                </v-toolbar>
                <v-card-text>
                    <br />
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field label="School" required outlined :value="current_item.school" disabled> </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Degree (Optional)" outlined :value="current_item.course" disabled> </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Area of Study (Optional)" outlined :value="current_item.field" disabled> </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete
                                label="From"
                                :items="['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']"
                                required
                                outlined
                                type="number"
                                :value="current_item.start_year"
                                disabled
                            >
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete
                                label="To (expected year)"
                                :items="['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']"
                                required
                                outlined
                                type="number"
                                :value="current_item.end_year"
                                disabled
                            >
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-card-actions class="justify-end">
                                <v-btn text @click="dialog = false"> Cancel </v-btn>
                                <v-btn color="error" dark @click="removeEducationItem()"> Remove </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        education: Object,
        item_index: Number,
    },

    data: () => ({
        current_item: {
            field: "",
            school: "",
            course: "",
            start_year: "",
            end_year: "",
        },

        dialog: false,
    }),

    methods: {
        getCurrentData() {
            const data = {
                school: this.education.school,
                course: this.education.degree,
                field: this.education.area_of_study,
                start_year: this.education.year_started,
                end_year: this.education.year_ended,
            };

            this.current_item = JSON.parse(JSON.stringify(data));
        },

        removeEducationItem() {
            this.$emit("removeEducation", this.item_index);
            this.dialog = false;
        },
    },

    created() {
        this.getCurrentData();
    },
};
</script>

<style scoped>
.v-btn {
    text-transform: none;
}
</style>
