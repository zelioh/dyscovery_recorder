$(document).ready(() => {
    var list = ['acodin', 'oui', '...']
    var index = 0;

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext //audio context to help us record
    var gumStream;
    var input;
    var rec;


    $('#record-button').click(() => {
        let current = $('#mic').attr('src');

        if (current == 'asset/white_mic.png')
        {
            let constraints = { audio: true, video:false }

            navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
                console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
                audioContext = new AudioContext();
                gumStream = stream;
                input = audioContext.createMediaStreamSource(stream);
                rec = new Recorder(input,{numChannels:2})
                rec.record()
                console.log("Recording started");
                $('#mic').attr('src', 'asset/white_square.png');
        
            }).catch(function(e) {
                console.log(e);
            });
        }
        else
        {
            console.log("stopButton clicked");
            rec.stop();
            gumStream.getAudioTracks()[0].stop();
            rec.exportWAV(sendToServer);

            $('#mic').attr('src', 'asset/white_mic.png');
            $('#word').html(list[++index]);
            if (index >= list.length)
            {
                window.location.href = "end";
            }
        }
    });

    function sendToServer(blob)
    {
        $.ajax({
            type: "POST",
            url: "save",
            data: {
                audio: blob
            },
            success: function (response) {
              console.log(response);  
            },
            error: function (response)
            {
                console.log(response);
            }
        });
    }

    $('#word').html(list[index]);
});