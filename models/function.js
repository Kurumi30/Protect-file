const fs = require('fs')
const path = require('path')

const date = Date.now()
console.log(date)
// const tempo_de_retencao = 60 * 1000

// Percorrer todos os arquivos na pasta "uploads"
function removeFiles(tempo_de_retencao) {
    fs.readdir('uploads', (err, arquivos) => {
        if (err) throw err
    
        arquivos.forEach(arquivo => {
            const caminho_completo = path.join('uploads', arquivo)
    
            // Obter a data/hora de modificação do arquivo
            fs.stat(caminho_completo, (err, estatisticas) => {
                if (err) throw err
    
                const data_de_modificacao = estatisticas.mtime.getTime()
    
                // Verificar se o arquivo é mais antigo do que o tempo de retenção permitido
                if (date - data_de_modificacao > tempo_de_retencao) {
    
                    // Excluir o arquivo
                    fs.unlink(caminho_completo, (err) => {
                        if (err) throw err;
                        console.log(`Arquivo ${arquivo} excluído`)
                    })
                }
            })
        })
    })    
}

exports.removeFiles = removeFiles
