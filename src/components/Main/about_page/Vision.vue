<template>
    <div class="vision-content">
        <div class="image">
            <img src="@/assets/about_page/vision.png" alt="" />
        </div>
        <div class="content">
            <div class="content-header">
                <h2>Our Vision</h2>
            </div>
            <div class="content-body">
                <p>
                    MathWorld will pursue to become a worldwide repository of test questions, projects, open problems and other types of assessment.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.vision-content {
    padding: 0px 5%;
    display: flex;
    column-gap: 45px;
}

.content,
.image {
    flex: 1;
}

.content-body {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.content {
    text-align: right;
}

.image img {
    max-width: 90%;
    padding-left: 30px;
}

.content-header {
    font-size: 1.2em;
    text-align: center;
}

.content-body {
    font-size: 1.2em;
    margin-top: 10px;
    text-align: justify;
    text-justify: inter-word;
}

@media only screen and (max-width: 800px) {
}

@media only screen and (max-width: 450px) {
    .vision-content {
        display: flex;
        flex-direction: column-reverse;
        gap: 20px;
    }

    .content-header h2 {
        font-size: 1.5rem;
    }

    .content-body p {
        font-size: 1rem;
        text-align: center;
    }

    .image img {
        width: 100%;
        margin: auto;
    }
}
</style>
