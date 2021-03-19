import './App.css';
import 'crypto';

declare var ZoomMtg

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

function App() {
  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  var signatureEndpoint = 'http://localhost:4000'
  var apiKey = 'y79B-jVQTySE6KkGoDc7JA'
  var meetingNumber = '5027038715'
  var role = 0
  var leaveUrl = 'http://blackboard.usc.edu'
  var userName = 'React'
  var userEmail = 'jasondsouza0530@gmail.com'
  var passWord = 'ApM6q0'

  
  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom WebSDK Sample React</h1>
        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
