document.addEventListener('DOMContentLoaded', async () => {
  const indiaSvg = document.getElementById('india-map');
  const popup = document.getElementById('state-popup');
  const popupStateName = document.getElementById('popup-state-name');
  const popupStateInfo = document.getElementById('popup-state-info');
  const popupStateImage = document.getElementById('popup-state-image');
  const closePopup = document.querySelector('.close-popup');
  const copyButton = document.querySelector('.copy-button');
  const seeMoreButton = document.getElementById('see-more-button');
  const homeButton = document.getElementById('home-button');

  let statesData = {};

  // 1. Fetch States Data
  async function fetchStatesData() {
    try {
      const response = await fetch('assets/states.json');
      if (!response.ok) throw new Error('Failed to load state data');
      statesData = await response.json();
    } catch (error) {
      console.error('Error fetching states data:', error);
      alert('Unable to load states data. Please try again later.');
    }
  }

  // 2. Load State SVGs Dynamically
  async function loadStateSVGs() {
    const statesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    statesGroup.setAttribute('id', 'india-states');
    indiaSvg.setAttribute('viewBox', '0 0 1500 1800');

    const loadPromises = Object.keys(statesData).map(async (stateKey) => {
      const stateInfo = statesData[stateKey];
      try {
        const response = await fetch(stateInfo.svg);
        const svgText = await response.text();

        // Parse SVG paths
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = svgText;
        const statePaths = tempDiv.querySelectorAll('path');

        statePaths.forEach((path) => {
          const clonedPath = path.cloneNode(true);
          clonedPath.setAttribute('data-state', stateKey);
          addEventListenersToState(clonedPath, stateInfo);
          statesGroup.appendChild(clonedPath);
        });
      } catch (error) {
        console.error(`Error loading SVG for ${stateKey}:`, error);
      }
    });

    await Promise.all(loadPromises);
    indiaSvg.appendChild(statesGroup);
  }

  // 3. Add Event Listeners to States
  function addEventListenersToState(path, stateInfo) {
    const tooltip = document.createElement('div');
    tooltip.style.position = 'fixed';
    tooltip.style.backgroundColor = 'rgba(0,0,0,0.7)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px 15px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.display = 'none';
    tooltip.style.zIndex = '1000';
    tooltip.textContent = stateInfo.name;
    document.body.appendChild(tooltip);

    path.style.fill = '#92ad5c';
    path.style.transition = 'fill 0.2s ease, transform 0.1s ease';
    path.style.cursor = 'pointer';

    // Hover: Change color and show state name
    path.addEventListener('mouseenter', (event) => {
      path.style.fill = '#FFA500';
      path.style.transform = 'scale(1.02)';

      const rect = event.target.getBoundingClientRect();
      tooltip.style.left = `${event.clientX + 50}px`;
      tooltip.style.top = `${event.clientY + 50}px`;
      tooltip.style.display = 'block';
    });

    path.addEventListener('mouseleave', () => {
      path.style.fill = '#aee38a';
      path.style.transform = 'scale(1)';
      tooltip.style.display = 'none';
    });

    // Click: Show Popup
    path.addEventListener('click', (event) => {
      showPopup(event, stateInfo);
    });
  }

  // 4. Show Popup Dynamically
  function showPopup(event, stateInfo) {
    const stateElement = event.target;
    const stateRect = stateElement.getBoundingClientRect();

    popupStateName.textContent = stateInfo.name;
    popupStateInfo.innerHTML = `<p><strong>State Dance:</strong> ${stateInfo.dance}</p>`;
    popupStateImage.src = stateInfo.image || 'default-image.jpg';

    // Configure "See More" button to redirect to state-specific page
    seeMoreButton.onclick = () => {
      window.location.href = `assets/statepages/${stateInfo.id}`; // Redirect to state page
    };

    // Position the popup
    const popupRect = popup.getBoundingClientRect();
    let left = stateRect.left + window.scrollX + stateRect.width / 2 - popupRect.width / 2;
    let top = stateRect.top + window.scrollY + stateRect.height + 10;

    if (left + popupRect.width > window.innerWidth) {
      left = window.innerWidth - popupRect.width - 10;
    }
    if (left < 10) {
      left = 10;
    }
    if (top + popupRect.height > window.innerHeight) {
      top = stateRect.top + window.scrollY - popupRect.height - 20;
    }

    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
    popup.style.display = 'flex';
    popup.style.opacity = '1';
  }

  // 5. Hide Popup
  function hidePopup() {
    popup.style.display = 'none';
    popup.style.opacity = '0';
  }

  // Close Popup Event
  closePopup.addEventListener('click', hidePopup);

  // Close Popup if clicked outside
  window.addEventListener('click', (event) => {
    if (event.target === popup) {
      hidePopup();
    }
  });

  // 6. Copy Button Functionality
  function copyToClipboard() {
    const stateInfoText = `${popupStateName.textContent} - ${popupStateInfo.textContent}`;
    navigator.clipboard.writeText(stateInfoText).then(() => {
      alert('State information copied to clipboard!');
    }).catch((error) => {
      console.error('Error copying text: ', error);
    });
  }

  // Event listener for the copy button
  copyButton.addEventListener('click', copyToClipboard);

  // 7. Initialize Map
  async function initialize() {
    popup.style.display = 'none';
    await fetchStatesData();
    await loadStateSVGs();
  }

  initialize();
});
