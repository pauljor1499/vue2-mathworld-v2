<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" left offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    <v-icon left> mdi-plus </v-icon>
                    New assignment
                </v-btn>
            </template>
            <v-card class="mx-auto">
                <v-list dense>
                    <v-list-group :value="true" no-action>
                        <template v-slot:activator>
                            <!-- <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon> -->
                            <v-list-item-title>Create Custom Assignment</v-list-item-title>
                        </template>
                        <v-list-item link dense>
                            <v-list-item-title
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
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item link dense>
                            <v-list-item-title
                                @click="
                                    $router.push({
                                        name: 'NewAssignment',
                                        params: {
                                            assignment_type: 'TSI',
                                        },
                                    })
                                "
                            >
                                Texas Success Initiative (TSI)
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item link dense>
                            <v-list-item-title
                                @click="
                                    $router.push({
                                        name: 'NewAssignment',
                                        params: {
                                            assignment_type: 'MW',
                                        },
                                    })
                                "
                            >
                                MathWorld Classroom Test
                            </v-list-item-title>
                        </v-list-item>
                    </v-list-group>

                    <v-list-item dense link>
                        <!-- <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon> -->
                        <v-list-item-title>Copy Existing Assignment</v-list-item-title>
                    </v-list-item>

                    <v-list-item dense link>
                        <!-- <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon> -->
                        <v-list-item-title>Full-released STAAR Test</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
export default {
    data: () => ({
        menu: false,
    }),
};
</script>
