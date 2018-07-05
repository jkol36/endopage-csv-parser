import * as C from './config'
import { expect } from 'chai'
import fs from 'fs'
import csv from 'csvtojson'


describe('tests', () => {
	it('should convert mst30csvs to json', done => {
		let csvData = {}
		let csvFilePath = './mst30csvs'
		const readDir = Promise.promisify(require('fs').readdir)
		readDir(csvFilePath)
		.each(file => {
			csvData[file] = []
			return csv().fromFile(csvFilePath+'/'+file).subscribe(json => csvData[file].push(json), (err) => Promise.reject(err), () => Promise.resolve())
		})
		.then(() => {
			//keys corresponds to the name of the csv file
			let keys = Object.keys(csvData)
			expect(keys).to.be.an.array
			keys.forEach(k => {
				//json for file
				let data = csvData[k]
				console.log(`data for file ${k}`, data)
				console.log(`--------------end of data for ${k}--------------`)
			})

			done()
		})

	})
	
})