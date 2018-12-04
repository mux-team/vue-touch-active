
/**
 * 点击态常量
 *
 * @const
 * @type {Object}
 */
export default {
    DEFAULT: {
        OPTIONS: {
            root: 'body',
            zIndex: 99
        },
        TYPE: 'link',
        HIGHLIGHT_CONF: {
            position: '0,0,0,0',
            color: 'rgba(0, 0, 0, .05)',
            radius: '0'
        }
    },
    // 点击类型
    TYPE: {
        STOP: 'stop',
        LINK: 'link',
        BUTTON: 'button'
    },
    // 属性
    ATTR: {
        ROOT: 'rl-root',
        NODE: 'rl-node',
        TYPE: 'rl-type',
        LINK_PRE: 'rl-link-',
        HIGHLIGHT_PRE: 'rl-highlight-'
    },
    // 隐藏显示
    NODE_EVENT: {
        SHOW: 'rlShow',
        HIDE: 'rlHide'
    },
    // 遮罩显示状态
    MASK_STATE: {
        SHOW: 0,
        HIDE: 1
    },
    // 状态
    RL_STATE: {
        INIT: 0,
        STARTED: 1,
        STOPED: 2,
        DESTROYED: 3
    },
    // 事件
    EVT_LIST_DOM: 'touchstart touchmove touchend touchcancel click',

    EVT_LIST_WIN: 'pageshow tf_touchReset',

    CONF: {
        CLICK_KEEP_TIME: 1500,
        START_KEEP_TIME: 2000,
        END_EXTRA_DELAY: 100
    }
}