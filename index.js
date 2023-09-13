const express = require("express");
require("dotenv").config();
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const Port = process.env.PORT || 7000;

app.post("/convert", async (req, res) => {
    const { code, language } = req.body;
    const options = {
        method: "POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        data: {
            model: "gpt-3.5-turbo-0613",
            messages: [{ role: "user", content: `Convert this ${code} into ${language}.Do not explain the code.` }],
            max_tokens: 100,
        }
    }
    try {
        const response = await axios(options)
        const data = response.data
        res.send(data.choices[0].message.content)
    } catch (err) {
        console.log(err)
    }
})

app.post("/debug", async (req, res) => {
    const { code } = req.body;
    const options = {
        method: "POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        data: {
            model: "gpt-3.5-turbo-0613",
            messages: [{ role: "user", content: `Write correct code. Please analyze and debug the following ${code} for errors and provide a detailed explanation of any issues found.` }],
            max_tokens: 100,
        }
    }
    try {
        const response = await axios(options)
        const data = response.data
        console.log(data.choices[0].message.content);
        res.send(data.choices[0].message.content)
    } catch (err) {
        console.log(err)
    }
})

app.post("/checkquality", async (req, res) => {
    const { code, language } = req.body;
    const options = {
        method: "POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        data: {
            model: "gpt-3.5-turbo-0613",
            messages: [{ role: "user", content: `Perform quality check for this ${code} to determine if it is implemented correctly` }],
            max_tokens: 100,
        }
    }
    try {
        const response = await axios(options)
        const data = response.data
        res.send(data.choices[0].message.content)
    } catch (err) {
        console.log(err)
    }
})

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
