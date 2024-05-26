const peer = new Peer()

const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const input = document.querySelector("input");
const connectBtn = document.querySelector("button");
const video = document.querySelector("video");
let myStream;

peer.on("open", () => {
  h1.textContent = peer.id;

  peer.on("call", (call) => {
    call.answer();
    call.on("stream", stream => {
      initializeVideo(stream);
      if(myStream) {
        myStream.getTracks().forEach(track => track.stop());
      }
    });

  });

  peer.on("error", error => {
    console.error(error);
  });
});

connectBtn.addEventListener("click", async () => {
  const recepientID = input.value;
  myStream = await navigator.mediaDevices.getDisplayMedia({video: true});
  initializeVideo(myStream);
  peer.call(input.value, myStream);
});

function initializeVideo(stream) {
  video.muted = true;
  video.autoplay = true;
  video.srcObject = stream;
  video.controls = true;
}


