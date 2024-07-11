document.addEventListener('DOMContentLoaded', (event) => {
    let stream;
    const video = document.getElementById("videoshow");
    const startButton = document.getElementById("strbtn");
    const captureButton = document.getElementById("Capture");
    const stopButton = document.getElementById("closebtn");

    function opencam() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((strm) => {
                stream = strm; // Assign to the global stream variable
                if ("srcObject" in video) {
                    video.srcObject = stream;
                } else {
                    video.src = window.URL.createObjectURL(stream);
                }
                video.play();
                captureButton.style.display = "inline-block";
                stopButton.style.display = "inline-block";
                startButton.style.display = "none";
            }).catch((error) => {
                console.error("Error accessing media devices.", error);
            });
        } else {
            alert("Your browser does not support getUserMedia API.");
        }
    }

    function closecam() {
        if (stream) {
            let tracks = stream.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
            video.srcObject = null;
            captureButton.style.display = "none";
            stopButton.style.display = "none";
            startButton.style.display = "inline-block";
        } else {
            console.log("No stream to stop");
        }
    }

    function capturePhoto() {
        const canvas = document.getElementById('canvas');
        const photoContainer = document.getElementById('photoContainer');
        const context = canvas.getContext('2d');

        context.drawImage(video, 0, 0, 640, 480);
        const imageData = canvas.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = imageData;
        
        photoContainer.appendChild(img);
    }

    startButton.addEventListener("click", opencam);
    stopButton.addEventListener("click", closecam);
    captureButton.addEventListener("click", capturePhoto);

    // Initially hide capture and close buttons
    captureButton.style.display = "none";
    stopButton.style.display = "none";
});
