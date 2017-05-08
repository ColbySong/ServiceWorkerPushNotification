window.onload = function(e) {
    if (!window.Notification) {
        alert('Desktop Notifications not supported');
    }else {
        Notification.requestPermission().then(function(p) {
            console.log(Notification.permission);
            if (p === 'denied') {
                alert('You have denied Desktop Notifications');
            } else if (p === 'granted') {
                alert('You have granted Desktop Notifications');
            }
            console.log(Notification.permission);
        });
    }
};

function generateNotification() {
    var fakeNotification;
    if (Notification.permission === 'default' ) {
        alert('Please allow notifications before doing this');
    }else {
        fakeNotification = new Notification('New Fake Message');
    }
}

var notifRequest = document.getElementById("notifRequest");
var notifStop = document.getElementById('notifStop');

notifRequest.addEventListener('click', function(e) {
    e.preventDefault();
    generateNotification();
});
