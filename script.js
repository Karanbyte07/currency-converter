//const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#convertBtn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapBtn = document.querySelector("#swap");


//on load update the rate
document.addEventListener("DOMContentLoaded", ()=>{
    updateExchangeRate(); // Call the function to update the exchange rate
});


for(let select of dropdowns){
    for(currCode in countryList){
        let option = document.createElement("option");
        option.value = currCode;
        option.innerText = currCode;
        if(select.name === "from" && currCode === "USD") { // Default selection for 'from' dropdown
            option.selected = true;
        }else if(select.name === "to" && currCode === "INR") { // Default selection for 'to' dropdown
            option.selected = true;
        }

        select.appendChild(option);
    }


    select.addEventListener("change", (evt) => {
        updateFlag(evt.target); // Update flag when selection changes
    });
}

//function to update the flag image based on selected currency
const updateFlag = (select) => {
    let currCode = select.value;
    let countryCode = countryList[currCode]; // Get the country code from the countryList
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // Construct the new image source
    let img = select.parentElement.querySelector("img"); // Get the image element
    img.src = newSrc; // Update the image source
}

btn.addEventListener("click",  (evt) => {
    evt.preventDefault(); // Prevent default form submission
    updateExchangeRate(); // Call the function to update the exchange rate)
});



const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input"); // Get the amount input field
        amntVal = amount.value; // Get the value entered by the user
        if(amntVal === "" || amntVal < 1){
            alert("Please enter a valid amount greater than 1"); // Alert if the amount is invalid
            return;
        }

        // console.log(fromCurr.value.toLowerCase());
        // console.log(toCurr.value.toLowerCase());
        const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`; // Construct the URL for fetching exchange rates

        let response = await fetch(URL); // Fetch the exchange rate data
        let data = await response.json(); // Parse the JSON response
        const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; // Get the exchange rate for the selected currencies
        
        let finalAmount = (amntVal * rate).toFixed(2); // Calculate the final amount after conversion
        //1USD = 86INR below print similar like 
        msg.innerText = `${amntVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`; // Display the conversion result
        

};


swapBtn.addEventListener("click", () => {
    // Swap selected currency values
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    // Update flags
    updateFlag(fromCurr);
    updateFlag(toCurr);

    // Recalculate and display updated exchange rate
    updateExchangeRate();
});

