document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginDetails = {
      email: email,
      password: password,
    };

    try {
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
        const user = await response.json();
        // Store user information in local storage or cookie if needed
        // Redirect to the admin dashboard
        window.location.href = "https://pos.in.my.id/dashboard/";
      } else {
        document.getElementById("error").style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("error").style.display = "block";
    }
  });
