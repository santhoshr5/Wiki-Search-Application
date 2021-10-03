let searchInputEl = document.getElementById('searchInput')
let searchResultsEl = document.getElementById("searchResults")
let spinnerEl = document.getElementById("spinner")

function createAndAppendResults(result) {

    
    let {
        link,
        title,
        description
    } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl)

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);



}

function displayResult(searchResults) {
    for (let result of searchResults)
        createAndAppendResults(result)
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none")
        let searchInput = searchInputEl.value
        searchResultsEl.textContent = ""

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput

        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = (jsonData)
                displayResult(search_results)
                spinnerEl.classList.toggle("d-none")
            })
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia)