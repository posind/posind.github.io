// Login
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("logemail").value;
    const password = document.getElementById("logpass").value;

    const loginDetails = {
      email: email,
      password: password,
    };

    try {
      console.log("Sending request...");
      const response = await fetch(
        "https://asia-southeast2-civil-epigram-429004-t8.cloudfunctions.net/webhook/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginDetails),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Store the token in local storage or cookie
        localStorage.setItem("token", data.token);
        // Redirect to the admin dashboard
        window.location.href = "https://pos.in.my.id/dashboard/index.html";
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Error: " + (errorData.message || "An error occurred. Please try again later."));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  });

// Event listener for "Show Password" checkbox on login
document
  .getElementById("show-password-login")
  .addEventListener("change", function () {
    const password = document.getElementById("logpass");
    password.type = this.checked ? "text" : "password";
  });
