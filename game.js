let baseMoneyValue = 12.34;
let baseEmploymentStatusValue = "Courier";
let baseFatigueValue = "Tired";

let moneyValue = baseMoneyValue;
let employmentStatusValue = baseEmploymentStatusValue;
let fatigueValue = baseFatigueValue;

let inventoryOpen = false;

function updateCharacterOptions() {
    document.getElementById('moneyValue').textContent = moneyValue.toFixed(2) + ' zł';
    document.getElementById('employmentStatusValue').textContent = employmentStatusValue;
    document.getElementById('fatigueValue').textContent = fatigueValue;

    const inventorySection = document.querySelector('.character-tab .inventory');
    inventorySection.classList.toggle('open', inventoryOpen);
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

function toggleInventory() {
    inventoryOpen = !inventoryOpen;
    updateCharacterOptions();

    if (inventoryOpen) {
        const inventoryList = document.getElementById('inventoryList');
        inventoryList.innerHTML = '<li>Item 1</li><li>Item 2</li><li>Item 3</li><li class="unclickable">Papierosy</li>';
    }
}

document.getElementById('game-screen').style.display = 'none';
