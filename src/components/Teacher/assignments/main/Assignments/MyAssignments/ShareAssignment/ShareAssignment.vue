<template>
    <div>
        <SuccessSnackbar :text="success_snackbar.message" v-if="success_snackbar.status" @closeSnackbar="success_snackbar.status = false" />
        <v-dialog v-model="dialog" scrollable max-width="300px" persistent>
            <template v-slot:activator="{ on, attrs }">
                <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on" small> Share </v-btn> -->
                <v-list-item dense v-bind="attrs" v-on="on" link>
                    <v-list-item-icon>
                        <v-icon dense>mdi-content-copy</v-icon>
                    </v-list-item-icon>
                    <span> Share </span>
                </v-list-item>
            </template>
            <v-card>
                <v-card-title>Share to</v-card-title>
                <v-divider></v-divider>
                <v-col>
                    <v-text-field placeholder="Search teacher" append-icon="mdi-magnify" hide-details outlined dense> </v-text-field>
                </v-col>
                <v-card-text>
                    <v-checkbox v-model="selected" v-for="(item, index) in teachers" :key="index" hide-details :label="item + ''" :value="item + ''">
                    </v-checkbox>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="dialog = false"> Cancel </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="sendAssignment()"> Send </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import SuccessSnackbar from "@/components/Commons/snackbars/Success.vue";
export default {
    components: {
        SuccessSnackbar,
    },

    data() {
        return {
            dialog: false,
            success_snackbar: {
                status: false,
                message: "",
            },
            selected: [],
            teachers: ["Jose Rizal", "Lebron James", "Shaq"],
        };
    },

    methods: {
        sendAssignment() {
            if (this.selected.length != 0) {
                this.dialog = false;
                this.success_snackbar.message = "Assignment has been sent";
                this.selected = [];
                this.success_snackbar.status = true;
            }
        },
    },
};
</script>
