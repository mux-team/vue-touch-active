<template>
    <div :rl-type="open ? 'stop' : null">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'TouchStop',
    props: {
        open: {
            type: Boolean,
            default: true
        }
    }
};
</script>
