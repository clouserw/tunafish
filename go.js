var useMicrophone = false;

var audioCtx = new AudioContext;
var analyser = audioCtx.createAnalyser();

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
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  visualize(stream);
}


function visualize(stream) {
  // Fake Audio from <audio>
  if (null === stream) {
    frameLooper();
    // Microphone stream!
  } else {
    //  console.log('Testo: ' + stream);
  }

}

// frameLooper() animates any style of graphics you wish to the audio frequency // Looping at the default frame rate that the browser provides(approx. 60 FPS)

function frameLooper() {
  var canvas = document.getElementById('viz');
  var ctx =
    canvas.getContext('2d');
  window.requestAnimationFrame(frameLooper);
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas 
  ctx.fillStyle = '#00CCFF'; // Color of the bars
  bars = 100;
  for (var i = 0; i < bars; i++) {
    bar_x = i * 3;
    bar_width = 2;
    bar_height = -(fbc_array[i] / 2);
    //fillRect( x, y, width, height ) // Explanation of the parameters below
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
}
