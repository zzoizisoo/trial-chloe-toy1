
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const S3 = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: Meteor.settings.public.S3_ACCESSKEY_ID,
        secretAccessKey: Meteor.settings.public.S3_SECRET_ACCESS_KEY
    },
});

/**
* Upload file to aws S3. if successful, it returns file object url of S3
* @returns S3 file url
*/
export const UploadObject = async (key, body) => {
    const params = new PutObjectCommand({
        Bucket: Meteor.settings.public.S3_BUCKET,
        Key: key,
        Body: body
    })
    try {
        const response = await S3.send(params);
        if (response.$metadata.httpStatusCode === 200) {
            return `https://${Meteor.settings.public.S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/${key}`
        }
        else return response;
    } catch (err) {
        console.error("Error in UploadObject command", err)
        return err
    }
}

export const DeleteObject = async (key) => {
    const params = {
        Bucket: Meteor.settings.public.S3_BUCKET,
        Key: key,
    }
    try {
        const response = await S3.send(new DeleteObjectCommand(params))
        console.log("Delete Object Success", response)
        return response
    } catch (err) {
        console.error("Error in DeleteObject command", err)
        return err
    }
}