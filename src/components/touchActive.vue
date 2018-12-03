<template>
    <div
        :rl-node="open ? '' : null"
        :rl-type="open && !tcUrl ? 'button': null"
        :rl-highlight-position="open ? position : null"
        :rl-highlight-color="open ? backgroundColor : null"
        :rl-highlight-radius="open ? borderRadius : null"
        :rl-highlight-self="open && self ? '' : null"
        :rl-link-href="open ? tcUrl : null"
        @click="$emit('clickLink')"
        class="c-touchable-feedback c-touchable-feedback-no-default"
    >
        <!-- expand 的时候需要保证 expand 占位 div 在 slot 的底层, 需要将 slot 包一层通过 z-index 来实现 -->
        <template v-if="!expand">
            <slot/>
        </template>
        <div v-else class="c-touchable-feedback-content">
            <slot/>
        </div>
        <div
            v-if="open && expand"
            :style="{
                top: cTop,
                right: cRight,
                bottom: cBottom,
                left: cLeft
            }"
            class="c-touchable-feedback-expand"
        />
    </div>
</template>

<script>
export default {
    name: 'touchActive',
    props: {
        open: {
            type: Boolean(),
            default: true
        },
        top: {
            type: Number,
            default: 0
        },
        right: {
            type: Number,
            default: 0
        },
        bottom: {
            type: Number,
            default: 0
        },
        left: {
            type: Number,
            default: 0
        },
        borderRadius: {
            type: String,
            default: '0'
        },
        backgroundColor: {
            type: String,
            default: 'rgba(0, 0, 0, .05)'
        },
        expand: {
            type: Boolean,
            default: false
        },
        self: {
            type: Boolean,
            default: true
        },
        url: {
            type: String,
            default: ''
        },
        urlParams: {
            type: Object,
            default: () => {}
        },
        title: {
            type: String,
            default: ''
        }
    },
    computed: {
        cTop() {
            return this.top + 'px';
        },
        cRight() {
            return this.right + 'px';
        },
        cBottom() {
            return this.bottom + 'px';
        },
        cLeft() {
            return this.left + 'px';
        },
        position() {
            return `${this.top}px,${this.right}px,${this.bottom}px,${this.left}px`;
        },
        tcUrl() {
            return (this.urlParams && this.urlParams.tcUrl) ? this.urlParams.tcUrl : this.url;
        }
    }
};
</script>

<style lang="stylus">
.c-touchable-feedback
    position relative
    user-select none !important

    &-no-default
        -webkit-tap-highlight-color rgba(0, 0, 0, 0) !important
        *
            -webkit-tap-highlight-color rgba(0, 0, 0, 0) !important


    &-expand
        position absolute
        z-index 0

    &-content
        position relative
        z-index 1
        height 100%
</style>
