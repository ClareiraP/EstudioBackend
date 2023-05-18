const { Router } = require('express')
const InfoController = require('../../controllers/info.controller')
const path = require('path');


const router = Router();

const infoController = new InfoController();

router.get('/', infoController.getInfoServer)

router.get('/infoServer', async (req, res) => {
    res.render(path.resolve(__dirname, '../../views/infoServer.pug'))

})

module.exports = router