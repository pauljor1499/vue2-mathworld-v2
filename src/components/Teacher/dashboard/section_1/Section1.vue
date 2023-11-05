<template>
    <div class="section1-content">
        <div class="content-cards">
            <v-card
                class="card-item"
                hover
                @click="
                    $router.push({
                        path: 'teacher/all-classes',
                    })
                "
            >
                <v-card-title class="item-title">
                    <div class="item-title-content">
                        <h6>CLASSES</h6>
                        <h1>26</h1>
                    </div>
                    <div class="item-title-icon-1">
                        <v-icon> mdi-star-outline </v-icon>
                    </div>
                </v-card-title>
                <v-card-subtitle class="item-subtitle">
                    <div class="item-subtitle-content">
                        <v-icon color="success" small>mdi-circle </v-icon>
                        15 active
                    </div>
                    <div class="item-subtitle-content">
                        <v-icon small>mdi-circle </v-icon>
                        15 archive
                    </div>
                </v-card-subtitle>
            </v-card>

            <v-card
                class="card-item"
                hover
                @click="
                    $router.push({
                        path: 'teacher/all-classes',
                    })
                "
            >
                <v-card-title class="item-title">
                    <div class="item-title-content">
                        <h6>STUDENTS</h6>
                        <h1>47</h1>
                    </div>
                    <div class="item-title-icon-2">
                        <v-icon> mdi-account-school-outline </v-icon>
                    </div>
                </v-card-title>
                <v-card-subtitle class="item-subtitle">
                    <div class="item-subtitle-content">
                        <v-icon small color="success">mdi-circle </v-icon>
                        27 accepted
                    </div>
                    <div class="item-subtitle-content">
                        <v-icon small color="error">mdi-circle </v-icon>
                        20 pending
                    </div>
                </v-card-subtitle>
            </v-card>

            <v-card
                class="card-item"
                hover
                @click="
                    $router.push({
                        path: 'teacher/gradebook',
                    })
                "
            >
                <v-card-title class="item-title">
                    <div class="item-title-content">
                        <h6>ASSIGNMENTS</h6>
                        <h1>38</h1>
                    </div>
                    <div class="item-title-icon-3">
                        <v-icon> mdi-notebook-outline </v-icon>
                    </div>
                </v-card-title>
                <v-card-subtitle class="item-subtitle">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <div class="item-subtitle-content" v-bind="attrs" v-on="on">
                                <v-icon color="success" small>mdi-circle </v-icon>
                                <span>12</span>
                            </div>
                        </template>
                        <span>New</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <div class="item-subtitle-content" v-bind="attrs" v-on="on">
                                <v-icon color="warning" small>mdi-circle </v-icon>
                                <span>8</span>
                            </div>
                        </template>
                        <span>Undeployed</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <div class="item-subtitle-content" v-bind="attrs" v-on="on">
                                <v-icon color="primary" small>mdi-circle </v-icon>
                                <span>15</span>
                            </div>
                        </template>
                        <span>Open</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <div class="item-subtitle-content" v-bind="attrs" v-on="on">
                                <v-icon color="error" small>mdi-circle </v-icon>
                                <span>15</span>
                            </div>
                        </template>
                        <span>Close</span>
                    </v-tooltip>
                </v-card-subtitle>
            </v-card>
            <v-card class="card-item" hover>
                <v-card-title class="item-title">
                    <div class="item-title-content">
                        <h6>TIME</h6>
                        <h2>{{ time }}</h2>
                    </div>
                    <div class="item-title-icon-4">
                        <v-icon> mdi-clock-outline </v-icon>
                    </div>
                </v-card-title>
                <v-card-subtitle class="item-subtitle"> {{ date }} </v-card-subtitle>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: "",
            time: "",
        };
    },

    methods: {
        updateLiveTime() {
            const now = new Date();
            const hours = String(now.getHours() % 12 || 12).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");
            const ampm = now.getHours() >= 12 ? "PM" : "AM";
            const options = { year: "numeric", month: "long", day: "numeric" };
            const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
            const formattedDate = now.toLocaleDateString(undefined, options);
            this.date = formattedDate;
            this.time = formattedTime;
        },
    },

    created() {
        setInterval(this.updateLiveTime, 1000);
        this.updateLiveTime();
    },
};
</script>

<style scoped>
.section1-content {
    width: 90%;
    margin: auto;
}

.content-cards {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.card-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.item-title {
    display: flex;
    justify-content: space-between;
}

.item-title-content {
    display: flex;
    flex-direction: column;
}

.item-title-icon-1,
.item-title-icon-2,
.item-title-icon-3,
.item-title-icon-4 {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-radius: 0.5rem;
}
.item-title-icon-1 {
    background-color: rgba(122, 195, 255, 0.514);
}
.item-title-icon-2 {
    background-color: rgba(67, 255, 152, 0.507);
}
.item-title-icon-3 {
    background-color: rgba(255, 179, 116, 0.521);
}
.item-title-icon-4 {
    background-color: rgba(255, 146, 222, 0.479);
}

.item-subtitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
