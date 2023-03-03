const express = require('express');
const router = express.Router();
const { fork } = require('child_process');
const path = require('path');


router.get('/randoms', (req, res) => {
    let { cant } = req.query
    cant ? cant : cant = "10000000"
    const randomNums = fork(path.resolve(__dirname, '../../utils/randomNums'))
    randomNums.send(cant);
    randomNums.on('message', (data) => {
        res.json(data)
    })

})

module.exports = router;