function easterEgg() {
    var x = document.getElementById('AudioEasterEgg');
    x.play();
}
async function closeBar() {
    $('#hellobar-bar').fadeOut()
    setTimeout(function () {
        $('#main-content').attr('id', '');
        $('#hellobar-bar').remove();
    }, 400)
}