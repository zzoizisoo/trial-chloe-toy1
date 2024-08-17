import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '../../imports/ui/App';
import './routes'


export const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: Meteor.settings.public.S3_ACCESSKEY_ID,
    secretAccessKey:  Meteor.settings.public.S3_SECRET_ACCESS_KEY
  },
});

// const s3_start = async () => {
//   const command = new PutObjectCommand({
//     Bucket: Meteor.settings.public.S3_SECRET_ACCESS_KEY,
//     Key: "hello-s3.txt",
//     Body: "Hello S3!",
//   });

//   try {
//     const response = await client.send(command);
//     console.log('s3 response',response);
//   } catch (err) {
//     console.error('s3 error', err);
//   }
// };


Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(<App />);
  s3_start();
});
