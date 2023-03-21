<template>
    <div class="main-section1">
        <div class="content-body">
            <div class="body-title">
                <span> Dashboard </span>
            </div>
            <v-card elevation="1">
                <div class="widget-item">
                    <div class="item-title">
                        <span>Total Subjects</span>
                    </div>
                    <div class="item-number">
                        <span>7</span>
                    </div>
                </div>
                <v-divider vertical></v-divider>
                <div class="widget-item">
                    <div class="item-title">
                        <span> Total Assignments</span>
                    </div>
                    <div class="item-number">
                        <span>27</span>
                    </div>
                </div>
                <v-divider vertical></v-divider>
                <div class="widget-item">
                    <div class="item-title">
                        <span> Total Events</span>
                    </div>
                    <div class="item-number">
                        <span>13</span>
                    </div>
                </div>
            </v-card>
        </div>
    </div>
</template>

<style scoped>
.main-section1 {
    width: 100%;
    padding: 0px 50px;
}

.content-body {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.body-title span {
    font-size: 1.5em;
}

.v-card {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}

.widget-item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.item-number {
    font-size: 1.5em;
}
</style>
