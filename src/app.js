import scraper from './module/scraper.js'

scraper.exec(2147483647)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
