//Constants
const html = document.querySelector("html");
const buttonArray = document.querySelectorAll(".app__card-button");
const focusBtn = document.querySelector(".app__card-button--foco");
const shortBreakBtn = document.querySelector(".app__card-button--curto");
const longBreakBtn = document.querySelector(".app__card-button--longo");
const heroImg = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const titleStrong = document.querySelector(".app__title-strong");
const audioInput = document.querySelector("#alternar-musica");
const startPauseBtn = document.querySelector('#start-pause');
const startPauseBtnTitle = document.querySelector('#start-pause span');
const startPauseBtnIcon = document.querySelector('.app__card-primary-button-icon');
const timeOnScreen = document.querySelector('#timer');

//Audio variables
const music = new Audio('/sons/luna-rise-part-one.mp3'); 
music.loop = true;
const timerSoundStart = new Audio('sons/play.wav');
const timerSoundPause = new Audio('sons/pause.mp3');
const timerSoundEnded = new Audio('sons/beep.mp3');

//Variables
let timeInSeconds = 1500;
let intervalId = null;

// Eventos que escutam cada botção
focusBtn.addEventListener('click', () => { 
    timeInSeconds = 1500;
    contextAlter('foco'); 
    focusBtn.classList.add('active');
});

shortBreakBtn.addEventListener('click', () => { 
    timeInSeconds = 300;
    contextAlter('descanso-curto'); 
    shortBreakBtn.classList.add('active');
});

longBreakBtn.addEventListener('click', () => { 
    timeInSeconds = 900;
    contextAlter('descanso-longo'); 
    longBreakBtn.classList.add('active');
});

// Função que altera o contexto da página
function contextAlter(context) {
    showTime(); //atualiza o valor do temporizador de acordo com o botao
    // Alteração dos botões
    buttonArray.forEach(btn => { 
        btn.classList.remove('active');
    });

    // Alteração do bg
    html.setAttribute('data-contexto', context);
    heroImg.setAttribute('src', `/imagens/${context}.png`);

    // alteração do title
    let titleText, titleStrongText;

    switch(context) {
        case "foco":
            titleText = "Otimize sua produtividade,";
            titleStrongText = "mergulhe no que importa";
            break;
        case "descanso-curto":
            titleText = "Que tal dar uma respirada?";
            titleStrongText = "Faça uma pausa curta!";
            break;
        case "descanso-longo":
            titleText = "Hora de voltar a superfície.";
            titleStrongText = "Faça uma pausa longa.";
            break;
        default: 
            break;
    };

    title.innerHTML = `
        ${titleText}<br>
        <strong class="app__title-strong">${titleStrongText}</strong>
    `;
};

// Evento que escuta o toggle de musica
audioInput.addEventListener('change', () => {
    music.paused ? music.play(): music.pause();
});

// Função do temporizador
const countdown = () => {
    if (timeInSeconds <= 0 ) { 
        alert("Tempo finalizado");
        nullify(); 
        timerSoundEnded.play();
        return; 
    };

    timeInSeconds -= 1; // Lógica de decrescimo
    showTime();
};

// Função que inicia e pausa o temporizador 
function startPause() {
    if (intervalId) {
        timerSoundPause.play();
        nullify();
        return;
    };

    intervalId = setInterval(countdown, 1000); //Definindo intervalo para o temporizador
    startPauseBtnTitle.textContent = "Pausar";
    startPauseBtnIcon.setAttribute('src', 'imagens/pause.png');  
    timerSoundStart.play(); 
};

// Função que pausa o intervalo do temporizador
function nullify() {
    clearInterval(intervalId);
    startPauseBtnTitle.textContent = 'Começar';
    startPauseBtnIcon.setAttribute('src', 'imagens/play_arrow.png');
    intervalId = null;
};

// Evento que escuta o botão de iniciar e pausar
startPauseBtn.addEventListener('click', startPause);

// Função que mostra o tempo em tela
function showTime() {
    const time = new Date(timeInSeconds * 1000); // Multiplica por 1000 para converter de segundos para milissegundos
    const timeFormat = time.toISOString().substr(14, 5); // Extrai apenas os minutos e segundos do formato ISO
    timeOnScreen.innerHTML = timeFormat;
};

showTime();
