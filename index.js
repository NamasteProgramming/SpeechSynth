require('dotenv').config()
const AWS = require('aws-sdk')
const fs = require('fs')

const Polly = new AWS.Polly({
	region: 'ap-south-1',
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const input = {
	Text: "Hello, World!, I am a test",
	OutputFormat: "mp3",
	VoiceId: "Kendra",
	LanguageCode: "en-US"
}

Polly.synthesizeSpeech(input, (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	if (data.AudioStream instanceof Buffer) {
		fs.writeFile('synth.mp3', data.AudioStream, (fsErr) => {
			if (fsErr) {
				console.error(fsErr)
				return
			}
			console.log('Success')
		})
	}
})
