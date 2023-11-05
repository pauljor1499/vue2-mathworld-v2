<template>
    <div class="section-4-content">
        <div class="title">
            <span> What do our students <b style="color: #0091de">say about us?</b> </span>
        </div>
        <v-carousel class="carousel-1" height="350" cycle hide-delimiters hide-delimiter-background>
            <v-carousel-item v-for="(item, i) in items" :key="i">
                <div class="content-items">
                    <div class="content-item">
                        <div class="item-header">
                            <div class="header-image">
                                <img :src="item.item1.src" alt="" />
                            </div>
                            <div class="header-details">
                                <div class="name-details">
                                    <h3>{{ item.item1.name }}</h3>
                                </div>
                                <div class="position-details">
                                    <span>{{ item.item1.position }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-body">
                            <p>"{{ item.item1.feedback }}"</p>
                        </div>
                        <div class="item-footer">⭐⭐⭐⭐⭐</div>
                    </div>

                    <div class="content-item">
                        <div class="item-header">
                            <div class="header-image">
                                <img :src="item.item2.src" alt="" />
                            </div>
                            <div class="header-details">
                                <div class="name-details">
                                    <h3>{{ item.item2.name }}</h3>
                                </div>
                                <div class="position-details">
                                    <span>{{ item.item2.position }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-body">
                            <p>"{{ item.item2.feedback }}"</p>
                        </div>
                        <div class="item-footer">⭐⭐⭐⭐⭐</div>
                    </div>

                    <div class="content-item">
                        <div class="item-header">
                            <div class="header-image">
                                <img :src="item.item3.src" alt="" />
                            </div>
                            <div class="header-details">
                                <div class="name-details">
                                    <h3>{{ item.item3.name }}</h3>
                                </div>
                                <div class="position-details">
                                    <span>{{ item.item3.position }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-body">
                            <p>"{{ item.item3.feedback }}"</p>
                        </div>
                        <div class="item-footer">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
            </v-carousel-item>
        </v-carousel>
        <v-carousel height="705" class="carousel-2" cycle hide-delimiters hide-delimiter-background>
            <v-carousel-item v-for="(item, i) in items" :key="i">
                <div class="content-items">
                    <div class="content-item">
                        <div class="item-header">
                            <div class="header-image">
                                <img :src="item.item1.src" alt="" />
                            </div>
                            <div class="header-details">
                                <div class="name-details">
                                    <h3>{{ item.item1.name }}</h3>
                                </div>
                                <div class="position-details">
                                    <span>{{ item.item1.position }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-body">
                            <p>"{{ item.item1.feedback }}"</p>
                        </div>
                        <div class="item-footer">⭐⭐⭐⭐⭐</div>
                    </div>

                    <div class="content-item">
                        <div class="item-header">
                            <div class="header-image">
                                <img :src="item.item2.src" alt="" />
                            </div>
                            <div class="header-details">
                                <div class="name-details">
                                    <h3>{{ item.item2.name }}</h3>
                                </div>
                                <div class="position-details">
                                    <span>{{ item.item2.position }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-body">
                            <p>"{{ item.item2.feedback }}"</p>
                        </div>
                        <div class="item-footer">⭐⭐⭐⭐⭐</div>
                    </div>

                    <div class="content-item">
                        <div class="item-header">
                            <div class="header-image">
                                <img :src="item.item3.src" alt="" />
                            </div>
                            <div class="header-details">
                                <div class="name-details">
                                    <h3>{{ item.item3.name }}</h3>
                                </div>
                                <div class="position-details">
                                    <span>{{ item.item3.position }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-body">
                            <p>"{{ item.item3.feedback }}"</p>
                        </div>
                        <div class="item-footer">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
            </v-carousel-item>
        </v-carousel>
        <v-carousel height="860" class="carousel-3" cycle hide-delimiters hide-delimiter-background>
            <v-carousel-item v-for="(item, i) in items" :key="i">
                <div class="content-items">
                    <div class="content-item">
                        <div class="item-header">
                            <div class="header-image">
                                <img :src="item.item1.src" alt="" />
                            </div>
                            <div class="header-details">
                                <div class="name-details">
                                    <h3>{{ item.item1.name }}</h3>
                                </div>
                                <div class="position-details">
                                    <span>{{ item.item1.position }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-body">
                            <p>"{{ item.item1.feedback }}"</p>
                        </div>
                        <div class="item-footer">⭐⭐⭐⭐⭐</div>
                    </div>

                    <div class="content-item">
                        <div class="item-header">
                            <div class="header-image">
                                <img :src="item.item2.src" alt="" />
                            </div>
                            <div class="header-details">
                                <div class="name-details">
                                    <h3>{{ item.item2.name }}</h3>
                                </div>
                                <div class="position-details">
                                    <span>{{ item.item2.position }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-body">
                            <p>"{{ item.item2.feedback }}"</p>
                        </div>
                        <div class="item-footer">⭐⭐⭐⭐⭐</div>
                    </div>

                    <div class="content-item">
                        <div class="item-header">
                            <div class="header-image">
                                <img :src="item.item3.src" alt="" />
                            </div>
                            <div class="header-details">
                                <div class="name-details">
                                    <h3>{{ item.item3.name }}</h3>
                                </div>
                                <div class="position-details">
                                    <span>{{ item.item3.position }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-body">
                            <p>"{{ item.item3.feedback }}"</p>
                        </div>
                        <div class="item-footer">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
export default {
    components: {},

    data() {
        return {
            items: [
                {
                    item1: {
                        src: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                        feedback:
                            "Thank you for your hard work in supporting my son as they develop. Your patience and commitment to supporting my child has mean a lot to our family.",
                        name: "Mark Williams",
                        position: "Web Designer",
                    },

                    item2: {
                        src: "https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg",
                        feedback:
                            "Thank you for your hard work in supporting my son as they develop. Your patience and commitment to supporting my child has mean a lot to our family.",
                        name: "Harry David",
                        position: "Fullstack Developer",
                    },

                    item3: {
                        src: "https://t4.ftcdn.net/jpg/02/26/67/23/360_F_226672340_FUInCFzn7Yyso0I1KNaekRg2JBqw4XC9.jpg",
                        feedback:
                            "Thank you for your hard work in supporting my son as they develop. Your patience and commitment to supporting my child has mean a lot to our family.",
                        name: "Samatha Jones",
                        position: "DevOps Engineer",
                    },
                },

                {
                    item1: {
                        src: "https://t4.ftcdn.net/jpg/02/26/67/23/360_F_226672340_FUInCFzn7Yyso0I1KNaekRg2JBqw4XC9.jpg",
                        feedback:
                            "Thank you for your hard work in supporting my son as they develop. Your patience and commitment to supporting my child has mean a lot to our family.",
                        name: "Samantha Jones",
                        position: "DevOps Engineer",
                    },

                    item2: {
                        src: "https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg",
                        feedback:
                            "Thank you for your hard work in supporting my son as they develop. Your patience and commitment to supporting my child has mean a lot to our family.",
                        name: "Harry David",
                        position: "DevOps Engineer",
                    },

                    item3: {
                        src: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                        feedback:
                            "Thank you for your hard work in supporting my son as they develop. Your patience and commitment to supporting my child has mean a lot to our family.",
                        name: "Mark Williams",
                        position: "Web Designer",
                    },
                },

                {
                    item1: {
                        src: "https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg",
                        feedback:
                            "Thank you for your hard work in supporting my son as they develop. Your patience and commitment to supporting my child has mean a lot to our family.",
                        name: "Harry David",
                        position: "DevOps Engineer",
                    },

                    item2: {
                        src: "https://t4.ftcdn.net/jpg/02/26/67/23/360_F_226672340_FUInCFzn7Yyso0I1KNaekRg2JBqw4XC9.jpg",
                        feedback:
                            "Thank you for your hard work in supporting my son as they develop. Your patience and commitment to supporting my child has mean a lot to our family.",
                        name: "Samantha Jones",
                        position: "DevOps Engineer",
                    },

                    item3: {
                        src: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                        feedback:
                            "Thank you for your hard work in supporting my son as they develop. Your patience and commitment to supporting my child has mean a lot to our family.",
                        name: "Mark Williams",
                        position: "Web Designer",
                    },
                },
            ],
        };
    },
};
</script>

<style scoped>
.section-4-content {
    padding: 5%;
}

.title {
    display: flex;
}

.title span {
    font-size: 2em;
}

.carousel-1 {
    display: block;
}

.carousel-2,
.carousel-3 {
    display: none;
}

.content-items {
    display: flex;
    align-items: center;
    gap: 2%;
    padding: 5%;
}

.content-items .content-item {
    background-color: #ffff;
    padding: 20px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
}

.item-header {
    display: flex;
}

.header-image {
    width: 50px;
    height: 50px;
}

.header-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.header-details {
    padding-left: 10px;
}

.position-details {
    opacity: 75%;
}

.item-body {
    margin-top: 15px;
    text-align: justify;
    text-justify: inter-word;
}

.item-footer {
    float: right;
}

@media only screen and (max-width: 800px) {
    .title span {
        font-size: 1.8rem;
        margin: auto;
    }

    .carousel-1,
    .carousel-3 {
        display: none;
    }

    .carousel-2 {
        display: block;
    }

    .content-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}

@media only screen and (max-width: 450px) {
    .title span {
        font-size: 1.5rem;
        text-align: center;
        margin: auto;
    }

    .carousel-1,
    .carousel-2 {
        display: none;
    }

    .carousel-3 {
        display: block;
    }

    .content-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
