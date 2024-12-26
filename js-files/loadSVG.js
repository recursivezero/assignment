async function loadStateSVG(svgPath) {
    try {
      const response = await fetch(svgPath);
      if (!response.ok) throw new Error('SVG not found');
      const svgText = await response.text();

      // Inject the SVG into the container
      document.getElementById('state-svg').innerHTML = svgText;
    } catch (error) {
      console.error('Error loading state SVG:', error);
      document.getElementById('state-svg').innerHTML = '<p>Unable to load state map.</p>';
    }
  }