<template>
    <div class="values-content">
        <div class="content">
            <div class="content-header">
                <h2>MathWorld Values</h2>
            </div>
            <div class="content-body">
                <p>
                    In MathWorld, we believe that effective learning takes place when a learner answers questions, solve problems, create a project
                    and/or build a product.
                </p>
            </div>
        </div>
        <div class="image">
            <img src="@/assets/about_page/values.png" alt="" />
        </div>
    </div>
</template>
>

<style scoped>
.values-content {
    padding: 0px 5%;
    display: flex;
}

.content,
.image {
    flex: 1;
}

.content {
    text-align: right;
    margin-right: 5%;
}

.image img {
    max-width: 100%;
}

.content-header {
    text-align: center;
    font-size: 1.2em;
}

.content-body p {
    font-size: 1.2em;
    margin-top: 10px;
    text-align: justify;
    text-justify: inter-word;
}

@media only screen and (max-width: 800px) {
}

@media only screen and (max-width: 450px) {
    .values-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .content {
        margin: 0;
    }

    .content-header h2 {
        margin: auto;
        font-size: 1.5rem;
    }

    .content-body p {
        font-size: 1rem;
        text-align: center;
    }

    .image {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .image img {
        width: 90%;
        margin: auto;
    }
}
</style>
