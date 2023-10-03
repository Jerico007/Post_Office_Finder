const Address = document.getElementById("Address");
const btn = document.getElementById("get-started");

$.getJSON("https://api.ipify.org?format=json", function(data) {
         
// Setting text of element P with id gfg
 

Address.innerText = data.ip;
let url = `https://ipinfo.io/${data.ip}?token=4f481345edc4ce`;

getIpLocation(url);
});


async function getIpLocation(url){ 
   let locations = await FetchData(url);
   // console.log(locations);
   localStorage.setItem("Apidata",JSON.stringify(locations));

}

btn.addEventListener("click",()=>{
   window.location.href = "./mainPage/index.html"
})





