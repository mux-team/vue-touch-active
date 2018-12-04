import config from './config';

const {
    DEFAULT,
    TYPE,
    ATTR,
    NODE_EVENT,
    MASK_STATE,
    RL_STATE,
    EVT_LIST_DOM,
    EVT_LIST_WIN,
    CONF
} = config;

class ResponsiveLink {
    constructor(options = {}) {
        // 页面或 Element 惯性滚动将要结束时或者 iOS 页面处于橡皮筋拉伸状态时
        // 此时快速点击，会触发 touchstart 事件，但不会触发后续的 touchend 及 click 事件
        // 这里在页面滚动及滚动结束一段时间窗口，禁用了 touchstart 点击态
        this.isScrolling = false;
        this.scrollEndTimer = null;

        // 由于 Element scroll 事件不会冒泡
        // 这里用 touch 事件来处理 Element scroll 的情况 且只考虑横滑
        this.touchData = {};
        this.initEventListener();

        this.opt = Object.assign({}, DEFAULT.OPTIONS, options);
        this.$root = typeof this.opt.root === 'object' ? this.opt.root : document.querySelector(this.opt.root);

        if (!this.$root || this.$root.hasAttribute(ATTR.ROOT)) {
            return;
        }

        this.$root.setAttribute(ATTR.ROOT, '');
        this.$mask = this.createMask();

        const EVT_HANDLER_MAP = {
            touchstart: this.onStart,
            touchmove: this.onMove,
            touchend: this.onEnd,
            touchcancel: this.onCancel,
            click: this.onClick,
            // 从 bfcache 缓存中恢复时 需要关闭点击态
            pageshow: this.onPageShow,
            // 暴露给端关闭点击态的接口，端通过派发事件来关闭点击态，用于解决返回时点击态留存问题
            tf_touchReset: this.onTfReset
        };

        this.domHandler = e => {
            const handler = EVT_HANDLER_MAP[e.type];
            handler && handler.call(this, e);
        };

        this.rlState = RL_STATE.INIT;

        this.startDelay = this.getStartDelay();
    }

    static getLinkProp(node, name) {
        return node.getAttribute(ATTR.LINK_PRE + name);
    }

    static setLinkProp(node, name, value) {
        return node.setAttribute(ATTR.LINK_PRE + name, value);
    }

    initEventListener() {
        window.addEventListener('scroll', e => {
            this.isScrolling = true;
            clearTimeout(this.scrollEndTimer);

            this.scrollEndTimer = setTimeout(() => {
                this.isScrolling = false;
            }, 200);
        }, false);

        document.documentElement.addEventListener('touchstart', e => {
            clearTimeout(this.touchData.timer);
            this.touchData = {};

            const {pageX, pageY} = e.changedTouches[0];
            this.touchData.x0 = pageX;
            this.touchData.y0 = pageY;
        }, false);

        document.documentElement.addEventListener('touchmove', e => {
            const {pageX, pageY} = e.changedTouches[0];

            if (!this.touchData.direction) {
                const {x0, y0} = this.touchData;
                this.touchData.d1 = Math.abs((pageY - y0) / (pageX - x0));
                this.touchData.direction = this.touchData.d1 > 1 ? 'v' : 'h';
            }
        }, false);

        document.documentElement.addEventListener('touchend', e => {
            // 只处理水平滑动
            if (this.touchData.direction === 'h') {
                this.isScrolling = true;
                this.touchData.timer = setTimeout(() => {
                    this.isScrolling = false;
                }, 2500);
            }
        }, false);
    }
    
    getStartDelay() {
        // iOS 下 QQ 和微信浏览器快速点击时不会触发点击态 这里把时间改小
        // Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 MQQBrowser/8.4.2 Mobile/15B87 Safari/604.1 MttCustomUA/2 QBWebViewType/1 WKType/1
        // Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E216 MicroMessenger/6.6.7 NetType/WIFI Language/zh_CN
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf('iphone os') > -1) {
            if (ua.indexOf('mqqbrowser') > -1 || ua.indexOf('micromessenger') > -1) {
                return 20;
            }
        }

        return 50;
    }

    start() {
        if (this.rlState === RL_STATE.INIT || this.rlState === RL_STATE.STOPED) {
            this.bind();
            this.rlState = RL_STATE.STARTED;
        }
    }

    stop() {
        if (this.rlState === RL_STATE.STARTED) {
            this.targetStart = null;
            this.hideMask();
            this.clearTimer();
            this.unbind();
            this.$mask.parentNode && this.$mask.parentNode.removeChild(this.$mask);
            this.maskNode = this.maskState = null;
            this.resNode = this.resType = null;
            this.rlState = RL_STATE.STOPED;
        }
    }

    destroy() {
        if (this.rlState === RL_STATE.DESTROYED) {
            return;
        }
        if (this.rlState === RL_STATE.STARTED) {
            this.stop();
        }
        this.$root && this.$root.removeAttribute(ATTR.ROOT);
        this.$root = this.opt = this.domHandler = null;
        this.$mask = this.$maskInner = null;
        this.rlState = RL_STATE.DESTROYED;
    }

    bind() {
        EVT_LIST_DOM.split(' ').forEach(evt => {
            this.$root.addEventListener(evt, this.domHandler, false);
        });
        EVT_LIST_WIN.split(' ').forEach(evt => {
            window.addEventListener(evt, this.domHandler, false);
        });
    }

    unbind() {
        EVT_LIST_DOM.split(' ').forEach(evt => {
            this.$root.removeEventListener(evt, this.domHandler);
        });
        EVT_LIST_WIN.split(' ').forEach(evt => {
            window.removeEventListener(evt, this.domHandler);
        });
    }

    onPageShow(e) {
        if (e.persisted) {
            this.hideMask();
        }
    }

    onTfReset(e) {
        this.hideMask();
    }

    onStart(e) {
        this.targetStart = e.target;
        if (this.isScrolling) {
            this.isScrolling = false;
            return;
        }

        const resNode = this.getNode(e.target);
        if (!resNode) {
            return;
        }

        this.resNode = resNode;
        this.resType = this.getType(resNode);
        if (this.resType === TYPE.STOP) {
            return;
        }

        clearTimeout(this.timerStart);
        this.timerStart = setTimeout(() => {
            !this.isScrolling && this.showMask(resNode, CONF.START_KEEP_TIME);
        }, this.startDelay);
    }

    onEnd(e) {
        if (this.resType === TYPE.BUTTON) {
            clearTimeout(this.timerEnd);
            this.timerEnd = setTimeout(() => {
                this.hideMask();
            }, this.startDelay + CONF.END_EXTRA_DELAY);
        }
    }

    onMove(e) {
        this.hideMask();
    }

    onCancel(e) {
        this.hideMask();
    }

    onClick(e) {
        const resNode = this.getNode(e.target);
        // android 下点击嵌套 resNode 交界处时小概率会出现 touchstart 与 click e.target 不一致
        // 这里判断 click 时的 target 与 touchstart 时是否一致，不一致时手动修正
        if (this.targetStart && e.target !== this.targetStart) {
            e.stopPropagation();
            e.preventDefault();
            this.targetStart.click();
            this.targetStart = null;
            return;
        }
        this.targetStart = null;

        if (!resNode || this.getType(resNode) !== TYPE.LINK) {
            return;
        }

        this.showMask(resNode, CONF.CLICK_KEEP_TIME);

        const aTag = this.getATag(e.target);
        if (!aTag) {
            setTimeout(() => {
                const linkProps = this.getLinkProps(resNode);
                if (linkProps.href) {
                    const $link = this.createLinkEle(linkProps, resNode);

                    if (e.defaultPrevented) {
                        $link.addEventListener('click', e => {
                            e.preventDefault();
                        }, false);
                    }
                    // 清理旧的 $link 节点
                    if (this.$link && this.$link.parentNode) {
                        this.$link.parentNode.removeChild(this.$link);
                    }
                    // 将 $link 节点 append 到页面中以支持 sf 异步跳转
                    this.$link = $link;
                    this.$root.appendChild(this.$link);
                    $link.click();
                }
            }, 0);
        }
    }

    showMask(node, duration = 1500) {
        if (!node) {
            return;
        }
        // 如果已经显示 需判断是否是同一节点
        if (this.maskState === MASK_STATE.SHOW) {
            if (this.maskNode === node) {
                return;
            }
            this.hideMask(this.maskNode);
        }

        this.maskState = MASK_STATE.SHOW;
        this.maskNode = node;

        clearTimeout(this.timerHide);
        this.timerHide = setTimeout(() => {
            this.hideMask(node);
        }, duration);

        if (!this.dispatch(node, NODE_EVENT.SHOW)) {
            return;
        }

        if (getComputedStyle(node).position === 'static') {
            node.style.position = 'relative';
        }

        this.$mask.style.top = 0;
        this.$mask.style.left = 0;
        this.$mask.style.right = 0;
        this.$mask.style.bottom = 0;
        this.$mask.style.removeProperty('width');
        this.$mask.style.removeProperty('height');

        this.$mask.style.visibility = 'visible';

        const highlightProps = this.getHighlightProps(node);
        const {position, color, radius} = highlightProps;
        const [t, r, b, l] = position.split(',');

        this.$maskInner.style.top = t;
        this.$maskInner.style.left = l;
        this.$maskInner.style.bottom = b;
        this.$maskInner.style.right = r;
        this.$maskInner.style.backgroundColor = color;
        this.$maskInner.style.borderRadius = radius;

        node.appendChild(this.$mask);
    }

    hideMask() {
        if (this.maskState !== MASK_STATE.SHOW || !this.maskNode) {
            return;
        }

        if (this.dispatch(this.maskNode, NODE_EVENT.HIDE)) {
            this.$mask.style.visibility = 'hidden';
        }
        this.maskState = MASK_STATE.HIDE;
    }

    clearTimer() {
        [this.timerStart, this.timerEnd, this.timerHide].forEach(timer => {
            clearTimeout(timer);
        });
        this.timerStart = this.timerEnd = this.timerHide = null;
    }

    dispatch(node, name) {
        const evt = new Event(name, {
            bubbles: true,
            cancelable: true
        });
        return node && node.dispatchEvent(evt);
    }

    isResNode(node) {
        return node && (node.hasAttribute(ATTR.NODE) || node.hasAttribute(ATTR.TYPE));
    }

    getNode(target) {
        let node = target;
        let resNode = null;
        while (node && node !== this.$root.parentNode) {
            if (!resNode && this.isResNode(node)) {
                resNode = node;
            }
            // 考虑实例嵌套的情况 找到最近的 rootNode 如果是 this.$root 则正常返回 否则返回 null
            if (node.hasAttribute(ATTR.ROOT)) {
                if (node === this.$root) {
                    return resNode;
                }
                return null;
            }
            node = node.parentNode;
        }
        return null;
    }

    getType(node) {
        if (!node) {
            return DEFAULT.TYPE;
        }
        return node.getAttribute(ATTR.TYPE) || DEFAULT.TYPE;
    }

    getHighlightProps(node) {
        if (!node) {
            return {};
        }
        let props = {};
        Object.keys(DEFAULT.HIGHLIGHT_CONF).forEach(key => {
            const val = node.getAttribute(ATTR.HIGHLIGHT_PRE + key);
            if (val) {
                props[key] = val;
            }
        });
        return Object.assign({}, DEFAULT.HIGHLIGHT_CONF, props);
    }

    getLinkProps(node) {
        if (!node) {
            return {};
        }
        let props = {};
        const attrs = node.attributes;
        for (let i = 0; i < attrs.length; i++) {
            const {name, value} = attrs[i];

            if (name.indexOf(ATTR.LINK_PRE) === 0) {
                props[name.replace(ATTR.LINK_PRE, '')] = value;
            }
        }
        return props;
    }

    createLinkEle(linkObj) {
        const $link = document.createElement('a');
        Object.keys(linkObj).forEach(key => {
            $link.setAttribute(key, linkObj[key]);
        });
        // 设置为 TYPE.STOP 且不发日志
        $link.setAttribute(ATTR.TYPE, TYPE.STOP);
        $link.setAttribute('data-nolog', '');
        $link.style.display = 'none';
        return $link;
    }

    getATag(target) {
        while (target && target !== this.$root) {
            if (target.nodeName === 'A') {
                return target;
            }
            target = target.parentNode;
        }
        return null;
    }

    createMask() {
        let mask = document.createElement('div');
        mask.style.cssText = `position: absolute; visibility: hidden; z-index: ${this.opt.zIndex};\
            pointer-events: none; background: transparent;`;
        this.$maskInner = this.createMaskInner();
        mask.appendChild(this.$maskInner);
        return mask;
    }

    createMaskInner() {
        let maskInner = document.createElement('div');
        maskInner.style.cssText = 'position: absolute; pointer-events: none;';
        return maskInner;
    }
}

export default ResponsiveLink;
