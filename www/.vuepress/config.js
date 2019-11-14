module.exports = {
    title: 'backd',
    description: 'microservices backend for applications',
    plugins: [
        '@vuepress/active-header-links',
        '@vuepress/last-updated'
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
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
                    sidebarDepth: 2,
                    children: [
                        '',
                        'quick-start',
                        'ms_admin',
                      ]
                }
            ],
            '/installation/': [
                {
                    title: 'Platform Installation',
                    collapsable: false
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
