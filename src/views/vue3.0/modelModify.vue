<template>
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>
</template>

<script>
export default {
    name: 'ModelModify',

    props: {
        modelValue: {
            type: String,
            value: ''
        },

        modelModifiers: {
            default: () => ({})
        }
    },

    emits: ['update:modelValue'],

    created () {
        console.log('modelModify:', this.modelModifiers)
    }

}

</script>