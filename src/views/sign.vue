<template comments>
    <div>
        <!-- This is comments -->
        <p>{{message + detail}}</p>
        <el-button type="primary" @click="reset">RESET</el-button>
        <hr>
        <p>{{capitalizeText}}</p>
        <model-modify :modelValue="capitalizeText"></model-modify>
    </div>
</template>

<script>
import ModelModify from './vue3.0/modelModify.vue'

export default {
    name: 'Sign',

    components: {
        ModelModify
    },

    data () {
        return {
            message: 'Danile',

            obj: {
                age: 20,
                class: {
                    No: 1214,
                    city: '北京'
                }
            },

            capitalizeText: ''
        }
    },

    computed: {
        detail () {
            return JSON.stringify(this.obj)
        }
    },

    methods: {
        reset () {
            Object.assign(this.$data, this.$options.data())
            console.log('reset message:', this.message)
        }
    },

    created () {
        console.log(this.message)

        this.message = 'Tom'
        this.obj.class.city = '苏州'

        console.log('updated message: ', this.message)
    }
}
</script>
