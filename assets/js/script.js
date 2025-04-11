const topNavbar = document.querySelector(".navbar");
const sideNavbar = document.getElementById("sideNavbar");
const homeSection = document.getElementById("home");
const homeLink = document.querySelector('#sideNavbar a[href="#home"]');

function toggleNavbar() {
  const isInHome = window.scrollY < homeSection.offsetTop + homeSection.offsetHeight - 100;
  topNavbar.classList.toggle("d-none", !isInHome);
  sideNavbar.classList.toggle("d-none", isInHome);
}

window.addEventListener("scroll", toggleNavbar);

homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  topNavbar.classList.remove("d-none");
  sideNavbar.classList.add("d-none");
});

toggleNavbar(); // Run on page load





document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page reload

  //  e.target se current form milta hai (yaha "contact-form").
  const form = e.target; 
  const data = new FormData(form);

  fetch("https://formspree.io/f/myzelarz", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      document.getElementById("response-message").innerHTML = "Thank you! Your message has been sent.";
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          document.getElementById("response-message").innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          document.getElementById("response-message").innerHTML = "Oops! There was a problem submitting your form.";
        }
      });
    }
  }).catch(error => {
    document.getElementById("response-message").innerHTML = "Oops! There was a problem submitting your form.";
  });
});


document.getElementById("year").textContent = new Date().getFullYear();