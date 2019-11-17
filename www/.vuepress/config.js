module.exports = {
    title: 'back{d}',
    description: 'microservices backend for applications',
    plugins: [
        'code-switcher'
    ],
    evergreen: true,
    configureWebpack: (config, isServer) => {
        if (!isServer && config.mode === 'production') {
            const Storage = require('dom-storage')
            global.localStorage = new Storage(null, { strict: true })
        }
    },
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        logo: '/img/logo.svg',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Documentation', link: '/guide/' },
            { text: 'External', link: 'https://google.com', target: "_blank" }
        ], 
        sidebar: {
            '/guide/': [
                {
                    title: 'Documentation',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        '',
                        'doc-quick-start'
                      ]
                },
                {
                    title: 'Microservices',
                    collapsable: false,
                    children: [
                        'ms-auth',
                        'ms-admin'
                      ]
                },
                {
                    title: 'Platform Installation',
                    collapsable: false,
                    children: [
                        'inst-kubernetes'
                      ]
                }
            ]

        },
        lastUpdated: 'Last Updated',
        repo: 'fernandezvara/backd',
        // repoLabel: 'Contribute!',
        docsRepo: 'backd-io/docs',
        docsDir: 'www',
        docsBranch: 'master',
        editLinks: true,
        nextLinks: true,
        prevLinks: true,
        // editLinkText: 'Want to improve this page?'
        smoothScroll: true
    }
}
