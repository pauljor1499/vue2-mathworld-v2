<template>
    <div class="informationCon">
        <div class="studentInfoCon">
            <div class="titleCon">Student Information</div>
            <div class="detail">
                <div class="labelCon">Name:</div>
                <div class="valueCon">Juan De La Cruz</div>
            </div>
            <div class="detail">
                <div class="labelCon">ID:</div>
                <div class="valueCon">012819</div>
            </div>
            <div class="detail">
                <div class="labelCon">Grade Level:</div>
                <div class="valueCon">12th</div>
            </div>
            <div class="detail">
                <div class="labelCon">Address:</div>
                <div class="valueCon">123 10th St. McAllen, TX 78501</div>
            </div>
            <div class="detail">
                <div class="labelCon">Tel. Phone No.:</div>
                <div class="valueCon">956.456.998</div>
            </div>
        </div>
        <div class="contactPersonCon">
            <div class="titleCon">Contact Person</div>
            <div class="detail">
                <div class="labelCon">Name:</div>
                <div class="valueCon">Juan Tamad</div>
            </div>
            <div class="detail">
                <div class="labelCon">Relationship:</div>
                <div class="valueCon">Father</div>
            </div>
            <div class="detail">
                <div class="labelCon">Tel. Phone No.:</div>
                <div class="valueCon">956.839.0322</div>
            </div>
            <div class="detail">
                <div class="labelCon">Address</div>
                <div class="valueCon">123 10th St. McAllen, TX 78501</div>
            </div>

            <div class="note">
                To report incorrect information click
                <v-btn text class="linkClick" @click="goToLink">HERE</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({}),
    methods: {
        goToLink() {
            alert("hey");
        },
    },
};
</script>

<style scoped>
.informationCon {
    width: 100%;
    border: 1px solid black;
    padding: 10px 40px;
    padding-bottom: 40px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
}

.titleCon {
    padding: 20px 0px;
    font-size: 16px;
}

.detail {
    display: flex;
    align-items: center;
    padding: 10px 0px;
}

.labelCon {
    text-align: start;
    width: 150px;
}

.valueCon {
    text-align: left;
}

.note {
    padding: 10px 0px;
    text-align: right;
}

.linkClick {
    color: #e76363;
}
</style>
