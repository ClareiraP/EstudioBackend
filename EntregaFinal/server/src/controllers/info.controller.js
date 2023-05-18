const os = require('os');
const process = require('process');



class InfoController {
    async getInfoServer(req, res, next) {
        const info = {
            argumentos_entrada: process.argv.slice(2),
            SO: process.platform,
            version_node: process.version,
            RSS: process.memoryUsage().rss,
            PATH_de_ejecucion: process.execPath,
            PROCESS_ID: process.pid,
            Carpeta_del_proyecto: process.cwd(),
            numero_de_procesadores: os.cpus().length,
        };
        res.render('info', { info });

    }
}

module.exports = InfoController