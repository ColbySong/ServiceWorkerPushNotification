self.addEventListener('install', function(e) {
    console.log('installing service worker');
});

self.addEventListener('activate', function(e) {
    console.log('activating service worker');
    if (Notification.permission === 'granted') {
        setInterval(function() {
            fetch("https://api.whatdoestrumpthink.com/api/v1/quotes", {credentials: 'include'})
            .then(function(response) {
                    response.json().then(function(data) {
                        var messages = data.messages.personalized;
                        var randomMessage = messages[Math.floor(Math.random()*messages.length)];
                        var options = {
                            body: randomMessage,
                            tag: randomMessage,
                        };
                        self.registration.showNotification('Trump says', options);
                    })
            })
        }, 6000);
    }
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
});