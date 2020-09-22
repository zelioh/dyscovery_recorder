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
        }
    });

    function generateRandomString(length) {
        var result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;

        for ( var i = 0; i < length; i++ )
        {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    function sendToServer(blob)
    {
        let currentWorld = $('#word').html();

        if (!list.includes(currentWorld))
        {
            console.log('This world doesn\'t exist');
            alert('Erreur, le mot n\'existe pas');
            return;
        }

        currentWorld += '_' + generateRandomString(15) + '.wav';

        var formData = new FormData();
        formData.append("audio", blob, currentWorld);

        $.ajax({
            type: "POST",
            url: "save",
            data: formData,
            contentType:false,
            processData:false,
            cache:false,
            enctype: 'multipart/form-data',
            success: function (response) {
                $('#mic').attr('src', 'asset/white_mic.png');
                $('#word').html(list[++index]);
                if (index >= list.length)
                {
                    window.location.href = "end";
                }

	            var url = URL.createObjectURL(blob);
                var au = document.createElement('audio');

                au.controls = true;
                au.src = url;
            },
            error: function (response)
            {
                console.log(response);
            }
        });
    }

    $('#word').html(list[index]);
});