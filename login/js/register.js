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
            return response.json().then((data) => {
              throw new Error(data.message || 'Network response was not ok');
            });
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
            alert("Registration: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Terjadi kesalahan. Silakan coba lagi nanti.");
        });
    });



  document.getElementById("show-password-register").addEventListener("change", function () {
    const password = document.getElementById("password");
    if (this.checked) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  });
});