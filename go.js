

var audioCtx = new AudioContext;
var analyzer = audioCtx.createAnalyser();

navigator.getUserMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

if (navigator.getUserMedia) {
    navigator.getUserMedia (
        { audio: true },

        // Success
        function(stream) {
            source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyzer);
            analyzer.connect(audioCtx.destination);
            visualize(stream);
        },

        // Error
        function(err) {
            console.log('The following error occured: ' + err);
        }
    );



} else {
    console.log("getUserMedia not supported");
}


function visualize(stream) {
    //console.log('Testo: ' + stream);

}
