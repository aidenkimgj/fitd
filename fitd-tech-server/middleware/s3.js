import dotenv from 'dotenv'
import aws from 'aws-sdk'

dotenv.config();

const { AWS_KEY, AWS_PRIVATE_KEY, S3_BUCKET1, S3_BUCKET2 } = process.env;

const region = "us-west-1"
const accessKeyId = AWS_KEY
const secretAccessKey = AWS_PRIVATE_KEY

const s3 = new aws.S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: 'v4'
})

export async function generateUploadURL(filename) {
	const configureFile = filename.split('-');
	const type = configureFile[0];

	const params = ({
		Bucket: type === 'content' ? S3_BUCKET1 : S3_BUCKET2,
		Key: filename,
		Expires: 60
	})

	const uploadURL = await s3.getSignedUrlPromise('putObject', params)
	return uploadURL
}