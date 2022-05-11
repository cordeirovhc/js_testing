const assert = require("assert")
const { error } = require("./constants")
const File = require("./file")

// usamos mocks pra testar diferentes cenários e comportamentos

;
(async () => {
    {
        console.log("starting tests...")
    }
    {
        const filePath = "./../mocks/invalid-emptyFile.csv"
        const result = File.csvToJson(filePath)
        await assert.rejects(result, new Error(error.FILE_LENGTH_ERROR_MESSAGE)) // rejects -> é esperado que result seja (...)
        console.log(`${filePath} OK`)
    }
    {
        const filePath = "./../mocks/invalid-4items.csv"
        const result = File.csvToJson(filePath)
        await assert.rejects(result, new Error(error.FILE_LENGTH_ERROR_MESSAGE))
        console.log(`${filePath} OK`)
    }
    {
        const filePath = "./../mocks/invalid-header.csv"
        const result = File.csvToJson(filePath)
        await assert.rejects(result, new Error(error.FILE_FIELDS_ERROR_MESSAGE))
        console.log(`${filePath} OK`)
    }
    {
        const filePath = "./../mocks/valid-3items.csv"
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "name": "Mongs",
                "id": 123,
                "profession": "Dev",
                "birth": 1997
            },
            {
                "name": "Session",
                "id": 321,
                "profession": "Engineer",
                "birth": 1992
            },
            {
                "name": "Pomba",
                "id": 231,
                "profession": "Engineer",
                "birth": 1994
            }
        ] // https://csvjson.com/csv2json
        await assert.deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
        console.log(`${filePath} OK`)
    }
    {
        console.log("done")
    }
})()