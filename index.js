const fs = require('fs');
const url = require('url')
const http = require('http')
const replaceTemplate = require('./modules/replaceTemplate')



/////////////////////////////////FS MODULE/////////////////////////////////////////////////////////////////////

const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8')
const templateJoke = fs.readFileSync(`${__dirname}/templates/template-joke.html`,'utf-8')
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8')

const data = fs.readFileSync(`${__dirname}/json/joke-data.json`,'utf-8')
const dataObj = JSON.parse(data)



////////////////////////////////////http Module////////////////////////////////////////////////////////////////////

const server = http.createServer((req,res)=>{
    const {query, pathname} = url.parse(req.url, true)

    if (pathname === '/' || pathname === '/overview'){
        res.writeHead(200,{
            'Content-type':'text/html'
        })
        const output = dataObj.map(el => replaceTemplate(templateCard,el)).join("\n")
        res.end(templateOverview.replace(/{%JOKESOVERVIEW%}/g,output))

    }else if(pathname === '/joke'){
        res.writeHead(200,{
            'Content-type':'text/html'
        })
        res.end(replaceTemplate(templateJoke, dataObj[query.id]))
    }else if(pathname === '/api'){
        res.writeHead(200,{
            'Content-type':'application/json'
        })
        res.end(data)
    }else{
        res.writeHead(404,{
            'Content-type':'text/html'
        })
        res.end("<h1>Page Not Found</h1>")
    }
})

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening at port 8000")
})