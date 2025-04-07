let homeTimeZone = "Australia/Canberra";

let cbr = document.getElementById("canberra");
let nep = document.getElementById("nepal");
let usa = document.getElementById("USA");
let alarmInput = document.getElementById("alarm");

function updateTime() {
    if (!homeTimeZone) return;

    let d = new Date();
    cbr.innerHTML = d.toLocaleTimeString("en-AU", { timeZone: "Australia/Canberra" });
    nep.innerHTML = d.toLocaleTimeString("en-AU", { timeZone: "Asia/Kathmandu" });
    usa.innerHTML = d.toLocaleTimeString("en-AU", { timeZone: "America/New_York" });
    let homeTime = new Date().toLocaleTimeString("en-AU", { 
        timeZone: homeTimeZone, 
        hour: "2-digit", 
        minute: "2-digit",
        hour12: false
    });

    let [homeHr, homeMin] = homeTime.split(":");

    let alarmTime = alarmInput.value;
    if (alarmTime) {
        let [alarmHr, alarmMin] = alarmTime.split(":");
        if (parseInt(homeHr) === parseInt(alarmHr) && parseInt(homeMin) === parseInt(alarmMin)) {
            let audio = new Audio("https://file-examples.com/storage/feba87552467d8774957b57/2017/11/file_example_MP3_700KB.mp3");
            audio.play();
        }
    }
}

document.querySelectorAll(".btn-2").forEach((button) => {
    button.addEventListener("click", function () {
        let selectedZone = this.getAttribute("data-zone");
        if (selectedZone) {
            homeTimeZone = selectedZone;
        }
        document.querySelectorAll(".selected-message").forEach(el => el.innerHTML = "");
        this.closest(".card-body").previousElementSibling.querySelector(".selected-message").innerHTML = "<p>Selected</p>";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let canberraButton = document.querySelector('[data-zone="Australia/Canberra"]');
    if (canberraButton) {
        let canberraCard = canberraButton.closest(".card-body").previousElementSibling.querySelector(".selected-message");
        if (canberraCard) {
            canberraCard.innerHTML = "<p>Selected</p>";
        }
    }
});


setInterval(updateTime, 1000);
