function validateForm(isAdding, id = null) {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];

    // Check if the email exists in the list, excluding the current ID during update
    var emailExists = peopleList.some(function(element) {
        return isAdding ? element.email === email : element.email === email && element.id !== id;
    });

    if (name == "") {
        alert("Name is required");
        return false;
    }
    if (age == "") {
        alert("Age is required");
        return false;
    } else if (age < 1) {
        alert("Age must be a positive number");
        return false;
    }
    if (address == "") {
        alert("Address is required");
        return false;
    }
    if (email == "") {
        alert("Email is required");
        return false;
    } else if (!email.includes("@")) {
        alert("Invalid email address");
        return false;
    } else if (emailExists) {
        alert("This email is already registered");
        return false;
    }
    return true;
}

function showData() {
    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    var html = "";

    peopleList.forEach(function(element, index) {
        html += "<tr>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.date + "</td>";
        html += '<td><button onclick="deleteDate(' + index + ')" class="btn btn-danger">Delete</button> <button onclick="updateData(' + index + ')" class="btn btn-warning">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData();

function AddData() {
    if (validateForm(true)) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;
        var currentDateTime = new Date().toLocaleString();

        var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
        var newId = peopleList.length + 1;

        var newPerson = {
            id: newId,
            name: name,
            age: age,
            address: address,
            email: email,
            date: currentDateTime
        };

        peopleList.push(newPerson);
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
}

function deleteDate(index) {
    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function updateData(index) {
    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    var person = peopleList[index];
    document.getElementById("name").value = person.name;
    document.getElementById("age").value = person.age;
    document.getElementById("address").value = person.address;
    document.getElementById("email").value = person.email;

    document.getElementById("Submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    document.querySelector("#update").onclick = function() {
        if (validateForm(false, person.id)) {
            var currentDateTime = new Date().toLocaleString();

            person.name = document.getElementById("name").value;
            person.age = document.getElementById("age").value;
            person.address = document.getElementById("address").value;
            person.email = document.getElementById("email").value;
            person.date = currentDateTime;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();

            // Reset form and toggle buttons
            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";
            document.getElementById("Submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
    }
}
