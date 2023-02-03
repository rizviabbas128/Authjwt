const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./schema');
const jwt  = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery' , false)
mongoose.connect(`mongodb+srv://Abbas:Abbas@cluster0.8f3vthe.mongodb.net/?retryWrites=true&w=majority`)

app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.post('/api/login', async (req, res) => {
        const user = await User.findOne({ email: req.body.email, password: req.body.password })

        if(user) {
            const token = jwt.sign({
                name: user.name,
                email: user.email,
            }, 'secret123')

            return res.json({status: 'ok' , user: token})
        }else {
            return res.json({status: 'error' , user: false})
        }  
})

app.listen(8000, () => console.log("Server is up at port 8000"));