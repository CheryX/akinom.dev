const subtitle = document.getElementById('splash');
const subtitles = [
    ":3", "a friendly neighbourhood puppygirl",
    "i have no idea what to type here",
    "mizuki akiyama is my twin", "i am the original starwalker",
    "beware of the cutie who speaks with paws",
    "why do i share my spotify status up there? idk", "roll the katamari!!!", "update: mafuyu is now my twin",
    "blahajs power or something idk", "why are you here.", "update: update: i think mizuki is again my twin",
    "mizuena my beloved :3", "random cs student", "i am so dead inside", "domainn update!!!!", "updated this website",
    "just monika.", "arf", "hello random person visiting this website for uni purposes"
]

function isBirthday() {

    const today = new Date()
    return today.getMonth() == 11 && today.getDate() == 6

}

function shuffleSubtitle() {
    let newSubtitle;

    if (isBirthday()) {
        subtitle.innerText = "🎂 it's my birthday :3";
        return;
    }

    // holy hell i used a do.while loop
    do {
        newSubtitle = subtitles[Math.floor(Math.random() * subtitles.length)];
    } while (newSubtitle === subtitle.innerText && subtitles.length > 1);

    subtitle.innerText = newSubtitle;
}

shuffleSubtitle();

const shuffleButton = document.getElementById('shuffle_button');
shuffleButton.addEventListener('click', () => shuffleSubtitle());