export default [
    { key: 'n1_words', name: '日语N1词汇',  lang:'日语', wordCount: 3000, 
        importFun: async () => await import('@/assets/wordBooks/n1_words.json') },
    { key: 'n2_words', name: '日语N2词汇',  lang:'日语', wordCount: 2500, 
        importFun: async () => await import('@/assets/wordBooks/n2_words.json')},
    { key: 'n3_words', name: '日语N3词汇',  lang:'日语', wordCount: 1999,
        importFun: async () => await import('@/assets/wordBooks/n3_words.json')},
    { key: 'n4n5_words', name: '日语N4,N5词汇',  lang:'日语', wordCount: 2000, 
        importFun: async () => await import('@/assets/wordBooks/n4n5_words.json')},

]