var express = require('express')
var app = express()
var server = require('http').createServer(app); 
var io = require('socket.io')(server)
var date = new Date()
app.use('/assets/custom', express.static((__dirname + '/assets')))
app.use('/assets/bower', express.static((__dirname + '/bower_components')))
app.set('view engine', 'ejs')

app.get('/base/:id', function (req, res) {
    if(req.params.id > 9) {
        res.send('Base Number must be less or equal 9')
    }
    res.render('base', { 
        base: req.params.id
    })
})
app.get('/leaderboard', function(req, res) {
    res.render('leaderboard')
})

var section = Array(6)
for(i=0;i<6;i++) {
    section[i] = new Array(10)
    for(j=0;j<10;j++) {
        section[i][j] = false
    }
}

function successPrint () {
    section.forEach(function (v,k) {
        if(k!=0) {
            console.log('==========> Section: ' + k + " <==========")
            v.forEach(function (a,j) {
                if(j!=0) {
                    console.log('Base: ' + j + " :" + ((a === true) ? 'Success' : 'None'))
                }
            })
            console.log('==========> END Section: ' + k + " <==========")
        }
    })
}

io.on('connection', function(client) {
    console.log("Client Connected: " + client.handshake.address)
    client.on('requireData', function (data) {
        client.emit('returnData', section)
    })
    client.on('successful', function(data) {
        console.log(data)
        section[data.sec][data.base] = true
        console.log(section)
        io.emit('updateData', section)
    })
});
console.log('Server Start @ port 4200')
server.listen(4200);