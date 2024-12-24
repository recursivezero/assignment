import { IndiaMap } from './modules/IndiaMap.js';
import { setupThemeToggle } from './modules/ThemeToggle.js';
import { MAP_CONFIG } from './config/mapConfig.js';

document.addEventListener('DOMContentLoaded', () => {
    window.indiaMap = new IndiaMap(MAP_CONFIG);
    window.indiaMap.loadData();
    setupThemeToggle();
});