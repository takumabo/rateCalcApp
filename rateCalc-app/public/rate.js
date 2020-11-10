
const url = 'https://api.exchangeratesapi.io/latest';
const fetchData = fetch(url)
    .then((res) => {
    return res.json();
    })
    .then((result) => {
        const rates = result.rates;
        const countries = Object.keys(rates); 
        const values = Object.values(rates);



        let list = [];
        for(let i = 0; i < countries.length; i++){
            list.push(
                '<p class="rateList">' + countries[i] + '　=>　' + values[i] + '</p>'
                );
        }
        
        document.getElementById('rateLists').innerHTML = list.join('');
        document.getElementById('menuRateLists').innerHTML = list.join('');


        let rateListTag = document.getElementsByClassName("rateList");
        for(let j = 0; j < values.length; j++) {
            rateListTag[j].setAttribute("value",values[j]);
            rateListTag[j].setAttribute("data-area",countries[j]);

            rateListTag[j].addEventListener('click', (event) => {
                const targetValue = event.target.getAttribute("value");
                const targetCountry = event.target.dataset.area;
                console.log(targetValue);
                console.log(targetCountry);
              }, false);
        }

    }) 
    .catch((err) =>{
        console.log(err);
});




fetch(url).then((res) =>{
    return res.json();
}).then((result) => {
    const optionCountry = Object.keys(result.rates);
    const optionValue = Object.values(result.rates);

    let optionList1 = [];
    let optionList2 = [];

    for(let l = 0; l < optionCountry.length; l++){
        optionList1.push(
            ' <option class="optionTag1">' + optionCountry[l] + '</option>'
        );
        optionList2.push(
            ' <option class="optionTag2">' + optionCountry[l] + '</option>'
        );
    }
    document.getElementById('resultCountry').innerHTML = optionList1.join('');
    document.getElementById('calcCountry').innerHTML = optionList2.join('');


    let optionTag1 = document.getElementsByClassName("optionTag1");
    let optionTag2 = document.getElementsByClassName("optionTag2");
    for(let m = 0; m < optionTag1.length; m++) {
        optionTag1[m].setAttribute("value",optionValue[m]);
        optionTag1[m].setAttribute("data-area",optionCountry[m]);
        optionTag2[m].setAttribute("value",optionValue[m]);
        optionTag2[m].setAttribute("data-area",optionCountry[m]);
    }

}).catch((err) => {
    console.log(err);
})







function resultCalc() {
    const resultVal = document.getElementById('resultCountry').value;
    const calcVal = document.getElementById('calcCountry').value;
    const inputMoney = document.getElementById("inputMoney").value;

    const resultValData = Number(resultVal);
    const calcValData = Number(calcVal);
    const inputMoneyData = Number(inputMoney);

    const sum = resultValData * inputMoneyData / calcValData;
    sum.toFixed(2);
    let log = document.getElementById('log');
    
    log.textContent = sum.toLocaleString();
}





var today = new Date();
 
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();
 
let getDate =  year + '年　' + month + '月　' + day + '日';

document.getElementById('getDate').innerHTML = getDate; 
document.getElementById('menuGetDate').innerHTML = getDate; 








function changeRate() {

    fetch(url)
    .then((response) => {
        return response.json();
    }).then((result) =>{
        const baseVal = document.getElementById('baseCountry').value;
        const menuBaseVal = document.getElementById('menuBaseCountry').value;
        const rates = result.rates;

        const countries = Object.keys(rates); 
        const values = Object.values(rates);

        const jpyVal = rates.JPY;
        const usdVal = rates.USD;
        let list = [];

        if(baseVal === 'jpy' || menuBaseVal === 'jpy'){
            for(let i = 0; i < countries.length; i++){
                const fixValues = values[i]/jpyVal;
                list.push(
                    '<p class="rateList">' + countries[i] + '　=>　' + fixValues.toFixed(4) + '</p>'
                    );
            }
            document.getElementById('rateLists').innerHTML = list.join('');
            document.getElementById('menuRateLists').innerHTML = list.join('');

        }else if(baseVal === 'usd' || menuBaseVal === 'usd'){
            for(let i = 0; i < countries.length; i++){
                const fixValues = values[i]/usdVal;
                list.push(
                    '<p class="rateList">' + countries[i] + '　=>　' + fixValues.toFixed(4) + '</p>'
                    );
            }
            document.getElementById('rateLists').innerHTML = list.join('');
            document.getElementById('menuRateLists').innerHTML = list.join('');
        }else {
            for(let i = 0; i < countries.length; i++){
                list.push(
                    '<p class="rateList">' + countries[i] + '　=>　' + values[i] + '</p>'
                    );
            }
            document.getElementById('rateLists').innerHTML = list.join('');
            document.getElementById('menuRateLists').innerHTML = list.join('');
        }



    }).catch((err) =>{
        console.log(err);
    })
}

