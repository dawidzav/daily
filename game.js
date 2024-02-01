let baseMoneyValue = 12.34;
let baseEmploymentStatusValue = "Courier";
let baseFatigueValue = "Tired";

let moneyValue = baseMoneyValue;
let employmentStatusValue = baseEmploymentStatusValue;
let fatigueValue = baseFatigueValue;

function updateCharacterOptions() {
    document.getElementById('moneyValue').textContent = moneyValue.toFixed(2) + ' zł';
    document.getElementById('employmentStatusValue').textContent = employmentStatusValue;
    document.getElementById('fatigueValue').textContent = fatigueValue;
}

function startGame() {
    document.querySelector('.menu-container').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    updateCharacterOptions();
}

function goBack() {
    document.querySelector('.menu-container').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
    resetCharacterOptions();
}

function resetCharacterOptions() {
    moneyValue = baseMoneyValue;
    employmentStatusValue = baseEmploymentStatusValue;
    fatigueValue = baseFatigueValue;
    updateCharacterOptions();
}

function buyBeer() {
    if (moneyValue >= 4.20) {
        moneyValue -= 4.20;
        updateCharacterOptions();
        console.log("The Taste of Everyday Life...");
    } else {
        console.log("You don't have money, bro.");
    }
}

function playRandomSong() {
   
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.pause();
    audioPlayer.currentTime = 0;

    
    const audioSource = document.getElementById('audioSource');
    
    
    const randomSong = 'music/krtky.mp3';
    
    audioSource.src = randomSong;
    audioPlayer.load();
    audioPlayer.play();
}


document.getElementById('game-screen').style.display = 'none';
