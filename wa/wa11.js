const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const caption = document.querySelector('.caption'); // Select the caption element

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const images = ['../img/wassilychair.jpg', '../img/pk25chair.jpg', '../img/lilychair.jpg', '../img/readingchair.jpg', '../img/huntingchair.jpg'];

const alts = {
    'wassilychair.jpg': "wassily chair by marcel breuer",
    'pk25chair.jpg': "pk25 chair by poul kjaerholm",
    'lilychair.jpg': "lily chair by arne jacobsen",
    'readingchair.jpg': "reading chair by finn juhl",
    'huntingchair.jpg': "hunting chair by borge mogensen"
};

for (let i = 0; i < images.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', images[i]);

    const fileName = images[i].split('/').pop();
    newImage.setAttribute('alt', alts[fileName]);

    thumbBar.appendChild(newImage);

    newImage.addEventListener('click', (e) => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
        caption.textContent = e.target.alt;
    });
}

btn.addEventListener('click', () => {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
});
