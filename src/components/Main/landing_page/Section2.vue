<template>
    <div class="section2-content">
        <div class="content-header">
            <div class="content-title">
                <span>Why choose <b style="color: #0091de">MathMatters?</b></span>
            </div>
            <div class="content-description">
                <p>
                    The rise and fall of civilization depends on the level of technological advancement. All technological tools starts with a
                    mathematical idea.
                </p>
            </div>
        </div>
        <div class="grid-items">
            <div class="item">
                <div class="section1">
                    <div class="circle">
                        <img src="@/assets/landing_page/section_2/book-pen.png" alt="" />
                    </div>
                    <h2>Personalized Learning</h2>
                    <p>
                        Customizable exercises and tests centered on students skill set. Taking into account individual students ability and interest
                        makes learning more meaningful.
                    </p>
                </div>
            </div>

            <div class="item">
                <div class="section2">
                    <div class="circle">
                        <img src="@/assets/landing_page/section_2/files.png" alt="" />
                    </div>
                    <h2>Trusted Content</h2>
                    <p>
                        Created with strong collaboration between classroom teachers, parents, students and state tests writers. Thoroughly reviewed
                        and constantly updated.
                    </p>
                </div>
            </div>

            <div class="item">
                <div class="section3">
                    <div class="circle">
                        <img src="@/assets/landing_page/section_2/book-bulb.png" alt="" />
                    </div>
                    <h2>Tools to Empower Teachers</h2>
                    <p>Allign with state standards and college board identified competencies. Designed for college success.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.link {
    text-decoration: none;
    list-style: none;
    text-transform: initial;
}

.section2-content {
    padding: 5%;
}

.content-header {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: auto;
    width: 50%;
}

.content-title {
    display: flex;
    margin: auto;
    text-align: center;
    white-space: nowrap;
}

.content-header span {
    float: left;
    font-size: 2.5em;
}

.content-header p {
    opacity: 50%;
    text-align: center;
    font-size: 1.2em;
}

.grid-items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 50px;
    margin-top: 10%;
}

.grid-items .item {
    text-align: center;
}

.section1,
.section2,
.section3 {
    height: 100%;
    display: inline-block;
    padding: 0px 50px 50px 50px;
    border-radius: 3%;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
}

.section1 .circle,
.section2 .circle,
.section3 .circle {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: auto;
    margin-top: -50px;
    margin-bottom: 25px;

    display: flex;
    justify-content: center;
    align-items: center;
}

h2 {
    line-height: 1;
}

.grid-items .item .section1 {
    border: 3px solid #8cd6ff;
}

.grid-items .item .section1 .circle {
    background: #0073b0;
    border: 6px solid #8cd6ff;
}

.grid-items .item .section1 .circle img {
    width: 50px;
}

.grid-items .item .section1 h2 {
    color: #0073b0;
}

.grid-items .item .section2 {
    border: 3px solid #ffcdcd;
}

.grid-items .item .section2 .circle {
    background: #ff244c;
    border: 6px solid #ffcdcd;
}

.grid-items .item .section2 .circle img {
    width: 50px;
}

.grid-items .item .section2 h2 {
    color: #ff244c;
}

.grid-items .item .section3 {
    border: 3px solid #a6f48a;
}

.grid-items .item .section3 .circle {
    background: #05893a;
    border: 6px solid #a6f48a;
}

.grid-items .item .section3 .circle img {
    width: 50px;
}

.grid-items .item .section3 h2 {
    color: #05893a;
}

.grid-items .item h2 {
    margin-bottom: 20px;
}

.grid-items .item button {
    float: left;
}

@media only screen and (max-width: 800px) {
    .content-header {
        width: 100%;
    }

    .content-title {
        text-align: center;
    }

    .content-title span {
        font-size: 1.8rem;
    }

    .content-description p {
        font-size: 1.2rem;
    }

    .grid-items {
        display: flex;
        flex-direction: column;
        gap: 5rem;
    }
}

@media only screen and (max-width: 450px) {
    .content-header {
        width: 100%;
    }

    .content-title {
        text-align: center;
    }

    .content-title span {
        font-size: 1.3rem;
    }

    .content-description p {
        font-size: 1rem;
    }

    .content-title p {
        font-size: 1rem;
    }

    .grid-items {
        display: flex;
        flex-direction: column;
        gap: 3.5rem;
    }

    .section1,
    .section2,
    .section3 {
        height: 100%;
        display: inline-block;
        padding: 0px 25px 25px 25px;
        border-radius: 3%;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
    }

    .section1 .circle,
    .section2 .circle,
    .section3 .circle {
        border-radius: 50%;
        width: 75px;
        height: 75px;
        margin: auto;
        margin-top: -40px;
        margin-bottom: 15px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .grid-items .item .section1 {
        border: 3px solid #8cd6ff;
    }

    .grid-items .item .section1 .circle {
        background: #0073b0;
        border: 6px solid #8cd6ff;
    }

    .grid-items .item .section1 .circle img {
        width: 35px;
    }

    .grid-items .item .section1 h2 {
        color: #0073b0;
    }

    .grid-items .item .section2 {
        border: 3px solid #ffcdcd;
    }

    .grid-items .item .section2 .circle {
        background: #ff244c;
        border: 6px solid #ffcdcd;
    }

    .grid-items .item .section2 .circle img {
        width: 35px;
    }

    .grid-items .item .section2 h2 {
        color: #ff244c;
    }

    .grid-items .item .section3 {
        border: 3px solid #a6f48a;
    }

    .grid-items .item .section3 .circle {
        background: #05893a;
        border: 6px solid #a6f48a;
    }

    .grid-items .item .section3 .circle img {
        width: 35px;
    }

    .grid-items .item .section3 h2 {
        color: #05893a;
    }

    .grid-items .item h2 {
        margin-bottom: 20px;
    }

    .grid-items .item button {
        float: left;
    }

    .section1 h2,
    .section2 h2,
    .section3 h2 {
        font-size: 1.2rem;
    }

    .section1 p,
    .section2 p,
    .section3 p {
        font-size: 0.9rem;
    }
}
</style>
