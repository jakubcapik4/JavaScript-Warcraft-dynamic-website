document.addEventListener('DOMContentLoaded', () => {
  // Funkcia na presmerovanie
  function redirectTo(url) {
    window.location.href = url;
  }

  // Formulár pre index.html
  const formIndex = document.getElementById('registrationForm');
  const submittedDataIndex = document.getElementById('submittedData');
  if (formIndex && submittedDataIndex) {
    formIndex.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = document.querySelector("input[placeholder='Name']").value;
      const email = document.querySelector("input[placeholder='E-mail']").value;
      const phone = document.querySelector("input[placeholder='Phone Number']").value;
      document.getElementById('nameDisplay').innerText = name;
      document.getElementById('emailDisplay').innerText = email;
      document.getElementById('phoneDisplay').innerText = phone;
      submittedDataIndex.classList.remove('d-none');
    });

    // Kliknutie na submittedData na index.html
    submittedDataIndex.addEventListener('click', function () {
      submittedDataIndex.classList.toggle('d-none');
    });

    // Kliknutie na myButton na index.html
    const myButton = document.getElementById('myButton');
    if (myButton) {
      myButton.addEventListener('click', function () {
        document.getElementById('message').innerText = 'Nič tam nemáme!';
      });
    }
  }

  // Formulár pre visitUs.html
  const formVisitUs = document.getElementById('registrationForm');
  const submittedDataVisitUs = document.getElementById('submittedData');
  if (formVisitUs && submittedDataVisitUs) {
    formVisitUs.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = document.querySelector("input[placeholder='Name & Surname']").value;
      const email = document.querySelector("input[placeholder='E-mail']").value;
      const phone = document.querySelector("input[placeholder='Phone Number']").value;
      const address = document.querySelector("input[placeholder='Address']").value;
      const country = document.querySelector("input[placeholder='Country']").value;
      document.getElementById('nameDisplay').innerText = name;
      document.getElementById('emailDisplay').innerText = email;
      document.getElementById('phoneDisplay').innerText = phone;
      document.getElementById('addressDisplay').innerText = address;
      document.getElementById('countryDisplay').innerText = country;
      submittedDataVisitUs.classList.remove('d-none');
    });
  }

  // Header tlačidlá
  const menuButton = document.getElementById('menuButton');
  if (menuButton) {
    menuButton.addEventListener('click', function () {
      redirectTo('index.html');
    });
  }

  const contactButton = document.getElementById('contactButton');
  if (contactButton) {
    contactButton.addEventListener('click', function () {
      redirectTo('visitUs.html');
    });
  }

  const shopButton = document.getElementById('shopButton');
  if (shopButton) {
    shopButton.addEventListener('click', function () {
      redirectTo('https://eu.shop.battle.net/en-gb');
    });
  }

  // Footer tlačidlá
  const expansionButton = document.getElementById('expansionButton');
  if (expansionButton) {
    expansionButton.addEventListener('click', function () {
      redirectTo('expansions.html');
    });
  }

  const loreButton = document.getElementById('loreButton');
  if (loreButton) {
    loreButton.addEventListener('click', function () {
      redirectTo('lore.html');
    });
  }

  const visitUsButton = document.getElementById('visitUsButton');
  if (visitUsButton) {
    visitUsButton.addEventListener('click', function () {
      redirectTo('visitUs.html');
    });
  }

  const newsButton = document.getElementById('newsButton');
  if (newsButton) {
    newsButton.addEventListener('click', function () {
      redirectTo('visitUs.html');
    });
  }

  const communityButton = document.getElementById('communityButton');
  if (communityButton) {
    communityButton.addEventListener('click', function () {
      redirectTo('visitUs.html');
    });
  }

  const merchButton = document.getElementById('merchButton');
  if (merchButton) {
    merchButton.addEventListener('click', function () {
      redirectTo('visitUs.html');
    });
  }

  const careerButton = document.getElementById('careerButton');
  if (careerButton) {
    careerButton.addEventListener('click', function () {
      redirectTo('visitUs.html');
    });
  }

  const googleButton = document.getElementById('googleButton');
  if (googleButton) {
    googleButton.addEventListener('click', function () {
      redirectTo('http://google.com');
    });
  }
});