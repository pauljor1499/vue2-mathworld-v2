<template>
    <v-dialog max-width="450" v-model="dialog" persistent>
        <template>
            <v-card>
                <v-toolbar color="error" dark dense>
                    {{ dialog_prop.title }}
                </v-toolbar>
                <br />
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <div class="dialog-body">
                                <span> {{ dialog_prop.message }} </span>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <br />
                            <v-card-actions class="justify-end">
                                <v-btn text @click="$emit('clickNo')"> No </v-btn>
                                <v-btn color="error" dark @click="$emit('clickYes')"> Yes </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog_prop: Object,
    },

    data() {
        return {
            dialog: true,
        };
    },
};
</script>

<style scoped>
.v-btn {
    text-transform: initial;
}

.dialog-body {
    color: var(--gray-2);
    font-size: 1.2em;
}
</style>
