let ourObject = {
    "name": "nick",
    "profession": "squirrel wrangler",
    "age": 23}
 
console.log(ourObject);

    let myData = {};

    function fetchData() {
        fetch('https://catfact.ninja/fact')
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.log(res);
                }
            })
            .then(data => {
                myData = data;
                console.log(myData);
                document.getElementById("fact").innerText = myData.fact;
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    // Fetch a new fact when the button is clicked
    document.getElementById("generate").addEventListener("click", e => {
        fetchData();
    });
    fetchData();
    


// Example of using a template literal
// let name = "nick";
// let myString = `Hello ${name}!`;
// console.log(myString);

// use backtick