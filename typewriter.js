
const style = document.createElement('style');
style.textContent = `
    .hover-char {
        position: relative;
        transition: top 0.1s;
    }
`;
document.head.appendChild(style);

document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('hover-char')) {
        const target = e.target;
        target.style.top = '-1px';
        
        const prev = target.previousElementSibling;
        if (prev && prev.classList.contains('hover-char')) {
            prev.style.top = '-0.5px';
        }
        
        const next = target.nextElementSibling;
        if (next && next.classList.contains('hover-char')) {
            next.style.top = '-0.5px';
        }
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('hover-char')) {
        const target = e.target;
        target.style.top = '';
        
        const prev = target.previousElementSibling;
        if (prev && prev.classList.contains('hover-char')) {
            prev.style.top = '';
        }
        
        const next = target.nextElementSibling;
        if (next && next.classList.contains('hover-char')) {
            next.style.top = '';
        }
    }
});

function wrapCharacters(element) {
    if (['weather_value', 'spotify_value', 'time_value', 'hrt_timer'].includes(element.id)) return;

    if (element.hasChildNodes()) {
        Array.from(element.childNodes).forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                if (child.textContent.trim().length > 0) {
                    const newHtml = Array.from(child.textContent).map(char => {
                        if (char.trim() === '') return char;
                        return `<span class="hover-char">${char}</span>`;
                    }).join('');
                    
                    const wrapper = document.createElement('span');
                    wrapper.innerHTML = newHtml;
                    child.replaceWith(...wrapper.childNodes);
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                if (!['SCRIPT', 'STYLE', 'IMG', 'BR', 'CANVAS', 'SVG', 'META', 'LINK'].includes(child.tagName)) {
                   wrapCharacters(child);
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('main');
    if (main) wrapCharacters(main);
    
    const spiral = document.getElementById('spiral');
    if (spiral) wrapCharacters(spiral);
});

