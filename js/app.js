//********************************************************************************************
// A G E N D A 
//********************************************************************************************
// Constantes
var WORK_HOURS = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
];

// Datos
var myTeam = [
    {
    name: "María",
    availability: new Array(8).fill(true)
    },
    {
    name: "Pedro",
    availability: new Array(8).fill(true)
    },
    {
    name: "Esther",
    availability: new Array(8).fill(true)
    },
    {
    name: "Marcos",
    availability: new Array(8).fill(true)
    },
];

var randomAvailabilityValue = () => Math.round(Math.random());

var randomAvailabiltyGeneration = team => {
    for (employee of team) {
        for (i = 0; i < employee.availability.length; i++) {
            employee.availability[i] = randomAvailabilityValue();
        }
    }
} 

var displayTeamAgenda = team => {
    console.log("T E A M    A G E N D A");
    console.log("======================");

    for(employee of team) {
        console.log("Disponibilidad de " + employee.name);
        for (i = 0; i < employee.availability.length; i++) {
            console.log (WORK_HOURS[i] + ": " + (employee.availability[i] ? "Si" : "No"));
        }
    }
}

var findSlot = team => {
    for (hour of WORK_HOURS) {
        var slotExists = true;
        for (i = 0; i < team.length && slotExists; i++) {
            slotExists = slotExists && team[i].availability[WORK_HOURS.indexOf(hour)];
        }
        if (slotExists) {
            return hour;   
        }
    }
    return;
}

var agendaProcess = team => {
    var freeSlot;
    randomAvailabiltyGeneration(team);
    displayTeamAgenda(team);
    if (freeSlot = findSlot(myTeam)) {
        console.log("Hueco encontrado en el horario " + freeSlot);
    } else {
        console.log("Lo siento. No hay hueco en el equipo");
    }
}

agendaProcess(myTeam);




//********************************************************************************************
// C A L C U L A D O R A   D E   C A M B I O    D E    B I L L E T E S
//********************************************************************************************

const MAX_PRICE = 1000;

var coins = {
    euro500: {value: "500", unitsToPay: "0", stock: "10", img: "./img/Euro-500.jpg", width: "50", height: "25"},
    euro200: {value: "200", unitsToPay: "0", stock: "10", img: "./img/Euro-200.jpg", width: "50", height: "25"},
    euro100: {value: "100", unitsToPay: "0", stock: "10", img: "./img/Euro-100.jpg", width: "50", height: "25"},
    euro50: {value: "50", unitsToPay: "0", stock: "10", img: "./img/Euro-50.jpg", width: "50", height: "25"},
    euro20: {value: "20", unitsToPay: "0", stock: "10", img: "./img/Euro-20.jpg", width: "50", height: "25"},
    euro10: {value: "10", unitsToPay: "0", stock: "10", img: "./img/Euro-10.jpg", width: "50", height: 28},
    euro5: {value: "5", unitsToPay: "0", stock: "10", img: "./img/Euro-5.jpg", width: "50", height: "30"},
    euro2: {value: "2", unitsToPay: "0", stock: "10", img: "./img/Euro-2.jpg", width: "30", height: "30"},
    euro1: {value: "1", unitsToPay: "0", stock: "10", img: "./img/Euro-1.jpg", width: "30", height: "30"},
    euro050: {value: "0.50", unitsToPay: "0", stock: "10", img: "./img/Euro-050.jpg", width: "30", height: "30"},
    euro020: {value: "0.20", unitsToPay: "0", stock: "10", img: "./img/Euro-020.jpg", width: "30", height: "30"},
    euro010: {value: "0.10", unitsToPay: "0", stock: "10", img: "./img/Euro-010.jpg", width: "30", height: "30"},
    euro05: {value: "0.05", unitsToPay: "0", stock: "10", img: "./img/Euro-05.jpg", width: "30", height: "30"},
    euro02: {value: "0.02", unitsToPay: "0", stock: "10", img: "./img/Euro-02.jpg", width: "30", height: "30"},
    euro01: {value: "0.01", unitsToPay: "0", stock: "10", img: "./img/Euro-01.jpg", width: "30", height: "30"},
}

//Añade contenedor div al elemento recibido como parametro con la clase
var addContainer = (element, divClass) => {
    var elementContainer = document.createElement("div");
    elementContainer.setAttribute("class", divClass);
    elementContainer.appendChild(element)
    return elementContainer
}

var initializeCoinsSelection = coinsList => {
    var listaCoinFields = document.getElementById("user-coins").getElementsByTagName("input");
    for (i = 0; i < listaCoinFields.length; i++) {
        listaCoinFields[i].value = 0;
    }
    for (coin in coinsList) {
        coinsList[coin].unitsToPay = "0";
    } 
    var amountToPayField = document.getElementById("amountToPay");
    amountToPayField.innerText = "0.0";
}

var calculateAmountToPay = coinsList => {
    var amountToPay = 0;
    for (coin in coinsList) {
        amountToPay += parseInt(coinsList[coin].unitsToPay) * parseFloat(coinsList[coin].value)
    }
    return amountToPay;
}

//Comprueba si el valor de las monedas seleccionadas es suficiente para pagar
var enoughMoneyToPay = () => (parseFloat(document.getElementById("amountToPay").innerText) < parseFloat(document.getElementById("priceToPay").innerText)); 

//Genera el precio de la compra con un valor aleatorio menor de 1000€
var generateRadomPrice = () => (Math.random() * MAX_PRICE + 1).toFixed(2);

//Proceso asociado al boton "price-button"
var handlePriceButtonClick = coinsList => {
    var priceToPayField = document.getElementById("priceToPay");
    document.getElementById("returnCoinsContainer").innerHTML = "";
    initializeCoinsSelection(coinsList);
    priceToPayField.innerText = generateRadomPrice();
    document.getElementById("pay-button").disabled = true;
}

//Realiza el calculo de las monedas a devolver teniendo en cuenta la disponibilidad en caja
var calculateCoinsToReturn = (coinsList, amount) => {
    var coinsToReturnList = [];
    var pendingAmount = amount;
    for (coin in coinsList) {
        var coinValue = parseFloat(coinsList[coin].value);
        if (coinValue <= pendingAmount) {
            var quantity = Math.floor(pendingAmount / coinValue);
            var coinQuantity = {    
                coin: coin, 
                quantity: quantity <= coinsList[coin].stock ? quantity : parseInt(coinsList[coin].stock)
            }
            pendingAmount = (pendingAmount - coinQuantity.quantity * coinValue).toFixed(2);
            coinsToReturnList.push(coinQuantity);
        }
    }
    if (pendingAmount > 0) {
        coinsToReturnList = [];
    }
    return coinsToReturnList;
} 

//Actualiza la disponibilidad de monedas en caja con las devueltas y las recibidas 
var updateCoinsStock = (returnedCoins, coinsList) => {
    var coinsContainer = document.getElementById("cash-coins").getElementsByTagName("span");
    for (returnedCoin of returnedCoins) {
        coinsList[returnedCoin.coin].stock = String(parseInt(coinsList[returnedCoin.coin].stock) - parseInt(returnedCoin.quantity));
    }
    var i = 0;
    for (coin in coinsList) {
        coinsList[coin].stock = String(parseInt(coinsList[coin].stock) + parseInt(coinsList[coin].unitsToPay));
        coinsContainer[i].innerText = coinsList[coin].stock;
        i++;
    }
}

//Visualiza las monedas a devolver
var displayCoinsToReturn = (returnedCoinList, coinsList) => {
    var returnedCoinsContainer =  document.getElementById("returnCoinsContainer");
    for (coinToReturn of returnedCoinList) {
        for (i = 1; i <= coinToReturn.quantity; i++) {
            returnedCoinsContainer.appendChild(createCoinImage(coinsList[coinToReturn.coin]));
        }
    }
}

//Proceso asociado al boton "priceToPay"
var handlePayButtonClick = coinsList => {
    document.getElementById("returnCoinsContainer").innerHTML = "";
    var price = parseFloat(document.getElementById("priceToPay").innerText);
    var coinsAmount = parseFloat(document.getElementById("amountToPay").innerText);
    var returnAmount = (coinsAmount - price).toFixed(2);  
    var amountToReturnField = document.getElementById("amountToReturn");
    var coinsToReturn = calculateCoinsToReturn(coinsList, returnAmount);
    if (coinsToReturn.length > 0) {
        updateCoinsStock(coinsToReturn, coinsList);
        amountToReturnField.innerText = "Billetes y monedas a devolver => " + returnAmount + "€";
        displayCoinsToReturn(coinsToReturn, coinsList);
    } else {
        amountToReturnField.innerText = "No se puede dar el cambio => " + returnAmount + "€";r
    } 
}

//Genera un area span para visualizar el stock de una moneda
var createCoinStock = coin => {
    var quantityStock = document.createElement("span");
    quantityStock.innerText = coin.stock;
    return addContainer(quantityStock, "coins-stock");
}

//Evento asociado al change de los input de moneda
var inputChangeEvent = (event, coinsList, coin) => {
    var amountToPayField = document.getElementById("amountToPay");
    coin.unitsToPay = event.target.value;
    amountToPayField.innerText = calculateAmountToPay(coinsList).toFixed(2);    
    //Mantener boton pay-button desactivado
    var buttonToPay = document.getElementById("pay-button");
    buttonToPay.disabled = enoughMoneyToPay();
}

//Crea un input para introducir en numero de monedas para pagar
var createCoinQuantity = (coinsList, coin) => {
    var quantityInput = document.createElement("input");
    quantityInput.setAttribute("value", "0");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("min","0");

    quantityInput.addEventListener("change", (event) => {inputChangeEvent(event, coinsList, coin)});
    return addContainer(quantityInput, "coin-quantity");
}

//Genera un elemento HTML incluyendo el icono de una moneda
var createCoinImage = coin => {
    var coinImage = document.createElement("img");
    coinImage.setAttribute("src", coin.img);
    coinImage.setAttribute("height", coin.height); 
    coinImage.setAttribute("width", coin.width); 
    return addContainer(coinImage, "coin-image");
}

//Genera una linea para una mondeda con su campo asociado (input o span)
var createCoinLine = (coinsList, coin, area) => {
    //Crear contenedor para cada moneda
    var coinContainer = document.createElement("div");
    coinContainer.setAttribute("class", "coin-container");
    //Añadir a la linea de la moneda un imput o un span dependiendo del area en la que se visualice 
    coinContainer.appendChild(createCoinImage(coin));
    if (area === "user") {
        coinContainer.appendChild(createCoinQuantity(coinsList, coin));
    } else {
        coinContainer.appendChild(createCoinStock(coin));
    }
    return coinContainer;
}

//Visualiza las monedas en las areas de user o de caja
var displayCoins = (coinsList, area) => {
    var container = document.getElementById(area + "-coins");
    for (coin in coinsList) {
        container.appendChild(createCoinLine(coins, coinsList[coin], area));
    }
}

//Visualiza las areas de usuario y de caja
var cashCalculator = coinsList => {
    displayCoins(coinsList, "user");
    displayCoins(coinsList, "cash");
}

//Inicializa proceso de calculadora de billetes
cashCalculator(coins);

//Inicializacion eventos de botones
document.getElementById("pay-button").disabled = true;
document.getElementById("price-button").addEventListener("click", () => {handlePriceButtonClick(coins)});
document.getElementById("pay-button").addEventListener("click", () => {handlePayButtonClick(coins)});






//********************************************************************************************
// C A L C U L A D O R A   D E   S U E L D O    N E T O
//********************************************************************************************
const SOCIAL_SECURITY_PERCENTAGE = 6.35;
const SOCIAL_SECURITY_MAX_AMOUNT = 45014.4;
const GASTOS_GENERALES_DEDUCIBLES = 2000;

var irpfSlots = [
    {min: 0, max: 5550, percentage: 0},
    {min: 5550, max: 12450, percentage: 0.19},
    {min: 12450, max: 20200, percentage: 0.24},
    {min: 20200, max: 35200, percentage: 0.30},
    {min: 35200, max: 60000, percentage: 0.37},
    {min: 60000, max: 10000000, percentage: 0.45}
];

var calculateSocialSecurity = grossSalary => SOCIAL_SECURITY_PERCENTAGE * (grossSalary <= SOCIAL_SECURITY_MAX_AMOUNT ? grossSalary : SOCIAL_SECURITY_MAX_AMOUNT) / 100;

var calculateIrpf = grossSalary => {

    for (slot of irpfSlots) {
        if (grossSalary > slot.min && grossSalary <= slot.max) {
            return grossSalary * slot.percentage;
        }
    }
}

var generateReportLine = (tag, amount) => {
    var containerTexto = document.createElement("span");
    containerTexto.innerText = tag + amount;
    return addContainer(containerTexto, "report-line");
}

var generateSalaryReport = (grossSalaryAmount, socialSecurityAmount, irpfAmount) => {

    var lineContainer = document.getElementById("calculationResult");
    lineContainer.innerHTML = "";

    var netSalary = (grossSalaryAmount - irpfAmount).toFixed(2);

    lineContainer.appendChild(generateReportLine("Sueldo Bruto Anual:", grossSalaryAmount));
    lineContainer.appendChild(generateReportLine("Cantidad destinada a Seguridad Social: ", socialSecurityAmount));
    lineContainer.appendChild(generateReportLine("Cantidad destinada a IRPF: ", irpfAmount));
    lineContainer.appendChild(generateReportLine("Salario Neto Anual: ", netSalary));
    lineContainer.appendChild(generateReportLine("Salario Neto Mensual (12 pagas): ", (netSalary / 12).toFixed(2)));
    lineContainer.appendChild(generateReportLine("Salario Neto Mensual (14 pagas): ", (netSalary / 14).toFixed(2)));

}


var handleSalaryButtonClick = () => {
    var grossSalaryField = parseFloat(document.getElementById("GrossSalaryField").value).toFixed(2);
    if (isNaN(grossSalaryField) || grossSalaryField <= 0 ) {
        window.alert("Debe introducir un valor numerico valido")
    } else {
        socialSecurity = calculateSocialSecurity(grossSalaryField).toFixed(2);
        irpf = calculateIrpf(grossSalaryField - socialSecurity - GASTOS_GENERALES_DEDUCIBLES).toFixed(2);
        generateSalaryReport(grossSalaryField, socialSecurity, irpf);
    }
}

document.getElementById("salary-button").addEventListener("click", handleSalaryButtonClick);