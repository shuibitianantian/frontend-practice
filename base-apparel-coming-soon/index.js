const button = document.getElementById("arrow-img");
const input = document.getElementById("email-input");

const errorSign = document.getElementById("error-img");
const errorMsg = document.getElementById("error-msg");

input.addEventListener("keydown", () => {
  errorSign.style.display = "none";
  errorMsg.style.display = "none";
  input.style.border = "1px solid hsl(0, 36%, 70%)";
});

button.addEventListener("click", () => {
  const targetStr = input.value;
  const isEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(
      targetStr
    );

  if (!isEmail) {
    errorSign.style.display = "block";
    errorMsg.style.display = "block";
    input.style.border = "2px solid hsl(0, 93%, 68%)";
  } else {
    alert(`Hello ${targetStr}`);
  }
});
