<template>
    <div class="subscription-content">
        <div class="content-title">
            <h1 style="color: var(--blue-1)">Subscription Plan</h1>
            <p>
                Embrace the magic of mathematics by subscribing to MathWorld today! Join our community of passionate learners, where you'll discover
                the beauty of numbers, unravel fascinating concepts, and ignite your curiosity for the boundless wonders of the mathematical universe.
            </p>
        </div>
        <br />
        <br />
        <div class="content-options">
            <v-card flat>
                <v-tabs v-model="tab" grow>
                    <v-tab> Monthly </v-tab>
                    <v-tab> Yearly </v-tab>
                </v-tabs>
                <br />
                <br />
                <v-tabs-items v-model="tab">
                    <v-tab-item class="card-item">
                        <v-card hover class="item">
                            <v-card-title>
                                <div class="card-titlte">
                                    <h4>Basic</h4>
                                    <h1 style="color: var(--blue-1)">$9.95</h1>
                                </div>
                            </v-card-title>
                            <v-card-subtitle> Great for starters </v-card-subtitle>
                            <v-card-text>
                                <div class="features">
                                    <div><v-icon color="primary">mdi-check</v-icon> Handle basic option</div>
                                    <div><v-icon color="primary">mdi-check</v-icon> Up to 5 teachers only</div>
                                    <div><v-icon color="primary">mdi-check</v-icon> Only 3 courses per teacher</div>
                                    <div><v-icon color="primary">mdi-check</v-icon> With 5GB of file storage</div>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" width="100%"> SELECT PLAN </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-card hover class="item">
                            <v-card-title>
                                <div class="card-titlte">
                                    <h4>Premium</h4>
                                    <h1 style="color: var(--green-3)">$19.95</h1>
                                </div>
                            </v-card-title>
                            <v-card-subtitle> Great features </v-card-subtitle>
                            <v-card-text>
                                <div class="features">
                                    <div><v-icon color="var(--green-3)">mdi-check</v-icon> Handle advance option</div>
                                    <div><v-icon color="var(--green-3)">mdi-check</v-icon> With 100GB of file storage</div>
                                    <div><v-icon color="var(--green-3)">mdi-check</v-icon> Unlimited courses</div>
                                    <div><v-icon color="var(--green-3)">mdi-check</v-icon> Full Time Access</div>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="var(--green-3)" width="100%" dark> SELECT PLAN </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item class="card-item">
                        <v-card hover class="item">
                            <v-card-title>
                                <div class="card-titlte">
                                    <h4>Basic</h4>
                                    <h1 style="color: var(--blue-1)">$99.95</h1>
                                </div>
                            </v-card-title>
                            <v-card-subtitle> Great for starters </v-card-subtitle>
                            <v-card-text>
                                <div class="features">
                                    <div><v-icon color="primary">mdi-check</v-icon> Handle basic option</div>
                                    <div><v-icon color="primary">mdi-check</v-icon> Up to 5 teachers only</div>
                                    <div><v-icon color="primary">mdi-check</v-icon> Only 3 courses per teacher</div>
                                    <div><v-icon color="primary">mdi-check</v-icon> With 5GB of file storage</div>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" width="100%"> SELECT PLAN </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-card hover class="item">
                            <v-card-title>
                                <div class="card-titlte">
                                    <h4>Premium</h4>
                                    <h1 style="color: var(--green-3)">$199.95</h1>
                                </div>
                            </v-card-title>
                            <v-card-subtitle> Great features </v-card-subtitle>
                            <v-card-text>
                                <div class="features">
                                    <div><v-icon color="var(--green-3)">mdi-check</v-icon> Handle advance option</div>
                                    <div><v-icon color="var(--green-3)">mdi-check</v-icon> With 100GB of file storage</div>
                                    <div><v-icon color="var(--green-3)">mdi-check</v-icon> Unlimited courses</div>
                                    <div><v-icon color="var(--green-3)">mdi-check</v-icon> Full Time Access</div>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="var(--green-3)" width="100%" dark> SELECT PLAN </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tab: 0,
        };
    },
};
</script>

<style scoped>
* {
    text-decoration: none;
    text-transform: none;
}

.subscription-content {
    padding: 0 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.content-title {
    width: 75%;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
}

.card-item {
    padding: 2rem;
    display: flex;
    flex: row;
    gap: 3rem;
}

.item {
    padding: 1rem;
    white-space: nowrap;
}

.card-titlte,
.features {
    display: flex;
    flex-direction: column;
}

@media only screen and (max-width: 800px) {
}

@media only screen and (max-width: 450px) {
    .subscription-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
}
</style>
