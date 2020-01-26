const AWS = require('aws-sdk')
const fs = require('fs')

const Polly = new AWS.Polly({
	region: 'ap-south-1'
})

const input = {
	Text: "Hola, Buenas dias.",
	OutputFormat: "mp3",
	VoiceId: "Mia",
	LanguageCode: "es-ES" 
}

Polly.synthesizeSpeech(input, (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	if (data.AudioStream instanceof Buffer) {
		fs.writeFile('hello.mp3', data.AudioStream, (fsErr) => {
			if (fsErr) {
				console.error(fsErr)
				return
			}
			console.log('Success')
		})
	}
})
