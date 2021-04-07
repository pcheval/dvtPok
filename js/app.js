const container = document.querySelector('.container');

const showPoks = () => {

  let output = '';

  fetch('https://pokedex-server-tp.herokuapp.com/api/pokemon')
    .then((response) => response.json())
    .then((poks) => {
      poks.forEach(
        ({ name, image }) =>
          (output += `
                  <div class="card">
                    <img class="card--avatar" src=${image} />
                    <h1 class="card--title">${name}</h1>
                    <button type="button" class="card--button" data-name=${name}>Catch</button>
                  </div>
                  `)
      );

      container.innerHTML = output;

      // Parcourir les boutons (classe ".card--button"), et appliquer myShowNotification sur click
      const btns = document.querySelectorAll(".card--button");
      btns.forEach((btn) => {
        btn.addEventListener('click', myShowNotification, false)
      })

    });

};


// .card--button
// 
// querySelectorAll => liste pour boucler
// const notificationButton = document.querySelector('#show-notification');
// notificationButton.addEventListener('click', myShowNotification);


const myShowNotification = () => {
  /**
   * ici nous allons demander permission pour envoyer une notification puis nous allons l'envoyer
   */
  /* '../images/icons/icon-192x192.png' */

  /* >Math.floor(Math.random() * 10) returns a random integer between 0 and 9 (both included):
     Si > 5 alors msg = ok 
     Si > 5 alors msg = k o
  */
   var v1 = Math.floor(Math.random() * 10);
   var msg = ' inférieur ou égal à 5';
   if (v1 > 5)
     msg = ' supérieur à 5';

  Notification.requestPermission((result) => {
    if (result === "granted")
    {
      const options = {
        body: 'Une notification avec option !',
        icon: '../images/icons/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
        id: 'NEW_MESSAGE'
        },
      };
        
      navigator.serviceWorker.getRegistration().then(reg => {
        reg.showNotification('Hello ! ' + msg, options);
      })

    }
  })
}

  
document.addEventListener('DOMContentLoaded', showPoks);

const notificationButton = document.querySelector('#show-notification');
notificationButton.addEventListener('click', myShowNotification);


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((res) => console.log('service worker registered'))
      .catch((err) => console.log('service worker not registered', err));
  });
}
