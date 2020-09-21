$(document).ready(() => {
    $('#record-button').click(() => {
        let current = $('#mic').attr('src');

        if (current == 'asset/white_mic.png')
        {
            $('#mic').attr('src', 'asset/white_square.png');
        }
        else
        {
            $('#mic').attr('src', 'asset/white_mic.png');
        }
    });
});