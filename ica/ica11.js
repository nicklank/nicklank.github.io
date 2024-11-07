function tellFortune(numChildren, partnerName, location, jobTitle) {
    return `You will be a ${jobTitle} in ${location}, and married to ${partnerName} with ${numChildren} kids.`;
}

// Update each paragraph individually
document.getElementById("para1").innerHTML = tellFortune(2, "Leslie", "Texas", "Software Engineer");
document.getElementById("para2").innerHTML = tellFortune(0, "Raphaelle", "Francois", "Bakery");
document.getElementById("para3").innerHTML = tellFortune(3, "Ben", "Italian", "Taco Baco");
