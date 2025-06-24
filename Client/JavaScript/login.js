const loginForm = document.getElementById("loginForm");

// async function - a function that returns a promise
//promise - a container for a future value

// try - a block of code to be executed
// catch - a block of code to be executed if an error occurs

loginForm.addEventListener("submit", async function(event){
    event.preventDefault(); //prevent from refreshing or reloading the page

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        //block of code to be executed
        const response = await fetch("http://localhost:5500/login", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await response.json();
        if(response.ok){
            alert('login successful! Welcome ,')
            window.location.href = 'index.html'
        }else{
            alert(data.message || 'login failed')
        }
    }catch(e){
        //incase an error appears, then catch the error
        console.error('Error', error)
        alert('Something went wrong during login')
    }
})