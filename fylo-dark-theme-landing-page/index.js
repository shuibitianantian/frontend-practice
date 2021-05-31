const subscribeButton = document.getElementById("subscribe-btn");
const subscribeInput = document.getElementById("subscribe-input");
const errMsg = document.getElementById("error-msg");

// function to validate all the input fields
const validateInput = () => {
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(
      subscribeInput.value
    )
  ) {
    errMsg.style.display = "block";
    return;
  }

  alert("Subscribed!");
};

subscribeButton.addEventListener("click", () => validateInput());

subscribeInput.addEventListener("keydown", () => {
  errMsg.style.display = null;
});
