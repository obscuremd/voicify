import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const Port = process.env.PORT

app.get('/',(req, res)=>{
    res.send('hello world')
})

app.listen(Port, ()=>{
    console.log(`listening on port ${Port}` )
})