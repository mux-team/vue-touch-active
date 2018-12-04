
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

    // iOS 下 QQ 和微信浏览器快速点击时不会触发点击态 这里把时间改小
    // Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 MQQBrowser/8.4.2 Mobile/15B87 Safari/604.1 MttCustomUA/2 QBWebViewType/1 WKType/1
    // Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E216 MicroMessenger/6.6.7 NetType/WIFI Language/zh_CN
    CONF: {
        START_DELAY: (() => {
            let ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('iphone os') > -1) {
                if (ua.indexOf('mqqbrowser') > -1 || ua.indexOf('micromessenger') > -1) {
                    return 20;
                }
            }
            return 50;
        })(),
        CLICK_KEEP_TIME: 1500,
        START_KEEP_TIME: 2000,
        END_EXTRA_DELAY: 100
    }
}