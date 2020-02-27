// NOTHING TO SEE HERE

// Our global object
var dateObj;

// At the openning, fill fields
initFields();

function initFields(){
    dateObj = new Date();
    displayTsDate(dateObj);
    displayHumanDate(dateObj);
    displayDate(dateObj);
}

// --- LISTENERS ---
document.getElementById("ms_s_checkbox").addEventListener("click", processInputTs);
document.getElementById("submit_ts_btn").addEventListener("click", processInputTs); 
document.getElementById("submit_date_btn").addEventListener("click", processInputDate); 
document.getElementById("reload").addEventListener("click", initFields);



// --- DISPLAY FUNCTIONS ---

/**
 * Display iso and utc date in html fields
 * @param {*} dateObj 
 */
function displayDate(dateObj){
    dateObj = new Date(dateObj);
    // Display ISO and UTC
    document.getElementById('ts_iso_format').innerHTML = dateObj.toISOString();
    document.getElementById('ts_utc_format').innerHTML = dateObj.toUTCString();
}

/**
 * Display human readable date in html fields
 * @param {*} dateObj 
 */
function displayHumanDate(dateObj){
    dateObj = new Date(dateObj);
    // Display human readable date
    document.getElementById("y_user_input").defaultValue  = dateObj.getFullYear();
    document.getElementById("mon_user_input").defaultValue  = dateObj.getMonth()+1;
    document.getElementById("d_user_input").defaultValue  = dateObj.getDate();
    document.getElementById("h_user_input").defaultValue  = dateObj.getHours();
    document.getElementById("min_user_input").defaultValue  = dateObj.getMinutes();
    document.getElementById("s_user_input").defaultValue  = dateObj.getSeconds();
}

/**
 * Display timestamp date (sec/mills) in html fields
 * @param {*} dateObj 
 */
function displayTsDate(dateObj){
    // Display TS
    let tsToDisplay = + dateObj;
    document.getElementById("ms_s_checkbox").checked ? null : tsToDisplay = Math.round(tsToDisplay/1000); // remove 3 last number (mills)
    document.getElementById("ts_user_input").defaultValue  = tsToDisplay;
}

/**
 * Display erros in a specific div
 * @param {*} error 
 */
function displayError(error){
    // Display error div
    document.getElementById("error_div").style.display = "block";
    document.getElementById('error_div').innerHTML = error;
}



// --- PROCESS FUNCTIONS ---

/**
 * Procces input user timestamp
 */
function processInputTs(){
    // Hide error if necessary
    document.getElementById("error_div").style.display = "none";

    // get value from input
    userTs = document.getElementById("ts_user_input").value;
    
    // Validate the input
    const err = validateTs(userTs);

    if(err === null){
        // if user input a sec ts we convert it into a mill ts
        userTs.length <= 10 ? userTs = userTs*1000 : null;
        dateObj = new Date(+userTs);
        displayTsDate(dateObj); displayHumanDate(dateObj); displayDate(dateObj);
    }else{
        displayError(err);
    }
}

/**
 * Process an input human readable date
 */
function processInputDate(){
    // Hide error if necessary
    document.getElementById("error_div").style.display = "none";
    
    // get values from input
    let yUserInput = document.getElementById("y_user_input").value;
    let monUserInput = document.getElementById("mon_user_input").value;
    let dUserInput = document.getElementById("d_user_input").value;
    let hUserInput = document.getElementById("h_user_input").value;
    let minUserInput = document.getElementById("min_user_input").value;
    let sUserInput = document.getElementById("s_user_input").value;

    // convert from string to int
    yUserInput = parseInt(yUserInput);
    monUserInput = parseInt(monUserInput);
    dUserInput = parseInt(dUserInput);
    hUserInput = parseInt(hUserInput);
    minUserInput = parseInt(minUserInput);
    sUserInput = parseInt(sUserInput);
    
    // Check inputs
    const err = checkInputeDateFields(yUserInput, monUserInput, dUserInput, hUserInput, minUserInput, sUserInput)

    // TODO: do something better for this "if" statement
    if(err === null || err === undefined){
        dateObj = +new Date(yUserInput, monUserInput-1, dUserInput, hUserInput, minUserInput, sUserInput);
        displayTsDate(dateObj); displayHumanDate(dateObj); displayDate(dateObj);
    }else{
        displayError(err);
    }
}

/**
 * Validate user inputs
 * @param {*} userTs 
 */
function validateTs(userTs) {
    if (userTs === "")
        return ERR_MSG_MISSING_TS;

    if (userTs.length > 13)
        return ERR_MSG_WRONG_TS_FROMAT;

    return null;
}

/**
 * Check uhman readable date inputs
 * @param {*} yUserInput 
 * @param {*} monUserInput 
 * @param {*} dUserInput 
 * @param {*} hUserInput 
 * @param {*} minUserInput 
 * @param {*} sUserInput 
 */
function checkInputeDateFields(yUserInput, monUserInput, dUserInput, hUserInput, minUserInput, sUserInput){
    // iterate over arguments properties (arguments contains all paramter properties)
    for (prop in arguments) {
        if(typeof(arguments[prop]) === "undefined" 
            || typeof(arguments[prop]) === "null" 
            || arguments[prop] === ""
            || typeof(arguments[prop]) === "string")
            { 
                return ERR_MSG_INPUT_DATE;
            }
    }
}

// --- STRINGS DEFINITION ---
var ERR_MSG_INPUT_DATE = "Date input is empty or not a number"; 
var ERR_MSG_MISSING_TS = "Missing timestamp";
var ERR_MSG_WRONG_TS_FROMAT = "Wrong timestamp format"