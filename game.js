let baseMoneyValue = 12.34;
let baseEmploymentStatusValue = "Courier";
let baseFatigueValue = "Tired";

let moneyValue = baseMoneyValue;
let employmentStatusValue = baseEmploymentStatusValue;
let fatigueValue = baseFatigueValue;

let inventoryOpen = false;
let visitedLocations = []; //przechowywanie lokalizacji

function loadLocations() {
    fetch('locations.json')
        .then(response => response.json())
        .then(data => {
            const locations = data.locations;
            startGame(locations);
        })
        .catch(error => {
            console.error('Error loading locations:', error);
        });
}

function startGame(locations) {
    document.querySelector('.menu-container').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    showLocation(locations[0]);
    document.querySelector('.game-options').style.display = 'none'; // przyciski buy beer i random music zrob z tym cos potem
}

// wyswietlanie lokalizacji
function showLocation(location) {
    document.getElementById('location-name').textContent = location.name;

    const actionsList = document.getElementById('actions-list');
    actionsList.innerHTML = '';
    if (location.name === "Shop") {
    const randomNum = Math.floor(Math.random() * 3) + 1;
     
    // losowanie
    let shopText = "";
    switch (randomNum) {
        case 1:
            shopText = "You enter the store. The cashier is browsing her phone, and the smell of hot dogs fills the air";
            break;
        case 2:
            shopText = "Two cashiers are telling each other some stupid stories.";
            break;
        case 3:
            shopText = "The cashier's gaze speaks to you clearly - get the hell out of here.";
            break;
        default:
            shopText = "The cashier's gaze speaks to you clearly - get the hell out of here.";
    }

    // tekst jako jedna z akcji
    const shopTextElement = document.createElement('p');
    shopTextElement.textContent = shopText;
    actionsList.appendChild(shopTextElement);
    }
    location.actions.forEach(action => {
        const actionItem = document.createElement('li');
        actionItem.textContent = action;
        actionsList.appendChild(actionItem);
        
        // go outside
        if (action === "Go outside") {
            actionItem.addEventListener('click', () => goToLocation("Outside"));
            actionItem.style.cursor = "pointer"; // kursor
        } else if (action === "Shop") {
            actionItem.addEventListener('click', () => goToLocation("Shop")); // to samo co wyżej tylko sklep
            actionItem.style.cursor = "pointer"; // kursor
        }
    });
    
    // push do historii lokalizacji
    visitedLocations.push(location);
}

function goBack() {
    if (visitedLocations.length > 1) {
        // cofanie do poprzedniej lokalizacji
        visitedLocations.pop(); // usuwanie bieżącej
        const previousLocation = visitedLocations.pop(); // daj poprzednią
        showLocation(previousLocation); // pokaż poprzednią
    } else {
        // albo menu, jeśli nie ma poprzedniej
        document.querySelector('.menu-container').style.display = 'block';
        document.getElementById('game-screen').style.display = 'none';
        resetCharacterOptions();
    }
}

function resetCharacterOptions() {
    moneyValue = baseMoneyValue;
    employmentStatusValue = baseEmploymentStatusValue;
    fatigueValue = baseFatigueValue;
    updateCharacterOptions();
}

// przechodzenie do określonego miejsca
function goToLocation(locationName) {
    fetch('locations.json')
        .then(response => response.json())
        .then(data => {
            const location = data.locations.find(loc => loc.name === locationName);
            if (location) {
                showLocation(location);
            } else {
                console.error(`Location "${locationName}" not found.`);
            }
        })
        .catch(error => {
            console.error('Error loading locations:', error);
        });
}

// won do menu
function goToMainMenu() {
    document.querySelector('.menu-container').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
    resetCharacterOptions();
}

loadLocations();
