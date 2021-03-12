let countrydata = null;
var template = document.getElementById("template").innerHTML;
var modeltemplate = document.getElementById("modeltemp").innerHTML;
var input = document.getElementsByClassName("searchfilter")[0];
var dropdown = document.getElementsByClassName("custom-select ")[0];
var modelon = false;

const data = async () => {
  var url =
    "https://restcountries.eu/rest/v2/all?fields=name;capital;population;flag;region";
  const got = await fetch(url);
  var countries = await got.json();
  console.log(countries);
  countrydata = countries;
  drawboxes(countries);
};
function textsearch() {}
///text searching
input.addEventListener("input", function (e) {
  var searchterm = input.value.toLowerCase();
  if (searchterm.length === 0) {
    drawboxes(countrydata);
  } else {
    var filterd = _.filter(countrydata, function (item) {
      return item["name"].toLowerCase().startsWith(searchterm);
    });
    drawboxes(filterd);
  }
});

///dropdown selecting
dropdown.addEventListener("change", function (e) {
  if (dropdown.value.toLowerCase() !== "region") {
    var filterterm = dropdown.value.toLowerCase();
    var filterd = _.filter(countrydata, function (item) {
      return item["region"].toLowerCase() == filterterm;
    });
    drawboxes(filterd);
  } else {
    drawboxes(countrydata);
  }
});

function drawboxes(countries) {
  var rendered = Mustache.render(template, { countries });
  document.getElementById("target").innerHTML = rendered;
}
function drawmodel(countrydetails) {
  var rendered = Mustache.render(modeltemplate, countrydetails);
  document.getElementById("modeldetails").innerHTML = rendered;
}

data();

var fetchcountry = async (item) => {
  var url = "https://restcountries.eu/rest/v2/name/" + item;
  const got = await fetch(url);
  var countrydata = await got.json();
  drawmodel(countrydata[0]);
};

/////////////////model single details
function func(item) {
  var country = item;
  if (!modelon) {
    document.getElementsByTagName("BODY")[0].classList.add("scroll-none");
    document.getElementById("model").classList.add("d-flex");
  }
  fetchcountry(country);
}
function back() {
  document.getElementsByTagName("BODY")[0].classList.remove("scroll-none");
  document.getElementById("model").classList.remove("d-flex");
}
////theme changer
var light = true;
function themechanger() {
  if (light) {
    light = false;
    document.documentElement.classList.add("themedark");
  } else {
    light = true;
    document.documentElement.classList.remove("themedark");
  }
}
