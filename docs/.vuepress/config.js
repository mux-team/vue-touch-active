module.exports = {
    base: '/vue-touch-active/',
    title: '点击态',
    description: '点击态',
    head: [
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'viewport', content: 'initial-scale=1,maximum-scale=1,user-scalable=no'}]
    ],
    foot: false,
    themeConfig: {
        nav: [
            {text: '首页', link: '/'},
            {text: '文档', link: '/wiki/'},
            {text: 'Github', link: 'https://github.com/mux-team/vue-touch-active'}
        ],
        sidebar: {
            '/wiki/': [
                {
                    title: '概述',
                    collapsable: false,
                    children: [
                        '/wiki/'
                    ]
                },
                {
                    title: '示例',
                    collapsable: false,
                    children: [
                        '/wiki/example/example1',
                        '/wiki/example/example2',
                        '/wiki/example/example3',
                        '/wiki/example/example4'
                    ]
                },
                {
                    title: 'API',
                    collapsable: false,
                    children: [
                        '/wiki/api/',
                        '/wiki/api/methods',
                        '/wiki/api/events'
                    ]
                }
            ]
        }
    }
};
