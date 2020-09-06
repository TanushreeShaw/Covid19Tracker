var commArr;
var country_name = document.getElementById('country_name');

function fetchAllData() {
    var request = new XMLHttpRequest(); //request data from a web server.
    request.open('GET', 'https://api.covid19api.com/summary'); //opens the request //get means u want to take the data from the dataase for the front-end
    request.send(); // sending the request
    request.onload = function() {
        commArr = JSON.parse(request.responseText); // request has a variable called responsetext which will store all the data 
        //To convert it into object we use JSON(helps in data conversion)
        //console.log(commArr)
        fetchCountries(commArr.Countries); //putting countries in the select option
    }
}

function fetchCountries(countryData) {
    for (var i = 0; i < countryData.length; i++) { //we will acces each country and put that in select option
        var option = document.createElement('option'); //creating option
        option.innerHTML = countryData[i].Country; //displaying name of option
        option.value = countryData[i].Country; //displaying value of option
        if (countryData[i].Country === 'India') { //by default if we want to show india's data first
            option.selected = true; //India is selected at default whenever the page loads
            displayResults(countryData[i]); //display all the data of india
        }
        country_name.appendChild(option); //append country_name to select option
    }
}

function displayResults(obj) {
    console.log(obj) //display the data of india in console
    document.getElementById('confirm').innerHTML = obj.TotalConfirmed; //BY using innerHTML we can append all the data in the front end
    document.getElementById('recover').innerHTML = obj.TotalRecovered;
    document.getElementById('death').innerHTML = obj.TotalDeaths;
    document.getElementById('newConfirm').innerHTML = obj.NewConfirmed;
    document.getElementById('newRecover').innerHTML = obj.NewRecovered;
    document.getElementById('newDeath').innerHTML = obj.NewDeaths;
}
country_name.addEventListener('change', function(event) {
    //we use addEventListener in the select option so that when we change the country's name, correspondingly its data will also change
    console.log(event.target.value) //event is what we are changing,when and at what tym we r changing
    for (var i = 0; i < commArr.Countries.length; i++) {
        if (commArr.Countries[i].Country == event.target.value) {
            //if the value of element of commArr is same as the element of the selected value and the selected country is stored in event.target.value
            displayResults(commArr.Countries[i]) //after the above statement we get the data and then we pass it to displayResults function
        }
    }
})

fetchAllData();