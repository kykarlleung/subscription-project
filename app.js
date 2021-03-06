const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// const request = require('request')
const port = 3001;
const https = require('https')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://usX.api.mailchimp.com/3.0/lists/YYYYYYYY"; //replace X and Ys
    const option = {
        method: 'POST',
        auth: '' //put your api key here
    }

    const request = https.request(url, option, (response) => {
        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        }
        else{
            res.sendFile(__dirname + '/failure.html')
        }
        response.on('data', (data) => {
            // console.log(JSON.parse(data))
        })
    })

    // const request = https.request(url, option);
    request.write(jsonData);
    request.end();
})

app.post('/failure', (req, res) => {
    res.redirect('/')
})

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${port}`)
})
