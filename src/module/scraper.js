import http from 'http'
import cheerio from 'cheerio'
import request from 'request'

const scraper = (() => {
    
    const exec = (accountNumb) => new Promise ((resolve, reject) => {
        const url = `http://cekrekening.com/cari/nomor/${accountNumb}`
        scrapeNow(url)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })

    return {
        exec
    }
})()

const scrapeNow = (url) => new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
        if (err) {
            reject({
                code: 404,
                message: 'something error'
            })
        }

        const $ = cheerio.load(body)
        const row = $('.row').eq(4)

        const avatarDetail = $('.col-md-1.col-xs-2.avatar', row)
        const detail = $('p', avatarDetail).html()

        const bubble = $('.col-md-11.col-xs-8.bubble', row)

        const detailRek = $('.col-md-2.col-xs-4', bubble)
        const name = $('h3', detailRek).html()
        const bank = $('span', bubble).eq(0).html()
        const status = $('span', bubble).eq(1).html()
        $('br', bubble).remove()
        $('span', bubble).remove()
        const rek = $('p', bubble).html()

        const details = $('.col-md-10.col-xs-8', bubble)
        const postedBy = $('p', details).eq(0).html()
        const description = $('p', details).eq(1).html()
        
        const result = {
            detail,
            name,
            bank,
            status,
            rek,
            postedBy,
            description
        }

        if (res.request.href === url) {
            resolve({
                code: 200,
                message: 'found',
                result: result
            })
        } else {
            reject({
                code: 404,
                message: 'not found'
            })
        }
    })
})

export default scraper