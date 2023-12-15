// Streams de Transformação -> Ela serve para transforma um dado em outro.

import { Readable, Writable, Transform, Duplex } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 1000)
  }

}

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable{
  _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()

  }
}

new OneToHundredStream()// A stream de leitura so consegue ler dados dentro dela
  .pipe(new InverseNumberStream()) // Obrigatoriamente precisa ler dados de 
  // algum lugar e escrever dados para outro lugar é uma stream utilizada para 
  // o intermeio, para a comunicação entre duas streams 
  .pipe(new MultiplyByTenStream()) // A stream de escrita só consegue escrever dados

  // Buffer é o modelo que o node usa para transicionar dados/informações entre streams 

  // Duplex pode ter tanto o metodo de leitura quanto de escrita ou seja ela
  // pode fazer qualquer tipo de operação, poderiamos pensar numa stream duplex
  // como sendo um arquivo fisico do nosso sistema, a gente pode tanto ler ele quanto escrever nele
  // mas não necessariamente a gente pode transformar algo dentro dele.