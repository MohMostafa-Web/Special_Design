// Check if there's value in localStorage Item "color-option"

// console.log(localStorage.getItem('color-option')); // debug

let colorOptionStorage = localStorage.getItem("color-option");

if (colorOptionStorage !== null) {
  // if storage of color-option is not empty

  // Set color-option Storage on :root to Variable "--main-color"
  document.documentElement.style.setProperty("--main-color", colorOptionStorage);

  document.querySelectorAll(".settings-box .colors-list li").forEach((li) => {
    // remove class 'active' for all .color-list Li
    li.classList.remove("active");

    // Add class 'active' to the li which has data-color == colorOptionStorage
    if (li.dataset.color === colorOptionStorage) {
      li.classList.add("active");
    }
  });
}


// Get Random Background Option from Local Stroage
let backgroundOption = true;

// Variable to control the Interval
let backgroundInterval;

// Check if there's value in Local Storage for background-option

let backgroundOptionStorage = localStorage.getItem("background-option");

if (backgroundOptionStorage !== null) {
  // Loop on all .random-background button has class "active" to Remove Class "active"
  document.querySelectorAll(".random-background button").forEach((button) => {
    button.classList.remove("active");

    if (backgroundOptionStorage === "true") {
      backgroundOption = true;
      // Add class "active" to ".random-background button" which its data-background === "yes"
      document.querySelector('.random-background button[data-background="yes"]').classList.add("active");
    } else {
      backgroundOption = false;
      // Add class "active" to ".random-background button" which its data-background === "no"
      document.querySelector('.random-background button[data-background="no"]').classList.add("active");
    }
  });
}


// Check if there's value in localStorage Item "bullets-display"

// console.log(localStorage.getItem('bullets-display')); // debug

// Select Main Nav Bullets
const mainNavBullets = document.querySelector(".nav-bullets");

let bulletsDisplayStorage = localStorage.getItem("bullets-display");

if (bulletsDisplayStorage !== null) {
  // if storage of bullets-display is not empty

  // Set bulletsDisplayStorage to mainNavBullets.style.display
  mainNavBullets.style.display = bulletsDisplayStorage;

  // Loop on all .show-bullets button has class "active" to Remove Class "active"
  document.querySelectorAll(".show-bullets button").forEach((button) => {
    button.classList.remove("active");

    if (bulletsDisplayStorage === "block") {
      // Add class "active" to ".random-background button" which its data-bullets === "yes"
      document.querySelector('.show-bullets button[data-bullets="yes"]').classList.add("active");
    } else {
      // Add class "active" to ".random-background button" which its data-bullets === "no"
      document.querySelector('.show-bullets button[data-bullets="no"]').classList.add("active");
    }
  });
}


// Click on "settings-button", It will toggle class "fa-spin" to firstElementChild "i.fa-gear", also class "open" to parentElement "settings-box"

document.querySelector(".settings-button").onclick = function () {
  // Toggle class "fa-spin" on "i.fa-cog" for rotation on self
  this.firstElementChild.classList.toggle("fa-spin");

  // Toggle class "open" on "settings-box"
  this.parentElement.classList.toggle("open");
};


// Switch Colors (Select main-color)

const colorsLi = document.querySelectorAll(".settings-box .colors-list li");

// console.log(colorsLi); // debug

// Loop on All Li
colorsLi.forEach((li) => {
  // Click on every Li
  li.addEventListener("click", (e) => {
    // console.log(e.target.getAttribute('data-color')); // debug

    // Set Color on :root
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    // Set or Save Color on Local Storage named "color-option"
    localStorage.setItem("color-option", e.target.dataset.color);

    // Loop on all Li has class "active" to remove class "active" and add class "active" to clicked Li
    handleActiveState(e);
  });
});


// toggle Random Background option

document.querySelectorAll(".random-background button").forEach((button) => {
  // Click on every button
  button.onclick = function (e) {
    // Loop on all ".random-background button" has class "active" to Remove Class "active" and Add class "active" to clicked ".random-background button"
    handleActiveState(e);

    // console.log(e.target.dataset.background); // debug

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeBackgroundImgs();
      // Add or Save "true" in localstorage Item "background-option"
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      // Add or Save "false" in localstorage Item "background-option"
      localStorage.setItem("background-option", false);
    }
  };
});


// Show Bullets Option

// loop over ".show-bullets button"
document.querySelectorAll(".show-bullets button").forEach(button => {
  button.addEventListener('click', e => {
    if (e.target.dataset.bullets === "yes") {
      mainNavBullets.style.display = "block";
      // Add or Save mainNavBullets.style.display in localstorage Item "bullets-display"
      localStorage.setItem('bullets-display', mainNavBullets.style.display);
    } else {
      mainNavBullets.style.display = "none";
      // Add or Save mainNavBullets.style.display in localstorage Item "bullets-display"
      localStorage.setItem('bullets-display', mainNavBullets.style.display);
    }


    // Loop on all ".show-bullets button" has class "active" to Remove Class "active" and Add class "active" to clicked ".show-bullets button"
    handleActiveState(e);
  });
});


// Click button "reset-options" to clear Local Storage for all items and Reload the page
document.querySelector(".reset-options").addEventListener("click", e => {
  localStorage.clear();
  // localStorage.removeItem("color-option");
  // localStorage.removeItem("background-option");
  // localStorage.removeItem("bullets-display");
  location.reload();
});


// Click on Icon "i.fa-bars" to show links menu

// select main nav links
const mainNavLinks = document.querySelector(".landing-page .header-area .links");
const meunIcon = document.querySelector(".landing-page .header-area i");

meunIcon.addEventListener("click", e => {
  e.stopPropagation(); // stop propgation on menuIcon when click on any of childElements except the element has a event click
  e.target.classList.toggle("active");
  mainNavLinks.classList.toggle("open");
});

// stop propgation on mainNavLinks when click on any of childElements except the element has a event click
mainNavLinks.onclick = function (e) {
  e.stopPropagation();
}

// When Click on anywhere on the page except menuIcon and mainNavLins => close links menu
document.addEventListener("click", e => {
  if (e.target !== meunIcon && e.target !== mainNavLinks) {
    // console.log(e.target); // debug
    if (meunIcon.classList.contains("active") && mainNavLinks.classList.contains("open")) {
      meunIcon.classList.toggle("active");
      mainNavLinks.classList.toggle("open");
    }
  }
});


// Changing Background Image for div.landing-page

// Select Landing Page Element
const landing_page = document.querySelector(".landing-page");

// Get Array of Images
const imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function to Randomize Background Images
function randomizeBackgroundImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let i = Math.floor(Math.random() * imgsArray.length);

      // Change Background Images URL
      landing_page.style.backgroundImage = "url(images/" + imgsArray[i] + ")";
    }, 1000);
  }
}

randomizeBackgroundImgs();


// Animates ".Skill-progress span" when you'r scrolling to the ".our-skills" section

// Select ".our-skills"
let ourSkills = document.querySelector(".our-skills");

window.onscroll = function () {
  // Our Skills OffsetTop
  let skillsOffsetTop = ourSkills.offsetTop; // distance between top of page and top of Element
  // console.log("Skills OffsetTop = " + skillsOffsetTop); // debug

  // Our Skills OuterHeight
  let skillsOuterHeight = ourSkills.offsetHeight; // Height + padding + border + scroll
  // console.log("Skills OuterHeight = " + skillsOuterHeight); //debug

  // Window Height
  let windowHeight = this.innerHeight; // length of innerHeight for Page (without Scroll bar or Tool Bar)
  // let windowHeight = this.outerHeight; // length of outerHeight for Page (including Scroll bar or Tool Bar)
  // console.log("Window Height = " + windowHeight); //debug

  // Window ScrollTop
  // let windowScrollTop = this.pageYOffset; // length of ScrollY, alternate 'window.scrollY;'
  let windowScrollTop = this.scrollY; // length of ScrollY, alternate 'window.scrollY;'
  // console.log("Window ScrollTop = " + windowScrollTop); //debug

  // console.log(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)); // debug

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    // Select all skills
    let allSkills = document.querySelectorAll(
      ".our-skills .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};


// Create a popup contains a image when we click on this image from gallery

// Select these images inside gallery
let imgsGallery = document.querySelectorAll(".our-gallery .gallery-content img");

// Loop Over these images
imgsGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create element div with class name "popup-overlay"
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    // Append popupOverlay to body
    document.body.appendChild(popupOverlay);

    // Create element div with class name "popup-box" contains element img which src = src of clicked image
    const popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    // Create element img
    const popupImage = document.createElement("img");
    // Set Image Source
    popupImage.src = img.src;
    // Append popupImage to popupBox
    popupBox.appendChild(popupImage);

    // Append popupBox to body
    document.body.appendChild(popupBox);

    // add alt of img
    if (img.alt !== "") {
      // console.log(img.alt); // debug

      // Create Heading for Image from alt of clicked img
      // Create element h3
      const imgHeading = document.createElement("h3");
      // Set h3 textContent with img.alt
      imgHeading.textContent = img.alt;
      // Append h3 to popupBox
      popupBox.appendChild(imgHeading);
    }

    // Create Close button
    // Create element span
    const closebutton = document.createElement("span");
    // Add textContent to closebutton
    closebutton.textContent = "X";
    // Add ClassName to closebutton
    closebutton.className = "close-button";
    // Append closebutton to popupBox
    popupBox.appendChild(closebutton);
  });
});

// When click close-span remove popup-box and popup-overlay
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    // remove current popup-box
    e.target.parentNode.remove();
    // remove popup-overlay
    document.querySelector(".popup-overlay").remove();
  }
});


// Select Naviagtion Bullets
const navBullets = document.querySelectorAll('.nav-bullets .bullet');

// Select Naviagtion Links
const navLinks = document.querySelectorAll('.landing-page .header-area .links a');

// When click a link in navbar, add class "active" to it and remove class "active" from others
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.target.parentElement.parentElement.querySelectorAll('.active').forEach(el => {
      el.classList.remove('active');
    });
    e.target.classList.add('active');
  });
});

// Create Function Scroll to section on click
function scrollToSection (selectors) {
  selectors.forEach(selector => {
    selector.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  });
}

// When click on a sepcific bullet, scroll to a sepcific section
scrollToSection(navBullets);

// When click on a sepcific link, scroll to a sepcific section
scrollToSection(navLinks);


// Create Handle Active State Function
function handleActiveState (ev) {
  // Remove class "active" from all siblings
  ev.target.parentElement.querySelectorAll('.active').forEach(el => {
    el.classList.remove('active');
  });
  // Add class "active" on self
  ev.target.classList.add('active');
}