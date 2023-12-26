import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

console.log(databasePath)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8').then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))

  }

  select(table) {
    const data = this.#database[table] ?? []
 
    return data
  }

  insert(tabela, data) {
    if (Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist();

    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    // Percorre cada um dos registros(cada item que tem dentro do array), 
    // procurando se existe um usuario que tenha o id igual ao id que eu estou
    // busacando, se existir ele irá me informar qual o indice dessa informação
    
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}