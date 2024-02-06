let baseMoneyValue = 12.34;
let baseEmploymentStatusValue = "Courier";
let baseFatigueValue = "Tired";

let moneyValue = baseMoneyValue;
let employmentStatusValue = baseEmploymentStatusValue;
let fatigueValue = baseFatigueValue;

let visitedLocations = []; // przechowywanie lokalizacji

// przedmioty w sklepie
const shopItems = {
    "groceries": { name: "Groceries", price: 50 },
    "vodka": { name: "Vodka", price: 25 },
    "cigarettes": { name: "Cigarettes", price: 15.50 },
    "beer": { name: "Beer", price: 4.30 }
};

// Obiekt mapujący nazwy akcji na funkcje obsługi
const actionHandlers = {
    "Go outside": () => goToLocation("Outside"),
    "Shop": () => goToLocation("Shop"),
    "Read": showReadingDialog, 
    "Buy groceries": () => buyItem("groceries"), 
    "Buy vodka": () => buyItem("vodka"), 
    "Buy cigarettes": () => buyItem("cigarettes"), 
    "Buy beer": () => buyItem("beer") 
};

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
    
    document.querySelector('.game-container').classList.remove('in-room');


    if (location.name === 'Your Room') {
        document.querySelector('.game-container').classList.add('in-room');
    }

    document.getElementById('location-name').textContent = location.name;

    const actionsList = document.getElementById('actions-list');
    actionsList.innerHTML = '';

    location.actions.forEach(action => {
        const actionItem = document.createElement('li');
        actionItem.textContent = action;
        actionsList.appendChild(actionItem);

        
        if (actionHandlers[action]) {
            actionItem.addEventListener('click', () => actionHandlers[action](location));
            actionItem.style.cursor = "pointer";
        }
    });

    // Push do historii lokalizacji
    visitedLocations.push(location);
}

// Funkcja obsługi akcji "Read"
function showReadingDialog(location) {
    // Tutaj dodajemy kod obsługujący otwarcie okna dialogowego z listą książek
    const readingListDialog = document.getElementById('reading-list-dialog');
    readingListDialog.style.display = 'block'; // Pokazujemy okno dialogowe
}

// Funkcja obsługi wyboru książki
function selectBook(bookName) {
    
    
    console.log("Selected book:", bookName);
    closeReadingDialog(); 
    if (bookName === 'Twilight of the Idols') {
        
        const text = `Walka jest wychowawczynią wolności.
        Gdyż co to jest wolność? To pragnienie samo - odpowiedzialności. To przestrzeganie dzielących nas oddaleń. To zobojętnienie na trudy, niedostatki, srogość, nawet na życie. To gotowość poświęcenia swej sprawie innych i siebie. Wolność - to znaczy, że instynkty tryumfalne, wojownicze, męskie zawładnęły innymi, na przykład instynktem „szczęścia”.
        Człowiek wyzwolony, tem bardziej duch wyzwolony, gardzi nikczemną błogością, o której marzą przekupnie, chrześcijanie, krowy, kobiety, Anglicy oraz inne demokraty. Człowiek wolny jest wojownikiem. - Czemże mierzy się wolność u jednostek i u narodów? Oporem, który pokonać trzeba, trudem, którym okupuje się swą przewagę. Najwyższego typu wolnego człowieka należałoby szukać tam, gdzie wciąż największe pokonywa się opory: o pięć kroków od tyranii, tuż u progu grożącego niewolnictwa.
        `;
        window.alert(text);
    }
}

// Funkcja zamykająca okno dialogowe
function closeReadingDialog() {
    const readingListDialog = document.getElementById('reading-list-dialog');
    readingListDialog.style.display = 'none'; 
}


function buyItem(itemKey) {
    const item = shopItems[itemKey];
    if (item && moneyValue >= item.price) {
            
        addToInventory(item.name);
            
        moneyValue -= item.price;
            
        document.getElementById('moneyValue').textContent = moneyValue.toFixed(2) + ' zł';
    } else {
        console.log("Insufficient funds or item not found.");
    }
}


function addToInventory(itemName) {
    const inventoryList = document.getElementById('inventoryList');
    const listItem = document.createElement('li');
    listItem.textContent = itemName;
    inventoryList.appendChild(listItem);
}

// Funkcja otwierająca i zamykająca ekwipunek
function toggleInventory() {
    const inventory = document.querySelector('.inventory');
    if (inventory.style.display === 'none') {
        inventory.style.display = 'block';
    } else {
        inventory.style.display = 'none';
    }
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
