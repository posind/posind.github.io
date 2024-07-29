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

// Register
document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("registerButton");

  registerButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Ambil nilai input dari form
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Siapkan data untuk dikirim ke server
    const data = {
      username: username,
      email: email,
      password: password,
    };

    // Kirim data ke server menggunakan fetch
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
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Registrasi Berhasil");
          // Reset form setelah registrasi berhasil
          document.getElementById("username").value = "";
          document.getElementById("email").value = "";
          document.getElementById("password").value = "";
        } else {
          alert("Registration : " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Terjadi kesalahan. Silakan coba lagi nanti.");
      });
  });

  // Event listener untuk checkbox "Show Password"
  document
    .getElementById("show-password")
    .addEventListener("change", function () {
      const password = document.getElementById("password");
      if (this.checked) {
        password.type = "text";
      } else {
        password.type = "password";
      }
    });
});
