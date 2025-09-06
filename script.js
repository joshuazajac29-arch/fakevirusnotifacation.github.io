let notificationInterval;
let counter = 0;
const images = [
    'https://placekitten.com/200/200',
    'https://placehold.co/200x200/3498db/white',
    'https://placehold.co/200x200/e74c3c/white'
];

// Request notification permission
function requestNotificationPermission() {
    if (!("Notification" in window)) {
        alert("This browser does not support notifications");
        return;
    }
    
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            document.getElementById('status').textContent = 'Status: Permission granted';
        } else {
            document.getElementById('status').textContent = 'Status: Permission denied';
        }
    });
}

// Send notification with image
function sendNotification() {
    if (Notification.permission !== "granted") {
        document.getElementById('status').textContent = 'Status: Please grant notification permission first';
        return;
    }
    
    counter++;
    const imageIndex = counter % images.length;
    const notification = new Notification('Regular Update', {
        body: `This is notification #${counter} with an image!`,
        icon: images[imageIndex],
        image: images[imageIndex]
    });
    
    document.getElementById('status').textContent = `Status: Last notification sent at ${new Date().toLocaleTimeString()}`;
    
    // Close notification after 5 seconds
    setTimeout(() => {
        notification.close();
    }, 5000);
}

// Start notifications
document.getElementById('startBtn').addEventListener('click', () => {
    if (Notification.permission === "default") {
        requestNotificationPermission();
    }
    
    if (Notification.permission === "granted") {
        sendNotification(); // Send immediately
        notificationInterval = setInterval(sendNotification, 30000); // Then every 30 seconds
        document.getElementById('status').textContent = 'Status: Notifications started';
    }
});

// Stop notifications
document.getElementById('stopBtn').addEventListener('click', () => {
    clearInterval(notificationInterval);
    document.getElementById('status').textContent = 'Status: Notifications stopped';
});

// Request permission when page loads
window.addEventListener('load', requestNotificationPermission);
