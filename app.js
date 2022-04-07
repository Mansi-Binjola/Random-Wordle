function getList() {
    return ($.ajax({
        url: 'https://random-word-api.herokuapp.com/word?number=200',
        type: 'GET',
        dataType: 'json',
        async: false
        // success: function(data, textStatus, xhr){

        // },
        // error: function(xhr, textStatus, errorThrown) {
        //     console.log("Error in retrieving data")
        //     // var data = []
        // }
    }).responseJSON)
}

function getMeaning(word) {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word
    return ($.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        async: false
        // success: function(data, textStatus, xhr){
        //     console.log(data)         
        // },
        // error: function(xhr, textStatus, errorThrown) {
        //     console.log("Error in retrieving data")
        //     // var data = []
        // }
    }).responseJSON);
}
function secretWord() {
    var word = ''
    while (word.length < 1) {
        data = getList();
        // console.log(data);
        for (let i = 0; i < 10; i++) {
            // console.log(data[i].length)
            if (data[i].length === 5) {
                word = data[i];
                break
            }
        }
        //     console.log(word.length);
    }
    return (word);

}
// const dictionary = ['earth','plane','water','crane'];// dictionary api

const state = {
    secret: secretWord(),
    gameCompleted: false,
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0

};
state.definition = getMeaning(state.secret);
console.log(Array.isArray(state.definition));

while (!Array.isArray(state.definition)) {
    state.secret = secretWord();
    state.definition = getMeaning(state.secret);
}
// console.log(state.secret);
// console.log(state.definition.meanings.length); // meaning 

function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;
    container.appendChild(box);
    return box;
}

function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
        }
    }
    container.appendChild(grid);
}

function getCurrentWord(check = 0) {
    return state.grid[state.currentRow - check].reduce((prev, curr) => prev + curr);
}
function isWordValid(word) {
    // dictionary api
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word
    data = ($.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        async: false,
        // success: function(data, textStatus, xhr){
        //     data = true       
        // },
        // error:function (xhr, ajaxOptions, thrownError){
        //     if(xhr.status==404 || thrownError) {
        //         data=false;
        //     }
        // }
    }).status)
    //console.log(typeof data);
    //return data;
    if (data == 404) {
        return (false);
    }
    return (true);
}
function revealWord(guess) {
    const row = state.currentRow;
    const resultDict = [...state.secret].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {}); 
    // console.log(resultDict);
    const animation_dur = 500; //ms
    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        setTimeout(() => {
            if (letter in resultDict) {
                if((letter === state.secret[i])){
                    box.classList.add('right');
                    resultDict[letter] --;
                    
                }else if(resultDict[letter]>0){
                    box.classList.add('wrong');
                    resultDict[letter] --;
                }else{
                    box.classList.add('empty');
                }
            }else{
                box.classList.add('empty');
            }
            // console.log(resultDict)
        }, ((i + 1) * animation_dur) / 2);
        // setTimeout(() => {
        //     if (letter === state.secret[i]) {
        //         box.classList.add('right');
        //     } else if (state.secret.includes(letter)) {
        //         box.classList.add('wrong');
        //     } else {
        //         box.classList.add('empty');
        //     }
        // }, ((i + 1) * animation_dur) / 2);
        box.classList.add('animated');
        box.style.animationDelay = `${(i * animation_dur) / 2}ms`; // delay for color change
    }
    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 5;

    setTimeout(() => {
        if (isWinner) {
            showPopup(true);
        } else if (isGameOver) {
            showPopup(false);
        }
    }, 3 * animation_dur)
    // Add meaning of the word
}

function confettiShower() {
    var end = Date.now() + (15 * 100);
    // var colors = ['#538d4e',"#"];

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            // colors: colors
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            // colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
    //     var count = 200;
    // var defaults = {
    //   origin: { y: 0.7 }
    // };

    // function fire(particleRatio, opts) {
    //   confetti(Object.assign({}, defaults, opts, {
    //     particleCount: Math.floor(count * particleRatio)
    //   }));
    // }

    // fire(0.25, {
    //   spread: 26,
    //   startVelocity: 55,
    // });
    // fire(0.2, {
    //   spread: 60,
    // });
    // fire(0.35, {
    //   spread: 100,
    //   decay: 0.91,
    //   scalar: 0.8
    // });
    // fire(0.1, {
    //   spread: 120,
    //   startVelocity: 25,
    //   decay: 0.92,
    //   scalar: 1.2
    // });
    // fire(0.1, {
    //   spread: 120,
    //   startVelocity: 45,
    // });
}
function showPopup(ans) {
    if (ans) {

        $('#result').text('Congratulations! you got it right');
        // $('#myModal').addClass('alert-success');
        $('#givenWord').text(state.secret);
        $('#meaningWord').text(state.definition[0].meanings[0].definitions[0].definition)
        $('#myModal').modal('show');
        $('.modal-backdrop').remove();
        confettiShower();
    } else {
        $('#result').text('Opps!, you are out of moves');
        // $('#myModal').addClass('alert-danger');
        $('#givenWord').text(state.secret);
        $('#meaningWord').text(state.definition[0].meanings[0].definitions[0].definition)
        $('#myModal').modal('show')
    }
    state.gameCompleted = true;

}
function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}
function addLetter(letter) {
    if (state.currentCol === 5) return;
    // console.log("letter"+letter)
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}
function removeLetter() {
    if (state.currentCol === 0) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}
function registerKeyboardEvents() {

    if (state.currentRow < 6) {
        document.body.onkeydown = (e) => {

            const key = e.key;
            if (key === 'Enter') {
                if (state.currentCol === 5) {
                    const word = getCurrentWord();
                    if (isWordValid(word)) {
                        revealWord(word);
                        state.currentRow++;
                        state.currentCol = 0;
                    } else {
                        // add toast for invalid word
                        $('#alertToast').text('Invalid word');
                        //$('.toast-container').append(toast);
                        $('.toast').toast('show');
                    }
                }
            }
            if (key === 'Backspace') {
                removeLetter();
            }
            if (isLetter(key)) {
                addLetter(key);
            }
            updateGrid();
        };
    } else {
        const word = getCurrentWord(1);
        if (isWordValid(word)) {
            revealWord(word);
        }
    }
}
$('#closeModal').on('click', function () {
    $('#myModal').modal('toggle');
})

function startup() {
    const game = document.getElementById('game-container');
    drawGrid(game);

    // console.log(state.secret);
    registerKeyboardEvents();

}
startup();
$('body').on('click', function () {
    // console.log(state.currentRow+state.currentCol);
    if (state.gameCompleted) {
        $('#myModal').modal('toggle');
    }

})