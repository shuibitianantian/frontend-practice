const detailsNodes = document.getElementsByClassName("job-card-details");
const filterRules = document.getElementById("filter-rules");
const clearBtn = document.getElementById("clear-btn");
const filterBar = document.getElementById("filter-bar");
const jobCards = document.getElementsByClassName("job-card");

let filterRulesSet = new Set();

/**
 * hide all job cards
 */
function hideAllJobs() {
  for (let child of jobCards) {
    child.style.display = "none";
  }
}

/**
 * show all job cards
 */
function showAllJobs() {
  for (let child of jobCards) {
    child.style.display = "flex";
  }
}

/**
 * render filter bar, if filter rules is size 0, hide the bar
 * @returns None
 */
function renderFilterBar() {
  filterRules.innerHTML = "";

  if (filterRulesSet.size === 0) {
    filterBar.style.display = "none";
    return;
  }

  for (let rule of filterRulesSet) {
    filterRules.appendChild(createFilterItem(rule));
  }

  filterBar.style.display = "flex";
}

/**
 * remove rule from filter rule set
 * @param {string} rule
 */
function removeFilterRule(rule) {
  filterRulesSet.delete(rule);
  renderFilterBar();
  renderJobList();
}

/**
 * create filter item of filter bar
 * @param {string} rule
 * @returns HTMLNode
 */
function createFilterItem(rule) {
  const div = document.createElement("div");
  div.classList.add("rule-item");

  const ruleTextNode = document.createElement("p");
  ruleTextNode.innerText = rule;

  const closeButton = document.createElement("p");
  closeButton.addEventListener("click", () => removeFilterRule(rule));
  closeButton.classList.add("close-btn");
  closeButton.innerText = "X";

  div.appendChild(ruleTextNode);
  div.appendChild(closeButton);

  return div;
}

function renderJobList() {
  if (filterRulesSet.size === 0) {
    showAllJobs();
    return;
  }

  hideAllJobs();
  for (let child of jobCards) {
    const details =
      child.getElementsByClassName("job-card-details")[0].children;

    for (let i = 0; i < details.length; i++) {
      if (filterRulesSet.has(details[i].innerText)) {
        child.style.display = "flex";
        break;
      }
    }
  }
}

function addFilterRule(rule) {
  filterRulesSet.add(rule);
  renderFilterBar();
  renderJobList();
}

function resetFilterRule() {
  filterRulesSet = new Set();
  filterRules.innerHTML = "";
  filterBar.style.display = null;
  renderJobList();
}

clearBtn.addEventListener("click", () => resetFilterRule());

for (let child of detailsNodes) {
  for (let span of child.children) {
    span.addEventListener("click", () => addFilterRule(span.innerText));
  }
}
