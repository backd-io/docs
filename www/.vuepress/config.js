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
            { text: 'Documentation', link: '/docs/' },
            { text: 'External', link: 'https://google.com', target: "_blank" }
        ], 
        sidebar: {
            '/docs': [
                {
                    title: 'Quick Start',
                    collapsable: false
                }
            ]
        },
        lastUpdated: 'Last Updated',
        repo: 'fernandezvara/backd',
        // repoLabel: 'Contribute!',
        docsRepo: 'fernandezvara/backd-docs',
        docsDir: 'www',
        docsBranch: 'master',
        editLinks: true,
        nextLinks: true,
        prevLinks: true,
        // editLinkText: 'Want to improve this page?'
        smoothScroll: true
    }
}
