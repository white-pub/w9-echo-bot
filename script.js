// script.js
// A. Chen
// updated: 2025/04/07
// 
// Has the javascript function that calls the echo bot api at https://echo-bot-shy-sea-4425.fly.dev/echo
// Note: I could not make the abort work properly, so I deleted all related code and just left the part that worked.


// Call echo bot through api and display result
function makeFetchRequest(inputText) {
    const url = "https://echo-bot-shy-sea-4425.fly.dev/echo"; // API endpoint
    
    fetch(url, { // use fetch to get the response from echo bot api
      method: "POST", // Specify HTTP method
      headers: { //handle header
        "Content-Type": "application/json", // specify data type (json) to server
      },
      body: JSON.stringify({ text: inputText }), // Convert user input to JSON    
    })
      // handle response form server
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`); // Handle non-200 HTTP statuses
        }
        return response.json(); // Parse JSON from the response
      })
      // use the data sent back from the server
      .then((data) => {
        console.log("Transformed Text:", data.text); // Log the transformed text
        const output = document.querySelector(".output_text");
        const full_output = "  From the echo bot: " + data.text
        output.innerHTML = `<p>${full_output}</p>`;
      })
      .catch((error) => { // catch error if fetch fails
            console.error("Error:", error.message);
      });
  }
  

function main() {
    const input = document.querySelector("input[name='echo_input']"); // Select the input field

    input.addEventListener("change", () => {
        const inputText = input.value; // Get the text entered by the user
        makeFetchRequest(inputText); // Send uer input to the fetch function that calls echo bot
    });

    // accept user input when user press "enter"
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
        const inputText = input.value; 
        makeFetchRequest(inputText); 
        }
    });
}


// Run 'main' after the page loads
document.addEventListener("DOMContentLoaded", main);



