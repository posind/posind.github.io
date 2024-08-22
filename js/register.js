import { postJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/api.js";

document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("registerButton");

  registerButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Ambil nilai input dari form
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validasi dasar
    if (!username || !email || !password) {
      alert("Silakan isi semua field.");
      return;
    }

    // Persiapkan data yang akan dikirim ke server
    const data = {
      username: username,
      email: email,
      password: password,
    };

    // Tampilkan spinner loading
    document.getElementById("loading-spinner").style.display = "block";

    // Kirim data ke server menggunakan jscrrot
    const target_url =
      "https://asia-southeast2-civil-epigram-429004-t8.cloudfunctions.net/webhook/register";

    postJSON(
      target_url,
      "Content-Type",
      "application/json",
      data,
      function (response) {
        // Sembunyikan spinner loading
        document.getElementById("loading-spinner").style.display = "none";

        if (response.status >= 200 && response.status < 300) {
          if (response.data.token) {
            alert("Pendaftaran berhasil. Token Anda: " + response.data.token);
            // Opsi untuk menyimpan token jika diperlukan
            // localStorage.setItem("token", response.data.token);
            // Reset form setelah pendaftaran berhasil
            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
          } else {
            alert("Pendaftaran: " + response.data.message);
          }
        } else {
          alert("Kesalahan: " + response.data.message);
        }
      }
    );
  });

  document
    .getElementById("show-password-register")
    .addEventListener("change", function () {
      const password = document.getElementById("password");
      password.type = this.checked ? "text" : "password";
    });
});