document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("registerButton");
  
    registerButton.addEventListener("click", function (event) {
      event.preventDefault();
  
      // Get input values from the form
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      // Basic validation
      if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }
  
      // Prepare data to send to the server
      const data = {
        username: username,
        email: email,
        password: password,
      };
  
      // Show loading spinner
      document.getElementById("loading-spinner").style.display = "block";
  
      // Send data to the server using fetch
      fetch(
        "https://asia-southeast2-civil-epigram-429004-t8.cloudfunctions.net/webhook/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || "Network response was not ok");
            });
          }
          return response.json();
        })
        .then((data) => {
          // Hide loading spinner
          document.getElementById("loading-spinner").style.display = "none";
  
          if (data.token) {
            alert("Registration successful. Your token: " + data.token);
            // Optionally store the token if needed
            // localStorage.setItem("token", data.token);
            // Reset form after successful registration
            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
          } else {
            alert("Registration: " + data.message);
          }
        })
        .catch((error) => {
          document.getElementById("loading-spinner").style.display = "none";
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        });
    });
  
    document
      .getElementById("show-password-register")
      .addEventListener("change", function () {
        const password = document.getElementById("password");
        password.type = this.checked ? "text" : "password";
      });
  });