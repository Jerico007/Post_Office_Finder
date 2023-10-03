
window.onload = function(){
   if(localStorage.getItem("redirected"))
   {
    localStorage.clear();
   }
}



navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onSuccess(position)
{
   
    localStorage.setItem("redirected",true);
    let link = document.createElement("a");

    link.href = "./getStarted/index.html";

    link.click();
}

function onError(error) {
    alert(error.message);
}