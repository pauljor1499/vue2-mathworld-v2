<template>
    <div class="assignments-content">
        <SuccessSnackbar
            :text="success_snackbar.message"
            v-if="success_snackbar.status"
            @closeSnackbar="success_snackbar.status = false"
        />
        <div class="content-title">
            <span>Assignments</span>
        </div>
        <div class="assignment-actions">
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        width="350"
                        large
                    >
                        <v-icon left> mdi-plus</v-icon>
                        <span>Create Custom Assignment </span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item link>
                        <v-list-item-content
                            @click="
                                $router.push({
                                    name: 'NewAssignment',
                                    params: {
                                        assignment_type: 'STAAR',
                                    },
                                })
                            "
                        >
                            STAAR Released Test
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-content
                            @click="
                                $router.push({
                                    name: 'NewAssignment',
                                    params: {
                                        assignment_type: 'TSI',
                                    },
                                })
                            "
                        >
                            Texas Success Initiative
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-content
                            @click="
                                $router.push({
                                    name: 'NewAssignment',
                                    params: {
                                        assignment_type: 'MW',
                                    },
                                })
                            "
                        >
                            MathWorld Test
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn color="primary" width="350" large>
                Copy Existing Assignment
            </v-btn>
            <v-btn color="primary" width="350" large>
                Full Released STAAR Test
            </v-btn>
        </div>
    </div>
</template>

<script>
import SuccessSnackbar from "@/components/Teacher/main/snackbars/Success.vue";

export default {
    components: {
        SuccessSnackbar,
    },

    data() {
        return {
            success_snackbar: {
                status: false,
                message: "",
            },
        };
    },

    methods: {
        show_message(snackbar_item) {
            if (snackbar_item != null) {
                if (snackbar_item.type == "success") {
                    this.success_snackbar.status = true;
                    this.success_snackbar.message = snackbar_item.message;
                }
            }
        },
    },

    created() {
        this.show_message(this.$route.params.snackbar_item); //if not empty, show snackbar
    },
};
</script>

<style scoped>
.assignments-content {
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

.assignment-actions {
    padding: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 15px;
    margin: auto;
}
</style>
