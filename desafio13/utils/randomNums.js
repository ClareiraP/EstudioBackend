const randomNum = (cant) => {
    let numeros = '';
    for (let i = 0; i < cant; i++) {
        numeros += Math.floor((Math.random() * 1000) + 1) + ' ';
    }
    numeros = numeros.trim().split(' ')
    return numeros.reduce((a, d) => (a[d] ? a[d] += 1 : a[d] = 1, a), {})
}

process.on('message', (msg) => {
    const cant = parseInt(msg)
    if (cant !== NaN) process.send(randomNum(cant))
    else process.send(randomNum(100000000))
})