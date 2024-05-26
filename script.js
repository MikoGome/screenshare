const peer = new Peer()

const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const input = document.querySelector("input");
const connectBtn = document.querySelector("button");

peer.on("open", () => {
  h1.textContent = peer.id;

  peer.on("call", (call) => {
    call.answer();
    console.log(call);
    call.on("stream", stream => {
      initializeVideo(stream);
    });
  });

  peer.on("error", error => {
    console.error(error);
  });
});

peer.on("connection", (conn) => {
  document.querySelector("connection").remove();
  console.log('conn', conn);
});

connectBtn.addEventListener("click", async () => {
  const recepientID = input.value;
  const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
  initializeVideo(stream);
  peer.call(input.value, stream);
});

function initializeVideo(stream) {
  const video = document.createElement("video");
  video.muted = true;
  video.autoplay = true;
  video.srcObject = stream;
  video.controls = true;
  document.body.append(video);
}


