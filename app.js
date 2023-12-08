$(document).ready(function() {
    let words = [
        { word: 'Castle', translation: 'замок', image: 'castle.jfif' },
        { word: 'dog', translation: 'собака', image: 'dog.png' },
        { word: 'cat', translation: 'кіт', image: 'cat.png' },
        { word: 'horse', translation: 'кінь', image: 'horse.png' },
        { word: 'tree', translation: 'дерево', image: 'tree.png' },
        { word: 'book', translation: 'книга', image: 'book.png' },
        { word: 'chair', translation: 'стілець', image: 'chair.png' },
        { word: 'house', translation: 'будинок', image: 'house.png' },
        { word: 'bonfire', translation: 'багаття', image: 'bonfire.png' },
        { word: 'flower', translation: 'квітка', image: 'flower.png' },
    ];
    document.getElementById('background-music').volume = 0.02;
    var totalWords = words.length;
    var currentWord = null;
    var correctCount = 0;
    var incorrectCount = 0;
    var timeLeft = 5 * 60;

    function updateTimer() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        $('#timer').text(minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
        timeLeft--;
        if (timeLeft < 0) {
            endGame();
        }
    }
    function endGame() {
        $('#word').text('Кінець!');
        $('#image').hide();
        $('#translation').hide();
        $('#correct').text(correctCount);
        $('#incorrect').text(incorrectCount);
        $('#result').show();
        clearInterval(timer);
    }
    function nextWord() {
        if (words.length === 0) {
            endGame();
            return;
        }
        currentWord = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        $('#word').text(currentWord.word);
        $('#image').attr('src', currentWord.image);
        $('#translation').val('').focus();
        $('#translation').removeClass('correct incorrect'); 

        let progress = ((totalWords - words.length) / totalWords) * 100;
        $('#progress').css('width', progress + '%');
    }
    $('#translation').on('keydown', function(e) {
        if (e.keyCode === 13) {
            $('#back-cover').css('opacity', '1');
            $('.flip-card-inner').css('transform', 'rotateY(180deg)');
            if ($(this).val().trim().toLowerCase() === currentWord.translation) {
                correctCount++;
                $(this).addClass('correct');
                document.getElementById('correct-sound').play();
            } else {
                incorrectCount++;
                $(this).addClass('incorrect');
                document.getElementById('incorrect-sound').play();
            }
            setTimeout(function() {
                $('.flip-card-inner').css('transform', '');
                $('#back-cover').css('opacity', '0');
                nextWord();
            }, 3000); 
        }
    });
    var timer = setInterval(updateTimer, 1000);
    nextWord();
    $('#start-button').on('click', function() {
        $('#start-screen').hide();
        $('#app').show();
        document.getElementById('background-music').play();
    });
});
