// hackathon notes:
//    - make sure desktop notification is not enabled when user is currently on hootsuite page

var requestTimer;
window.onload = function(e) {
    if (!window.Notification || !('serviceWorker' in navigator)) {
        alert('Desktop Notifications/Service Worker not supported');
    }else {
        Notification.requestPermission().then(function(p) {
            if (p === 'denied') {
                alert('You have denied Desktop Notifications');
            } else if (p === 'granted') {
                alert('You have granted Desktop Notifications');
            }
        });
        
        // register service worker
        navigator.serviceWorker.register('sw.js')
        .then(function(swReg){
            console.log('Service Worker is registered', swReg);
            swRegistration = swReg;
        }).catch(function(error){
            console.log(error);
        })
    }
};

function fakePollingNotification() {
    requestTimer = setInterval(function() {
        $.get("https://api.whatdoestrumpthink.com/api/v1/quotes", function(data, status) {
            console.log(data, status);
            var messages = data.messages.personalized;
            var randomMessage = messages[Math.floor(Math.random()*messages.length)];
            generateNotification(randomMessage);
        });
    }, 5000);
}

function stopNotifications() {
    clearInterval(requestTimer);
}

function generateNotification(message) {
    if(!message) {
        message = 'default message';
    }
    var fakeNotification;
    if (Notification.permission === 'denied' ) {
        alert('Please allow notifications before doing this');
    }else {
        var randomSeed = Math.random();
        var options = {
            body: message,
            icon: '../img/Hootsuite-icon.png',
            tag: randomSeed // required unique tag for each Notification,
        };
        fakeNotification = new Notification('Trump says', options);
        fakeNotification.onclick = function() {
            window.open('https://hootsuite.com/');
            fakeNotification.close();
        }
    }
}

var notifRequest = document.getElementById("notifRequest");
var notifStop = document.getElementById('notifStop');
var notifLoop = document.getElementById('notifLoop');

notifRequest.addEventListener('click', function(e) {
    e.preventDefault();
    generateNotification();
});

notifStop.addEventListener('click', function(e) {
   e.preventDefault();
    stopNotifications();
});

notifLoop.addEventListener('click', function(e) {
    e.preventDefault();
    fakePollingNotification();
});
