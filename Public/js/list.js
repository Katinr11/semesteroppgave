
let allUsersLists = [];
let currentList = null;

async function updateList(list) {
   
    const request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(list)
    };

    const response = await fetch("/list/" + list.id, request);
    if (response.status <= 202) {
        // Alt ok, bruker logget inn, res. status
    } else {
        // Håndtere feil som er oppstått
    }
}

async function createNewList(name,userID) {
    const newListName = getValueOf("createNewListName");
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, userID })
    };

    const response = await fetch("/list", request);
    if (response.status <= 202) {
       const list = await response.json()
        allUsersLists.push(list);
        
    } else {
        // Håndtere feil som er oppstått
    }
}

async function refreshListData(userID) {
    
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };

    const response = await fetch("/list/user/"+ userID, request);
    if (response.status <= 202) {
        allUsersLists = await response.json()
        allUsersLists = (allUsersLists) ? allUsersLists:[];
        allUsersLists.forEach(element => {
            element.items = JSON.parse(element.items);
        });
        refreshListDisplays()
    } else {
        // Håndtere feil som er oppstått
    }
}

async function deleteList(list){
    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(list)
    };

    const response = await fetch("/list/" + list.id, request);
    if (response.status <= 202) {
        // Alt ok, bruker logget inn, res. status
    } else {
        // Håndtere feil som er oppstått
    }

}
