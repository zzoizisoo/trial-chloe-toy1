
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const S3 = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: Meteor.settings.public.S3_ACCESSKEY_ID,
      secretAccessKey:  Meteor.settings.public.S3_SECRET_ACCESS_KEY
    },
  });

export const UploadObject = async (key, body) => { 
    const params = new PutObjectCommand({ 
        Bucket: Meteor.settings.public.S3_BUCKET,
        Key: key,
        Body: body
    })
    try {  
        const result = await S3.send(params);
        console.log("Object creation is successful", result)
        return result;
    }catch (err) { 
        console.error("Error in UploadObject command", err)
        return err
    }
}

export const DeleteObject = async(key) => { 
    const params = { 
        Bucket: Meteor.settings.public.S3_BUCKET,
        Key: key,
    }
    try{ 
        const result = await S3.send(new DeleteObjectCommand(params))
        console.log("Delete Object Success", result)
        return result
    } catch (err){ 
        console.error("Error in DeleteObject command", err)
        return err
    }
}