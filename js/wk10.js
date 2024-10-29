let my_var = 100;
var my_other_var = "hello world yar";

console.log("my_other_var")
const this_is_a_constant = "constant";

my_other_var += "!" ;

alert("TBEAHUHU.BUAONAOB,RCUHARC")

// how to interact with the DOM
console.log(document.getElementById("my_head"));

document.getElementById("my_head").addEventListener("click", function(e){
    alert("clicked");
    document.getElementById("paragraph").innerHTML = "this is something";
    document.getElementById("PARAGRAPH").style.color = "blue";
    document.getElementById("imgs").src = "../img/ineedit.gif";
})

console.log(document.getElementById("my_head").innerHTML)

