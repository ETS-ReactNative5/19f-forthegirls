import { ROOT_URL } from './actions'
import axios from 'axios';
import { decode } from 'base64-arraybuffer';

function getSignedRequest(file) {
  const fileName = encodeURIComponent(file.name);
  // hit our own server to get a signed s3 url
  return axios.get(`${ROOT_URL}/sign-s3?file-name=${fileName}&file-type=${file.type}`)
  }

// return a promise that uploads file directly to S3
// note how we return the passed in url here rather than any return value
// since we already know what the url will be - just not that it has been uploaded
function uploadFileToS3(signedRequest, file, url) {
  const base64 = decode(file.base64);
//   console.log("uri")
// //  console.log(file.base64)
//   console.log(file.uri)
//   console.log("here2")
  return new Promise((fulfill, reject) => {
    // console.log("here 3")
    // console.log("base 64")
    //console.log(base64);
    // console.log("content type")
    // console.log(file.type)
    // console.log("signed request")
    // console.log(signedRequest)
    axios.put(signedRequest, base64, { headers: { 'Content-Type': file.type } }).then((response) => {
      // console.log("here 4")
      fulfill(url);
      console.log("here 5")
    }).catch((error) => {
      console.log("here sad")
      console.log(error)
      reject(error);
    });
  });
}

export function uploadImage(file) {
  console.log("EREEE")

  // returns a promise so you can handle error and completion in your component
  return getSignedRequest(file).then((response) => {
    return uploadFileToS3(response.data.signedRequest, file, response.data.url);
  }).catch((error) => {console.log(error)});
}

// if (this.state.file) {
//   uploadImage(this.state.file).then(url => {
//     // use url for content_url and
//     // either run your createPost actionCreator
//     // or your updatePost actionCreator
//   }).catch(error => {
//     //handle error
//   });
// }

//
// const signS3 = (req, res) => {
//   const s3 = new aws.S3({ signatureVersion: 'v4', region: 'us-east-2' });
//   const fileName = req.query['file-name'];
//   const fileType = req.query['file-type'];
//   const s3Params = {
//     Bucket: process.env.S3_BUCKET_NAME,
//     Key: fileName,
//     Expires: 60,
//     ContentType: fileType,
//     ACL: 'public-read',
//   };
//   s3.getSignedUrl('putObject', s3Params, (err, data) => {
//     if (err) { res.status(422).end(); }
//
//     const returnData = {
//       signedRequest: data,
//       url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
//     };
//     return (res.send(JSON.stringify(returnData)));
//   });
// };
//
// export default signS3;
