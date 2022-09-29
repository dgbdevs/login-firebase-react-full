import express from 'express'

const app = express();

app.get('/',(req,res)=>{
    res.send('Server')
})
app.get('/callbacks',(req,res)=>{
    res.send('callbacks')
})

app.listen(3000,()=>{
    console.log('server on port 3000')
})
