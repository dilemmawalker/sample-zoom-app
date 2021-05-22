// import { ZoomMtg } from '@zoomus/websdk';

window.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');
  websdkready();
});

function websdkready() {
  var testTool = window.testTool;
  // get meeting args from url
  var tmpArgs = testTool.parseQuery();
  var meetingConfig = {
    apiKey: tmpArgs.apiKey,
    meetingNumber: tmpArgs.mn,
    userName: (function () {
      if (tmpArgs.name) {
        try {
          return testTool.b64DecodeUnicode(tmpArgs.name);
        } catch (e) {
          return tmpArgs.name;
        }
      }
      return (
        "CDN#" +
        tmpArgs.version +
        "#" +
        testTool.detectOS() +
        "#" +
        testTool.getBrowserInfo()
      );
    })(),
    passWord: tmpArgs.pwd,
    leaveUrl: "/index.html",
    role: parseInt(tmpArgs.role, 10),
    userEmail: (function () {
      try {
        return testTool.b64DecodeUnicode(tmpArgs.email);
      } catch (e) {
        return tmpArgs.email;
      }
    })(),
    lang: tmpArgs.lang,
    signature: tmpArgs.signature || "",
    china: tmpArgs.china === "1",
  };

  // a tool use debug mobile device
  if (testTool.isMobileDevice()) {
    vConsole = new VConsole();
  }
  console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));







  //  testing is here // *****************************************

  // if(ZoomSDK.getInstance().isInitialized()) {
  //   mAccoutnService = ZoomSDK.getInstance().getAccountService();
  
  //   if(mAccoutnService == null) {
  //     finish();
  //   }
  // }
  //****************************************************************







  // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
  // ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.1/lib", "/av"); // CDN version defaul
  if (meetingConfig.china)
    ZoomMtg.setZoomJSLib("https://jssdk.zoomus.cn/1.9.1/lib", "/av"); // china cdn option
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();
  function beginJoin(signature) {
    ZoomMtg.init({
      leaveUrl: meetingConfig.leaveUrl,
      webEndpoint: meetingConfig.webEndpoint,
      success: function () {
        console.log(meetingConfig);
        console.log("signature", signature);
        ZoomMtg.i18n.load(meetingConfig.lang);
        ZoomMtg.i18n.reload(meetingConfig.lang);
        ZoomMtg.join({
          meetingNumber: meetingConfig.meetingNumber,
          userName: meetingConfig.userName,
          signature: signature,
          apiKey: meetingConfig.apiKey,
          userEmail: meetingConfig.userEmail,
          passWord: meetingConfig.passWord,
          success: function (res) {
            console.log("join meeting success");
            console.log("get attendeelist");
            ZoomMtg.getAttendeeslist({});
            ZoomMtg.getCurrentUser({
              success: function (res) {
                console.log("success getCurrentUser", res.result.currentUser);
              },
            });
          },
          error: function (res) {
            console.log(res);
          },
        });
      },
      error: function (res) {
        console.log(res);
      },
    });

    ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
      console.log('inMeetingServiceListener onUserJoin', data);
    });
  
    ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
      console.log('inMeetingServiceListener onUserLeave', data);
    });
  
    ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
      console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
    });
  
    ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
      console.log('inMeetingServiceListener onMeetingStatus', data);
    });
  }

  //Make Zoom API call
var options = {
  uri: 'https://api.zoom.us/v2/users',
  qs: {
      status: 'active' // -> uri + '?status=active'
  },
  auth: {
    //Provide your token here
      'bearer': eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImhyVWlSR0lOU2xTYkQzLTlPaXZwNkEiLCJleHAiOjE2MjIyOTUyNjMsImlhdCI6MTYyMTY5MDQ2NH0.rA6s1Uguj0SUsLKvUwc3tLBG9yyQhW6ulWgHRGCd1Ns
  },
  headers: {
      'User-Agent': 'Zoom-Jwt-Request',
      'content-type': 'application/json'
  },
  json: true // Automatically parses the JSON string in the response
};

rp(options)
  .then(function (response) {
    //logic for your response
      console.log('User has', response);
  })
  .catch(function (err) {
      // API call failed...
      console.log('API call failed, reason ', err);
  });


const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImhyVWlSR0lOU2xTYkQzLTlPaXZwNkEiLCJleHAiOjE2MjIyOTUyNjMsImlhdCI6MTYyMTY5MDQ2NH0.rA6s1Uguj0SUsLKvUwc3tLBG9yyQhW6ulWgHRGCd1Ns"
  });
  var aaa=6689101814;
   function createPoll() {
    return request({
      url: "/users/${aaa}/meetings?userId="+aaa ,
      method: "POST",
      
      body: {
        "topic": "string",
        "type": 2,
        "start_time": "2021-05-23T07:00:00Z",
        "duration": 30,
        "schedule_for": "yashhanda500@gmail.com",
        "timezone": "Asia/Calcutta",
        "password": "5pSzzS",
        "agenda": "string",
       
        
      },
    });
  }
  createPoll();

  // beginJoin(meetingConfig.signature);
};
