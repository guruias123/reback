import uuid4 from "uuid4"
import PaytmChecksum from "../Utils/PaytmChecksum.js"
import dotenv from "dotenv"
import formidable from "formidable"
import https from "https"
import parse from "query-string"
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');
// app.set('views', __dirname);
// app.use(express.static('./assets'));
// const port = 8080

export const paytm = async (req, res) => {
  let orderId = "Ord_" + Date.now()
  let amount = "20.00"
  let paytmParams = {}
  paytmParams.body = {
    requestType: "Payment",
    mid: process.env.PAYTM_MID,
    websiteName: process.env.PAYTM_WEBSITE,
    orderId: orderId,
    callbackUrl: "http://localhost:3002/callback",
    txnAmount: {
      value: amount,
      currency: "INR",
    },
    userInfo: {
      custId: "CUST_001",
    },
  }
  console.log(paytmParams.body)
  PaytmChecksum.generateSignature(
    JSON.stringify(paytmParams.body),
    process.env.PAYTM_MERCHANT_KEY
  ).then(function (checksum) {
    paytmParams.head = {
      signature: checksum,
    }

    // console.log("con", con)

    var post_data = JSON.stringify(paytmParams)

    var options = {
      /* for Staging */
      hostname: process.env.PAYTM_HOSTNAME,
      port: 443,
      path:
        "/theia/api/v1/initiateTransaction?mid=" +
        process.env.PAYTM_MID +
        "&orderId=" +
        orderId,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": post_data.length,
      },
    }
    //   console.log({options})
    var response = ""
    var post_req = https.request(options, function (post_res) {
      post_res.on("data", function (chunk) {
        response += chunk
      })

      // console.log({post_req})

      post_res.on("end", function () {
        var obj = JSON.parse(response)
        console.log("Response: ", obj)
        // console.log({ obj })
        console.log(obj.head, "hash")
        let data = {
            head: obj.head,
            body :{
            env: process.env.PAYTM_HOSTNAME,
            MID: process.env.PAYTM_MID,
            TXN_AMOUNT: amount,
            WEBSITE: process.env.PAYTM_WEBSITE,
            ORDER_ID: orderId,
            txntoken: obj.body.txnToken,
            // CHECKSUMHASH: obj.head.signature
            }
        }
        //   res.render(__dirname + '/index.html', {data: data});
        res.json(data)
        // console.log("datas", data)
      })
    })
    post_req.write(post_data)
    post_req.end()
    //   console.log(post_req);
  })
}

export const paytmCallback = (req, res) => {
  console.log("from call back", req)
  let body = ""
  req.on("data", chunk => {
    body += chunk.toString()
  })
  req.on("end", () => {
    var postbodyjson = parse(body)
    postbodyjson = JSON.parse(JSON.stringify(postbodyjson))

    var checksum = postbodyjson.CHECKSUMHASH
    delete postbodyjson["CHECKSUMHASH"]

    var verifyChecksum = PaytmChecksum.verifySignature(
      postbodyjson,
      process.env.PAYTM_MERCHANT_KEY,
      checksum
    )
    if (verifyChecksum) {
      //   res.render(__dirname + '/callback.html', {verifySignature:"true",data: postbodyjson});
      return res.json({ success: true, postbodyjson })
    } else {
      res.render(__dirname + "/callback.html", {
        verifySignature: "false",
        data: postbodyjson,
      })
    }
  })
}

export const paytmTransactionStatus = (req, res) => {
  var paytmParams = {}
  /* body parameters */
  paytmParams.body = {
    mid: process.env.PAYTM_MID,
    /* Enter your order id which needs to be check status for */
    orderId: "Your_ORDERId_Here",
  }
  PaytmChecksum.generateSignature(
    JSON.stringify(paytmParams.body),
    process.env.PAYTM_MERCHANT_KEY
  ).then(function (checksum) {
    /* head parameters */
    paytmParams.head = {
      signature: checksum,
    }
    /* prepare JSON string for request */
    var post_data = JSON.stringify(paytmParams)

    var options = {
      hostname: process.env.PAYTM_ENV,
      port: 443,
      path: "/v3/order/status",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": post_data.length,
      },
    }
    var response = ""
    var post_req = https.request(options, function (post_res) {
      post_res.on("data", function (chunk) {
        response += chunk
      })

      post_res.on("end", function () {
        var obj = JSON.parse(response)
        res.render(__dirname + "/txnstatus.html", {
          data: obj.body,
          msg: obj.body.resultInfo.resultMsg,
        })
      })
    })
    post_req.write(post_data)
    post_req.end()
  })
}

// export const paytm = async(req, res) => {
//     // dotenv.config();
//     // console.log("merchant-key", process.env.PAYTM_MERCHANT_KEY);
//     let params = {}
//     const {mobile, email} = req.body;
//     params["MID"] = process.env.PAYTM_MID;
//     params["WEBSITE"] = process.env.PAYTM_WEBSITE;
//     params["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID;
//     params["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID;
//     params["ORDER_ID"] = uuid4();
//     params["CUST_ID"] = "1234";
//     params["TXN_AMOUNT"] = '20';
//     params["CALLBACK_URL"] = 'http://localhost:3001/api/callback';
//     params["EMAIL"] = email;
//     params["MOBILE_NO"] = '7777777777';

//     let paytmChecksum = PaytmChecksum.generateSignature(params, process.env.PAYTM_MERCHANT_KEY);

//     paytmChecksum.then(function(checksum) {
//         // console.log("generateSignature Returns" + checksum);
//         let paytmParams = {
//             ...params,
//             "CHECKSUMHASH": checksum
//         }
//         res.json(paytmParams)
//     }).catch(function(error) {
//         console.log(error);
//     })
// }

// export const paytmCallback = async(req, res) => {
//     const form = new formidable.IncomingForm();
//     form.parse(req, (err, fields, file) => {
//         let paytmChecksum = fields.CHECKSUMHASH;
//         delete fields.CHECKSUMHASH;

//         var isVerifySignature = PaytmChecksum.verifySignature(fields, process.env.PAYTM_MERCHANT_KEY, paytmChecksum);
//         if (isVerifySignature) {
//             console.log("Checksum Matched");
//             let paytmParams = {};
//             paytmParams.body = {
//                 "mid" : fields.MID,
//                 "orderId" : fields.ORDERID,
//             };
//             PaytmChecksum.generateSignature(JSON.stringify(paytmParams), process.env.PAYTM_MERCHANT_KEY).then(function(checksum){
//                 // Hided By Me
//                 // paytmParams.head = {
//                 //     "signature"	: checksum
//                 // };
//                 paytmParams["CHECKSUMHASH"] = checksum;
//                 let post_data = JSON.stringify(paytmParams);
//                 let options = {

//                     /* for Staging */
//                     hostname: 'securegw-stage.paytm.in',

//                     /* for Production */
//                     // hostname: 'securegw.paytm.in',

//                     port: 443,
//                     path: '/v3/order/status',
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Content-Length': post_data.length
//                     }
//                 };

//                 // Set up the request
//                 let response = "";
//                 let post_req = https.request(options, function(post_res) {
//                     post_res.on('data', function (chunk) {
//                         response += chunk;
//                     });

//                     post_res.on('end', function(){
//                         console.log('Response: ', response);
//                         res.json(response)
//                     });
//                 });

//                 // post the data
//                 post_req.write(post_data);
//                 post_req.end();
//             });

//         } else {
//             console.log("Checksum Mismatched");
//         }
//     })
//     // console.log("after callback")
// }
