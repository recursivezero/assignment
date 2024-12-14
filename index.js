document.querySelectorAll('.state').forEach(state => {
  state.addEventListener('click', event => {
      const popup = document.querySelector('.popup');
      const mapRect = document.querySelector('.india-map').getBoundingClientRect();
      const stateRect = event.target.getBoundingClientRect();

      // Calculate popup position relative to the map
      const popupLeft = stateRect.left - mapRect.left + stateRect.width / 2;
      const popupTop = stateRect.top - mapRect.top + stateRect.height / 2;

      // Update popup position
      popup.style.left = `${popupLeft}px`;
      popup.style.top = `${popupTop}px`;
      popup.style.display = 'block'; // Show the popup

      // Update popup content dynamically
      const stateName = event.target.getAttribute('data-state');
      const danceName = event.target.getAttribute('data-dance');
      const imageUrl = event.target.getAttribute('data-image');

      document.getElementById('popup-state-name').textContent = stateName || 'State Name';
      document.getElementById('popup-dance-name').textContent = danceName || 'Dance Name Not Available';
      document.getElementById('popup-img').src = imageUrl || 'images/default.jpg';
  });
});

// Close popup logic
document.getElementById('popup-close').addEventListener('click', () => {
  document.querySelector('.popup').style.display = 'none';
});
