<template>
    <div id="section3">
        <div class="section3-content">
            <div class="content-title">
                <h1>Drive outcomes through social learning experiences</h1>
            </div>
            <div class="content-description">
                <p>
                    Together, let us explore the wonder of mathematics and let us create a better world for our generation and for the generations to
                    come.
                </p>
            </div>
            <div class="content-details">
                <div class="left-details">
                    <div class="items">
                        <div class="item">
                            <div class="item-image">
                                <img src="@/assets/landing_page/section_3/check.png" alt="" />
                            </div>
                            <div class="item-details">
                                <h4>Personalized user experience</h4>
                                <span>
                                    Adaptive assessments and quizzes that reflect a learner’s performance throughout a course will enable users to
                                    prioritize improvement areas.
                                </span>
                            </div>
                        </div>

                        <div class="item">
                            <div class="item-image">
                                <img src="@/assets/landing_page/section_3/check.png" alt="" />
                            </div>
                            <div class="item-details">
                                <h4>Create intriguing tasks and content</h4>
                                <span> Make the course interesting with creating unique course materials and providing assignments. </span>
                            </div>
                        </div>

                        <div class="item">
                            <div class="item-image">
                                <img src="@/assets/landing_page/section_3/check.png" alt="" />
                            </div>
                            <div class="item-details">
                                <h4>Centralized learning materials</h4>
                                <span> Having a space for different types of learning materials also gives way to blended learning. </span>
                            </div>
                        </div>

                        <div class="item">
                            <div class="item-image">
                                <img src="@/assets/landing_page/section_3/check.png" alt="" />
                            </div>
                            <div class="item-details">
                                <h4>Course management</h4>
                                <span>
                                    Easily deliver course content to learners that makes course creation as simple and straightforward as possible.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right-details">
                    <img src="@/assets/landing_page/section_3/kids.png" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.section3-content {
    background-color: #001632;
    padding: 100px 0px;
    text-align: center;
    color: #ffff;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
}

.content-title {
    width: 50%;
    margin: auto;
}

.content-description {
    width: 50%;
    margin: auto;
}

.content-details {
    width: 90%;
    margin: auto;
    margin-top: 50px;
}

h1 {
    font-size: 2.5em;
    line-height: normal;
}

p {
    font-size: 1.2em;
}

.content-details {
    display: flex;
    justify-content: left;
}

.content-details .left-details,
.right-details {
    flex: 1;
}

.left-details {
    text-align: left;
}

.items {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.item {
    display: flex;
}

.item-details h4 {
    color: #26a1ff;
}

.item-image {
    flex: 0.5;
    width: 40px;
    height: 40px;
}

.item-image img {
    width: 100%;
}

.item-details {
    flex: 6.5;
    margin-left: 20px;
}

.right-details img {
    width: 70%;
}

@media only screen and (max-width: 800px) {
    .content-title,
    .content-description {
        width: 80%;
    }
}

@media only screen and (max-width: 450px) {
    .section3-content {
        padding: 50px 0px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .item-image img {
        width: 80%;
    }

    .content-title h1 {
        font-size: 1.5rem;
    }

    .content-description p {
        font-size: 0.9rem;
    }

    .right-details {
        display: none;
    }

    .item-details h4,
    .item-details span {
        font-size: 0.8rem;
    }
}
</style>
