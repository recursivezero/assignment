// wait for page to load
document.addEventListener('DOMContentLoaded', () => {
    setupApp();
});

// setup everything when page loads
function setupApp() {
    const input = document.getElementById('colorInput');
    const reset = document.getElementById('resetBtn');
    const random = document.getElementById('randomBtn');
    const copy = document.getElementById('copyBtn');
    const clearHist = document.getElementById('clearHistoryBtn');
    
    // listen to user typing
    input?.addEventListener('input', onInputChange);
    input?.addEventListener('paste', onPaste);
    input?.addEventListener('keydown', onKeyPress);
    
    // listen to button clicks
    reset?.addEventListener('click', resetColor);
    random?.addEventListener('click', randomColor);
    copy?.addEventListener('click', copyCode);
    clearHist?.addEventListener('click', clearHistory);
    
    // check scroll position
    window.addEventListener('scroll', moveInputOnScroll);
    
    // show saved colors and make hex clickable
    loadHistory();
    setupHexClick();
    
    // show black color on start
    showDefaultColor();
}

// check if input is correct (6 numbers)
function validateInput(val) {
    if (val === "") return { valid: false, msg: "" };
    if (val.length < 6) return { valid: false, msg: `need ${6 - val.length} more` };
    if (val.length > 6) return { valid: false, msg: "only 6 digits" };
    if (!/^[0-9A-Fa-f]{6}$/.test(val)) return { valid: false, msg: "numbers only" };
    return { valid: true, msg: "" };
}

// show or hide error message
function showError(error) {
    const el = document.getElementById('errorMessage');
    if (!el) return;
    if (error) {
        el.textContent = error;
        el.classList.remove('hidden');
    } else {
        el.classList.add('hidden');
    }
}

// when user types in input
function onInputChange(e) {
    const val = e.target.value;
    const result = validateInput(val);
    const input = e.target;
    
    if (result.valid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        showError("");
        updateColor(val);
    } else {
        if (val !== "") {
            input.classList.add('invalid');
            input.classList.remove('valid');
            showError(result.msg);
        } else {
            input.classList.remove('invalid', 'valid');
            showError("");
        }
    }
}

// when user pastes color code
function onPaste(e) {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text');
    if (!/^[0-9A-Fa-f]{6}$/.test(text)) return;
    e.target.value = text;
    onInputChange({ target: e.target });
}

// when user presses enter
function onKeyPress(e) {
    if (e.key === 'Enter') {
        const val = e.target.value;
        if (validateInput(val).valid) {
            updateColor(val);
        }
    }
}

// convert hex to rgb values
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
}

// change everything when color is updated
function updateColor(colorNum) {
    const hex = '#' + colorNum.toUpperCase();
    const { r, g, b } = hexToRgb(hex);
    
    // update all displays
    const colorDisp = document.getElementById('colorDisplay');
    const hexDisp = document.getElementById('hexDisplay');
    const rgbDisp = document.getElementById('rgbDisplay');
    const footer = document.getElementById('currentColor');
    
    colorDisp && (colorDisp.textContent = colorNum.toUpperCase());
    hexDisp && (hexDisp.textContent = hex);
    rgbDisp && (rgbDisp.textContent = `rgb(${r}, ${g}, ${b})`);
    footer && (footer.textContent = `Color: ${hex}`);
    
    // change page background
    document.body.style.backgroundColor = hex;
    document.querySelector('.page-container').style.backgroundColor = hex;
    
    // update bonus features
    updateColorName(r, g, b);
    updateBrightness(r, g, b);
    updateSwatch(hex);
    saveColor(hex);
}

// show color name like red, blue etc
function updateColorName(r, g, b) {
    const names = {
        '000000': 'Black', 'FFFFFF': 'White', 'FF0000': 'Red', '00FF00': 'Green',
        '0000FF': 'Blue', 'FFFF00': 'Yellow', 'FF00FF': 'Magenta', '00FFFF': 'Cyan',
        'FFA500': 'Orange', 'FF69B4': 'Pink', '800080': 'Purple', 'A52A2A': 'Brown'
    };
    
    const hex = [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
    const name = names[hex] || 'Custom';
    
    const el = document.getElementById('colorNameDisplay');
    el && (el.textContent = name);
}

// show how bright the color is
function updateBrightness(r, g, b) {
    const bright = Math.round(((r * 299 + g * 587 + b * 114) / 1000 / 255) * 100);
    
    const el = document.getElementById('brightnessPercent');
    el && (el.textContent = bright + '%');
    
    const bar = document.getElementById('brightnessBar');
    if (bar) {
        const pos = (bright / 100) * 100;
        bar.style.background = `linear-gradient(to right, #000 0%, #fff 100%), 
                                linear-gradient(to right, #3498db ${pos}%, transparent ${pos}%)`;
    }
}

// show color preview box
function updateSwatch(hex) {
    const el = document.getElementById('colorSwatch');
    el && (el.style.backgroundColor = hex);
}

// save color to history in browser memory
function saveColor(hex) {
    let hist = JSON.parse(localStorage.getItem('colorHistory')) || [];
    hist = hist.filter(c => c !== hex);
    hist.unshift(hex);
    if (hist.length > 5) hist.pop();
    localStorage.setItem('colorHistory', JSON.stringify(hist));
    loadHistory();
}

// load and show color history
function loadHistory() {
    const cont = document.getElementById('colorHistory');
    if (!cont) return;
    
    const hist = JSON.parse(localStorage.getItem('colorHistory')) || [];
    cont.innerHTML = '';
    
    // make 5 boxes for colors
    for (let i = 0; i < 5; i++) {
        const item = document.createElement('div');
        item.className = hist[i] ? 'history-item' : 'history-item empty';
        
        if (hist[i]) {
            item.style.backgroundColor = hist[i];
            item.textContent = hist[i];
            item.addEventListener('click', () => {
                const inp = document.getElementById('colorInput');
                inp.value = hist[i].replace('#', '');
                onInputChange({ target: inp });
            });
        } else {
            item.textContent = '-';
        }
        
        cont.appendChild(item);
    }
    
    // show clear button only if there are saved colors
    const clearBtn = document.getElementById('clearHistoryBtn');
    clearBtn && (clearBtn.style.display = hist.length > 0 ? 'block' : 'none');
}

// delete all saved colors
function clearHistory() {
    if (confirm('Clear history?')) {
        localStorage.removeItem('colorHistory');
        loadHistory();
    }
}

// make hex code clickable to copy
function setupHexClick() {
    const hex = document.getElementById('hexDisplay');
    hex && (hex.addEventListener('click', copyCode), hex.style.cursor = 'pointer');
}

// copy hex code to clipboard
function copyCode() {
    const hex = document.getElementById('hexDisplay')?.textContent;
    if (!hex) return;
    
    navigator.clipboard.writeText(hex).then(() => {
        const btn = document.getElementById('copyBtn');
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = orig), 1500);
    }).catch(() => alert('Copy failed'));
}

// reset to black
function resetColor() {
    const inp = document.getElementById('colorInput');
    inp.value = '';
    inp.classList.remove('valid', 'invalid');
    showError('');
    updateColor('000000');
}

// pick random color
function randomColor() {
    const rand = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const inp = document.getElementById('colorInput');
    inp.value = rand;
    updateColor(rand);
}

// move input box to corner when scrolling
function moveInputOnScroll() {
    const section = document.querySelector('.input-section');
    if (!section) return;
    
    const rect = section.getBoundingClientRect();
    if (rect.top < 50) {
        section.classList.add('scrolled');
    } else {
        section.classList.remove('scrolled');
    }
}

// show black color at start
function showDefaultColor() {
    updateColor('000000');
}
