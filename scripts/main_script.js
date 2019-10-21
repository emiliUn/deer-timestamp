// NOTHING TO SEE HERE

// At the openning, fill fields
initFields();

function initFields(){
    displayConvertedTs(convertTs(+new Date()));
}

// true or false from a checkbox : false = secondes, true = milliseconds
document.getElementById("ms_s_checkbox").addEventListener("click", processInputTs);  

document.getElementById("submit_ts_btn").addEventListener("click", processInputTs); 

document.getElementById("submit_date_btn").addEventListener("click", processInputDate); 

document.getElementById("reload").addEventListener("click", initFields);

/**
 * Procces input user timestamp
 */
function processInputTs(){
    // Hide error tst if necessary
    document.getElementById("error_div").style.display = "none";

    // get value from input
    userTs = document.getElementById("ts_user_input").value;
    
    // Validate the input
    let err = validateTs(userTs);
    if(err === null){
        const convertedTs = convertTs(userTs);
        displayConvertedTs(convertedTs);
    }else{
        displayError(err);
    }
}

/**
 * Validate user inputs
 * @param {*} userTs 
 */
function validateTs(userTs) {
    // let inputError = false;

    if (userTs === "")
        return ERR_MSG_MISSING_TS;

    if (userTs.length !== 10 && userTs.length !== 13)
        return ERR_MSG_WRONG_TS_FROMAT;

    return null;
}

/**
 * Convert a int ts to iso and utc format
 * @param {*} userTs 
 * 
 */
function convertTs(userTs) {
    // Parse to int
    const userTsLength = userTs.length;
    userTs = +userTs;

    // Transform ts in sec to ts in ms (in case user input sec)
    if(userTsLength === 10){
        userTs = userTs * 1000;
    }

    const iso = new Date(userTs).toISOString();
    const utc = new Date(userTs).toUTCString();
    return [iso, utc];
}


function displayConvertedTs(convertedTs){
    //
    document.getElementById('ts_iso_format').innerHTML = convertedTs[0];
    document.getElementById('ts_utc_format').innerHTML = convertedTs[1];
    
    //
    document.getElementById("y_user_input").defaultValue  = new Date(convertedTs[0]).getFullYear();
    document.getElementById("mon_user_input").defaultValue  = new Date(convertedTs[0]).getMonth()+1;
    document.getElementById("d_user_input").defaultValue  = new Date(convertedTs[0]).getDate();
    document.getElementById("h_user_input").defaultValue  = new Date(convertedTs[0]).getHours();
    document.getElementById("min_user_input").defaultValue  = new Date(convertedTs[0]).getMinutes();
    document.getElementById("s_user_input").defaultValue  = new Date(convertedTs[0]).getSeconds();
    
    //
    let tsToDisplay = +new Date(convertedTs[0]);
    document.getElementById("ms_s_checkbox").checked ? null : tsToDisplay = tsToDisplay.toString().substr(0, 10); // remove 3 last number (mills)
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


function processInputDate(){
    // Hide error tst if necessary
    document.getElementById("error_div").style.display = "none";
    // get values from input
    const yUserInput = document.getElementById("y_user_input").value;
    const monUserInput = document.getElementById("mon_user_input").value;
    const dUserInput = document.getElementById("d_user_input").value;
    const hUserInput = document.getElementById("h_user_input").value;
    const minUserInput = document.getElementById("min_user_input").value;
    const sUserInput = document.getElementById("s_user_input").value;

    // Check inputs
    let err = checkInputeDateFields(yUserInput, monUserInput, dUserInput, hUserInput, minUserInput, sUserInput)
    if(err === null){
        const ts = +new Date(yUserInput, monUserInput-1, dUserInput, hUserInput, minUserInput, sUserInput);
        displayConvertedTs(convertTs(ts));
        
        document.getElementById('ts_user_input').value = ts;
    }else{
        displayError(err);
    }
}


function checkInputeDateFields(yUserInput, monUserInput, dUserInput, hUserInput, minUserInput, sUserInput){
    console.log(arguments);
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


var ERR_MSG_INPUT_DATE = "Date input is empty or not a number"; 
var ERR_MSG_MISSING_TS = "Missing timestamp";
var ERR_MSG_WRONG_TS_FROMAT = "Wrong timestamp format"