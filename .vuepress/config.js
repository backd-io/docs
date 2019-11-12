module.exports = {
    themeConfig: {
        codeLanguages: {
            php: 'PHP',
            twig: 'Twig',
            // any other code language labels you want to include in code toggles...
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Documentation', link: '/docs/' },
            { text: 'External', link: 'https://google.com', target: "_blank" }
        ],
        sidebar: [
            '/',
            '/page-a',
            ['/page-b', 'Explicit link text']
        ],
        lastUpdated: 'Last Updated',
        repo: 'fernandezvara/backd',
        repoLabel: 'Contribute!',
        docsRepo: 'fernandezvara/backd-docs',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        nextLinks: true,
        prevLinks: true,
        // editLinkText: 'Want to improve this page?'
        smoothScroll: true
    }
}
