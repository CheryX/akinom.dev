const mePhotos = [
    { src: "me/train.png", text: "aki & train" },
    // { src: "me/photo1.jpg", text: "silly" },
    { src: "me/monter.png", text: "3am monter" },
    { src: "me/cute.jpg", text: ":3" }
];

const meImg = document.querySelector('#me > img');
const meDesc = document.querySelector('#me > span');
const meShuffle = document.getElementById('me_shuffle');

let currentIndex = 0;

function nextMe() {
    currentIndex = (currentIndex + 1) % mePhotos.length;
    const newPhoto = mePhotos[currentIndex];

    meImg.src = newPhoto.src;
    meImg.alt = newPhoto.text;
    meDesc.innerText = newPhoto.text;
}

if (meShuffle) {
    meShuffle.addEventListener('click', nextMe);
}
