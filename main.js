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
