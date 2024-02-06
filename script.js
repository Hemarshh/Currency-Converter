const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const btn = document.querySelector("form button");
const dropdown = document.querySelectorAll(".dropdown select");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const output = document.querySelector("#msg");

// for (code in countryList) {
//     console.log(code, countryList[code]);
// }

for (const select of dropdown) {
    for (const Ccode in countryList) {
        const nOption = document.createElement("option");
        nOption.innerText = Ccode;
        nOption.value = Ccode;
        if (select.name === "from" && Ccode === "USD") {
            nOption.selected = "selected";
        } if (select.name === "to" && Ccode === "INR") {
            nOption.selected = "selected";
        }
        select.append(nOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let Ccode = element.value;
    let countryCode = countryList[Ccode];
    let link = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = link;
    // console.log(countryCode);

};

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    let av = amount.value;
    if (av === "" || av < 1) {
        av = 1;
        amount.value = "1";
    }


    const url = `${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[to.value.toLowerCase()]

    const final = av * rate;

    output.innerText = `${av} ${from.value} = ${final} ${to.value}`;
    console.log(final);


});