const ipAddress = document.getElementById("ip-address");
const lat = document.getElementById("lat");
const long = document.getElementById("long");
const city = document.getElementById("city");
const region = document.getElementById("region");
const org = document.getElementById("org");
const host = document.getElementById("host");
const Iframe = document.getElementsByTagName("iframe")[0];
const timeZone = document.getElementById("time-zone");
const dateTime = document.getElementById("date-time");
const pincode = document.getElementById("pincode");
const message = document.getElementById("message");
const cardContainer = document.getElementsByClassName("card-container")[0];
const search = document.getElementById("search");
let data = localStorage.getItem("Apidata");

data = JSON.parse(data);

ipAddress.innerText = data.ip;

let longLat = data.loc.split(",");

lat.innerHTML = longLat[0];
long.innerHTML = longLat[1];

Iframe.src = `https://maps.google.com/maps?q=${longLat[0]}, ${longLat[1]}&z=15&output=embed`;

city.innerText = data.city;

org.innerText = data.org;

region.innerText = data.region;

host.innerText = data.hostname;

//Setting up date and time zone
let India_datetime_str = new Date().toLocaleString("en-US", {
  timeZone: `${data.timezone}`,
});

timeZone.innerText = data.timezone;
dateTime.innerText = India_datetime_str;
pincode.innerText = data.postal;

//Function to fetchPincode data
async function fetchPincodeData() {
  url = `https://api.postalpincode.in/pincode/${data.postal}`;

  let pincodeData = await FetchData(url);
  console.log(pincodeData);
  message.innerText = pincodeData[0].Message;
  addPostDetailsInUI(pincodeData[0].PostOffice);
}

function addPostDetailsInUI(postOffices) {
  cardContainer.innerHTML = "";
  postOffices.forEach((ele) => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<p>${ele.Name}</p>
         <p>${ele.BranchType}</p>
         <p>${ele.DeliveryStatus}</p>
         <p>${ele.District}</p>
         <p>${ele.Division}</p> `;
    cardContainer.appendChild(div);
  });
}

fetchPincodeData();

//Functionality to reset the cards after searching
function resetDetails(cards) {
  Array.from(cards).forEach((val) => {
    val.style.display = "flex";
  });
}

//Search Functionality
function searchDetails(str) {
  let cards = cardContainer.children;

  if (cards.length === 0 || str === "") {
    resetDetails(cards);
    return;
  }
  //Reseting cards before a search
  resetDetails(cards);
  Array.from(cards).forEach((val) => {
    let name = val.children[0].innerText;
    let BranchType = val.children[1].innerText;
    name = name.substring(0, str.length);
    BranchType = BranchType.substring(0, str.length);
    if (
      name.toUpperCase().trim() === str.toUpperCase().trim() ||
      BranchType.toUpperCase().trim() === str.toUpperCase().trim()
    ) {
      val.style.display = "";
    } else {
      val.style.display = "none";
    }
  });
}

//Adding eventListener to search input
search.addEventListener("input", (e) => {
  searchDetails(e.target.value.trim());
});
