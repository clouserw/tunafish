var useMicrophone = true;

var audioCtx = new AudioContext;
var analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

if (useMicrophone) {

  navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

  if (navigator.getUserMedia) {
    navigator.getUserMedia({
        audio: true
      },

      // Success
      function(stream) {
        source = audioCtx.createMediaStreamSource(stream);
        useSource(source, stream);
      },

      // Error
      function(err) {
        console.log('The following error occured: ' + err);
      }
    );
  } else {
    console.log("getUserMedia not supported");
  }

} else {
  var fakeAudioDiv = document.getElementsByClassName('fake-audio')[0];
  fakeAudioDiv.classList.remove('hidden');
  var audioSrc = document.getElementsByTagName('audio')[0];

  source = audioCtx.createMediaElementSource
  source = audioCtx.createMediaElementSource(audioSrc);
  // TODO: Where do we get the stream from?
  // audioSrc.play?
  useSource(source, null);
}

function useSource(source, stream) {
try {
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  visualize(stream);
} catch (e) {
console.log(e);
}
}

function visualize(stream) {
  // Fake Audio from <audio>
  if (null === stream) {
    //frameLooper();
    // Microphone stream!
  } else {
    //frameLooper();
    //  console.log('Testo: ' + stream);
  }

}

toggleLiveInput();

