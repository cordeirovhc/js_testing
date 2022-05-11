const fs = require("fs/promises");
// const path = require("path");
const { error } = require("./constants")
const User = require("./user")

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id", "name", "profession", "age"]
}

class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)

        if (validation.error) throw new Error(validation.message)

        return File.parseCSVtoJSON(content)
    }

    static async getFileContent(filePath) {
        // const normalizedPath = path.join(__dirname, filePath)
        let file = await fs.readFile(filePath) // buffer
        file = file.toString("utf8") // convert to utf8 string
        return file
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const lines = csvString.split("\n")
        const [header, ...content] = lines // header = lines[0]

        const isValidHeader = header === options.fields.join(",")
        if (!isValidHeader) return { error: true, message: error.FILE_FIELDS_ERROR_MESSAGE }

        const hasValidLength = (content.length > 0 && content.length <= options.maxLines)
        if (!hasValidLength) return { error: true, message: error.FILE_LENGTH_ERROR_MESSAGE }

        return { error: false }
    }

    static parseCSVtoJSON(csvString) {
        const lines = csvString.split("\n")
        const header = lines
            .shift() // remove o primeiro item de lines e coloca em firstLine; lines é modificado
            .split(",")

        const users = lines.map(line => {
            const columns = line.split(",")
            const user = {}
            columns.forEach((element, index) => {
                user[header[index]] = element
            });
            return new User(user)
        })

        return users
    }
}

/* (async () => {
    const result = await File.csvToJson("./../mocks/valid-3items.csv")
    // const result = await File.csvToJson("./../mocks/invalid-header.csv")
    // const result = await File.csvToJson("./../mocks/invalid-4items.csv")
    // const result = await File.csvToJson("./../mocks/invalid-emptyFile.csv")
    console.log(result)
})(); */

module.exports = File