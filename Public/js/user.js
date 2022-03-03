let isUserLogedIn = false;
let currentUser = null;



async function logInUser() {
    const email = getValueOf("signInUserName");
    const password = getValueOf("sigInPassword");
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    };

    const response = await fetch("/user/login", request);
    if (response.status <= 202) {
        // Alt ok, bruker logget inn, res. status 
        hideElements(['signInForm']);
        currentUser = await response.json();
        isUserLogedIn = true;
        await refreshListData(currentUser.id)
        showListUI();
    }
    else {
        // Håndtere feil som er oppstått;
        alert("Feil brukernavn eller passord")
    }
}

async function createUser() {
    const userName = getValueOf("userName");
    const email = getValueOf("email");
    const password = getValueOf("password");
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
    };

    const response = await fetch("/user", request);
    if (response.status <= 202) {
        // Alt ok, bruker logget inn, res. status 202
        hideElements(['signUpForm']);
        currentUser = await response.json();
        isUserLogedIn = true;
        await refreshListData(currentUser.id)
        showListUI();
    } else {
        // Håndtere feil som er oppstått : alert("Feil brukernavn eller passord")
    }
}