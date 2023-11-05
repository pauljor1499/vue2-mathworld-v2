<template>
    <div class="section3-content" id="section3">
        <div class="content-header">
            <h1>Test We Provide</h1>
            <br />
            <span>
                We take great pride in the diverse array of tests that we are able to offer to you as our valued client, each specifically designed to
                meet your individual needs and requirements.
            </span>
        </div>
        <div class="item">
            <div class="item-image">
                <img src="https://www.freeiconspng.com/thumbs/star-icon/blue-star-icon-14.png" alt="" />
            </div>
            <div class="item-details">
                <div class="details-title"><b>MathWorld Test</b></div>
                <div class="details-body">
                    A test used in selecting candidates for college admission, formerly called the Scholastic Aptitude Test. It measures critical
                    reading abilities, mathematical reasoning abilities, and writing abilities developed over time through work done in school and
                    alone.
                </div>
            </div>
        </div>

        <div class="item">
            <div class="item-image">
                <img src="https://www.freeiconspng.com/thumbs/star-icon/blue-star-icon-14.png" alt="" />
            </div>
            <div class="item-details">
                <div class="details-title">
                    <b>Scholastic Assessment Test</b>
                </div>
                <div class="details-body">
                    A test used in selecting candidates for college admission, formerly called the Scholastic Aptitude Test. It measures critical
                    reading abilities, mathematical reasoning abilities, and writing abilities developed over time through work done in school and
                    alone.
                </div>
            </div>
        </div>

        <div class="item">
            <div class="item-image">
                <img src="https://www.freeiconspng.com/thumbs/star-icon/blue-star-icon-14.png" alt="" />
            </div>
            <div class="item-details">
                <div class="details-title">
                    <b>American College Test</b>
                </div>
                <div class="details-body">
                    A national standardized test that serves as a measurement of aptitude and critical thinking. Colleges and universities in the
                    United States carefully review exam results when admitting students to schools. ACT scores are an important factor of
                    consideration.
                </div>
            </div>
        </div>

        <div class="item">
            <div class="item-image">
                <img src="https://www.freeiconspng.com/thumbs/star-icon/blue-star-icon-14.png" alt="" />
            </div>
            <div class="item-details">
                <div class="details-title">
                    <b>Texas Success Initiative Assessment</b>
                </div>
                <div class="details-body">
                    <p>
                        The TSI Assessment (TSIA) is part of the Texas Success Initiative enacted by the Texas State Legislature and designed to
                        determine a student’s readiness for college-level coursework in the general areas of reading, writing, and mathematics.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.section3-content {
    margin: auto;
    width: 75%;
    display: flex;
    flex-direction: column;
    row-gap: 50px;
}

.content-header {
    width: 75%;
    margin: auto;
    text-align: center;
    margin-bottom: 50px;
}

.content-header span {
    font-size: 1.2rem;
}

.item {
    display: flex;
    font-size: 1.2em;
    text-justify: inter-word;
}

.item-image {
    max-width: 50px;
    max-height: 50px;
}

.item-image img {
    width: 100%;
}

.item-details {
    padding-left: 20px;
}

.details-body {
    text-align: justify;
    text-justify: inter-word;
}

@media only screen and (max-width: 800px) {
}

@media only screen and (max-width: 450px) {
    .content-header {
        width: 100%;
        margin-bottom: 40px;
    }

    .content-header h1 {
        line-height: 1;
    }

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .details-body {
        text-align: center;
        font-size: 1rem;
    }

    .item-details {
        padding: 0;
    }
}
</style>
