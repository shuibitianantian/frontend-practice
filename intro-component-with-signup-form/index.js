// get all input items
const inputItems = document.getElementsByClassName("input-item");

// get the subscribe button, and add event listener of click
const subscribeButton = document.getElementById("subscribe");

const deconstructingInputItem = (element) => {
    return {
        name: element.getAttribute("name"),
        inputElement: element.querySelector("input"),
        errorImg : element.querySelector("img"),
        errorMsg : element.querySelector("p")
    }
}

// function to validate all the input fields
const validateInput = (element) => {
    const {name, inputElement, errorImg, errorMsg} = deconstructingInputItem(element);

    switch(name) {
        // validate email
        case "email":
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(
                inputElement.value
              )) {
                errorImg.style.display = "block";
                errorMsg.style.display = "block";
                return false
              }
              break;
        // validate other inputs
        default:
            if (inputElement.value === '') {
                errorImg.style.display = "block";
                errorMsg.style.display = "block";
                return false;
            }
            break;
    }
    return true;
}


subscribeButton.addEventListener("click", () => {
    const results = Array.from(inputItems).map(element => {
        return validateInput(element);
    });

    // if all inputs are valid, then show following alert
    if (results.every(x => x === true)) {
        alert("Register successfully")
    }
})

// once we change the value of input, the error should be hidden.
Array.from(inputItems).forEach( element => {
    const {inputElement, errorImg, errorMsg} = deconstructingInputItem(element);

    inputElement.addEventListener("keydown", () => {
        errorImg.style.display = null;
        errorMsg.style.display = null;
    })
})