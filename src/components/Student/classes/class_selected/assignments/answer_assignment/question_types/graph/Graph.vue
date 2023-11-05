<template>
    <v-card-text class="question-body">
        <div class="question">
            <span style="color: black; font-size: 1.2rem">
                {{ current_question.question }}
            </span>
        </div>
        <br />
        <br />
        <div class="body-answer">
            <div class="expression-list">
                <v-card outlined hover v-for="(item, index) in expressions" :key="index">
                    <v-card-text class="list-item">
                        <div class="item-number">
                            {{ index + 1 }}
                        </div>
                        <div class="item-content">
                            <v-text-field v-model="item.latex" @focus="item_focus(index)" hide-details />
                        </div>
                        <div class="item-actions">
                            <v-btn @click="remove_expression(item.id)" v-if="index != focusItem" icon small>
                                <v-icon> mdi-close </v-icon>
                            </v-btn>
                            <v-btn @click="edit_expression(index, item.latex)" v-if="index == focusItem" icon small>
                                <v-icon> mdi-check </v-icon>
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
                <v-card outlined hover>
                    <v-card-text class="list-item">
                        <div class="item-number">
                            {{ expressions.length + 1 }}
                        </div>
                        <div class="item-content">
                            <v-text-field v-model="inputValue" @focus="item_focus(expressions.length + 1)" @blur="focusItem = null" hide-details />
                        </div>
                        <div class="item-actions">
                            <v-btn @click="add_expression(expressions.length, inputValue)" icon small>
                                <v-icon> mdi-check </v-icon>
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </div>
            <div id="calculator" style="width: 600px; height: 400px"></div>
        </div>
        <br />
        <br />
        <v-card-actions>
            <v-btn text small color="error" @click="remove_answers()"> Remove Answer </v-btn>
        </v-card-actions>
    </v-card-text>
</template>

<script>
import { AnswersService } from "@/api/Student/assignments/AnswersService.js";
import Desmos from "desmos";

export default {
    props: {
        current_question: Object,
        question_number: Number,
    },

    data() {
        return {
            my_answers: AnswersService.prototype.get_answers(),
            calculator: null,
            expressions: [],
            inputValue: null,
            focusItem: null,
        };
    },

    watch: {
        expressions() {
            this.set_answer();
        },
    },

    methods: {
        load_data() {
            const elt = document.getElementById("calculator");
            this.calculator = Desmos.GraphingCalculator(elt, {
                keypad: false,
                settingsMenu: false,
                expressionsTopbar: false,
                decimalToFraction: false,
                sliders: false,
                lockViewport: false,
                expressions: false,
            });
            this.calculator.updateSettings({
                xAxisArrowMode: Desmos.AxisArrowModes.BOTH,
                yAxisArrowMode: Desmos.AxisArrowModes.BOTH,
            });
        },

        set_data() {
            var my_answer = this.my_answers[this.question_number].answer;
            var data_model = [];
            for (var i = 0; i < my_answer.length; i++) {
                var data = {
                    id: i,
                    latex: my_answer[i],
                };
                data_model.push(data);
                this.calculator.setExpression(data);
            }
            this.expressions = JSON.parse(JSON.stringify(data_model));
        },

        edit_expression(index, latex_expression) {
            var data = {
                id: index,
                latex: latex_expression,
            };
            this.calculator.removeExpression({ id: index });
            this.calculator.setExpression(data);
            this.expressions.splice(index, 1, data);
            this.focusItem = null;
            this.inputValue = null;
        },

        add_expression(index, latex_expression) {
            var data = {
                id: index,
                latex: latex_expression,
            };
            this.calculator.setExpression(data);
            this.expressions.push(data);
            this.focusItem = null;
            this.inputValue = null;
        },

        remove_expression(expression_id) {
            var index = this.expressions.findIndex((item) => item.id == expression_id);
            this.expressions.splice(index, 1);
            this.calculator.removeExpression({ id: expression_id });
        },

        item_focus(index) {
            this.focusItem = index;
        },

        set_answer() {
            AnswersService.prototype.set_answer("graph-type", this.question_number, this.expressions);
        },

        remove_answers() {
            this.expressions = [];
        },
    },

    mounted() {
        this.load_data();
        this.set_data();
    },
};
</script>

<style scoped>
.body-answer {
    display: flex;
    column-gap: 5%;
}

.expression-list {
    flex: 1;
    padding: 0 2%;
    height: 400px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
}

.list-item {
    padding: 2%;
    display: flex;
}

.item-number {
    height: 100%;
}

.item-content {
    padding: 10px;
    white-space: nowrap;
}

#calculator {
    flex: 2;
}
</style>
