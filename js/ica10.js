let my_var = 100;
var my_other_var = "hello world";
const this_is_a_constant = "constant";
console.log(my_other_var);
my_other_var += "!";

alert("TBEAHUHU.BUAONAOB,RCUHARC")

// how to interact with the DOM
console.log(document.getElementById("headers"));

document.getElementById("headers").addEventListener("click", function(e){
    alert("clicked!!!");
    document.getElementById("paragraph").innerHTML = "im sorry this makes me so uncomfortable";
    document.getElementById("paragraph").style.color = "orange";
    document.getElementById("imgs").src = "../img/ineedit.gif"
})

console.log(document.getElementById("headers").innerHTML);

