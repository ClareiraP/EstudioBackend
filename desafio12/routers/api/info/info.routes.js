/* const express = require('express');
const router = express.Router();
const path = require('path')
router.get('/', (req, res) => {
    let data = {
        argv: process.argv.slice(2),
        memory: process.memoryUsage().rss,
        nodeV: process.version,
        processId: process.pid,
        platformName: process.platform,
        dir: process.cwd(),
        path: process.execPath
    }
    res.render(path.join(process.cwd(), 'public/info.ejs'), { data })
})
module.exports = router; */