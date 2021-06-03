const urlInputElement = document.getElementById("url-input");
const submitButton = document.getElementById("submit-btn");
const shortUrlContainer = document.getElementById("urls-container");

function createUrlElement(originalUrl, shortUrl) {
  const divElement = document.createElement("div");

  divElement.innerHTML = `<p>${originalUrl}</p>
 <div><p>${shortUrl}</p><p class="primary-btn" onclick="this.innerText = 'Copied!'; this.style.backgroundColor = 'hsl(257, 27%, 26%)'">copy</p></div>
  `;
  divElement.style.marginTop = "20px";

  shortUrlContainer.appendChild(divElement);
}

submitButton.addEventListener("click", () => {
  const value = urlInputElement.value;
  try {
    const url = new URL(value);
    // following codes will take some time to execute
    fetch(`https://api.shrtco.de/v2/shorten?url=${url.href}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        createUrlElement(value, res.result.full_short_link);
      });
  } catch (_) {
    alert("Invalid url");
  }
});
