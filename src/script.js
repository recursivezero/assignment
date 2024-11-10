// Constants for map configuration
const MAP_CONFIG = {
    center: [ 78.9629, 22.5937 ],
    scale: 1000, // Reduced scale
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.7,
    initialTransform: null
};

// Class to handle map rendering and interactions
class IndiaMap {
    constructor(config) {
        this.config = config;
        this.stateData = {};
        this.projection = this.createProjection();
        this.path = d3.geoPath().projection(this.projection);
        this.zoom = d3.zoom()
            .scaleExtent([ 1, 8 ])
            .on("zoom", (event) => this.handleZoom(event));
        this.initializeSVG(); // Call this in constructor
        this.initialTransform = null; // Store initial transform
    }

    initializeSVG() {
        this.svg = d3.select(".map-container")
            .append("svg")
            .attr("viewBox", `0 0 ${this.config.width} ${this.config.height}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        this.mapGroup = this.svg.append("g");

        // Store initial transform after map is rendered
        this.initialTransform = d3.zoomIdentity
            .translate(this.config.width / 2, this.config.height / 2)
            .scale(1);

        this.svg.call(this.zoom);
    }

    createProjection() {
        return d3.geoMercator()
            .center(this.config.center)
            .scale(this.config.scale)
            .translate([ this.config.width / 2, this.config.height / 2 ]);
    }

    async loadData() {
        try {
            const [ geoData, states ] = await Promise.all([
                d3.json("data/india.geojson"),
                d3.json("data/state_data.json")
            ]);
            this.stateData = states;
            this.renderMap(geoData);
            this.renderCapitals();
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }

    handleZoom(event) {
        this.mapGroup.attr("transform", event.transform);
    }

    renderMap(geoData) {
        if (!this.mapGroup) return; // Add safety check

        this.mapGroup.selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", this.path)
            .attr("class", "state")
            .on("click", (event, d) => {
                this.handleStateClick(d.properties.st_nm);
            });
    }

    renderCapitals() {
        const capitals = this.mapGroup.append("g").attr("class", "capitals");

        Object.entries(this.stateData).forEach(([ stateName, data ]) => {
            const coords = data.capital.coordinates;
            if (!coords) return;

            const [ x, y ] = this.projection(coords);
            this.addCapitalMarker(capitals, x, y, stateName, data.capital.name);
        });
    }

    addCapitalMarker(container, x, y, stateName, capitalName) {
        const g = container.append("g")
            .attr("class", "capital-group")
            .attr("data-state", stateName);

        g.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 3)
            .attr("class", "capital-marker");

        g.append("text")
            .attr("x", x)
            .attr("y", y - 10)
            .attr("class", "capital-label")
            .text(capitalName);
    }

    handleStateClick(stateName) {
        this.highlightCapital(stateName);
        this.showStateModal(stateName);
    }

    highlightCapital(stateName) {
        d3.selectAll(".capital-marker, .capital-label")
            .classed("active", false);

        d3.selectAll(`[data-state="${stateName}"]`)
            .classed("active", true);
    }

    showStateModal(stateName) {
        const modal = new StateModal(this.stateData[ stateName ], stateName);
        modal.show();
    }

    resetZoom() {
        if (this.svg && this.zoom) {
            this.svg.transition()
                .duration(750)
                .call(this.zoom.transform, this.initialTransform);
        }
    }

    resetZoom() {
        this.svg.transition()
            .duration(750)
            .call(
                this.zoom.transform,
                d3.zoomIdentity
                    .scale(1)
            );
    }


}

// Class to handle modal functionality
class StateModal {
    constructor(stateData, stateName) {
        this.stateData = stateData || {};
        this.stateName = stateName;
        this.modal = document.getElementById("stateModal");
        this.setupEventListeners();
    }

    setupEventListeners() {
        const closeBtn = this.modal.querySelector(".close");
        const copyBtn = this.modal.querySelector("#copyButton");

        closeBtn.onclick = () => this.hide();
        copyBtn.onclick = () => this.copyContent();

        // Handle clicking outside modal
        window.onclick = (event) => {
            if (event.target === this.modal) this.hide();
        };

        // Add  ape key handler
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.modal.style.display === 'block') {
                this.hide();
            }
        });
    }

    show() {
        this.updateModalContent();
        this.modal.style.display = "block";
    }

    hide() {
        const modalContent = this.modal.querySelector('.modal-content');
        modalContent.classList.add('closing');

        setTimeout(() => {
            this.modal.style.display = "none";
            modalContent.classList.remove('closing');
        }, 300);
    }

    updateModalContent() {
        const elements = {
            "stateName": this.stateName,
            "stateCapital": this.stateData.capital.name,
            "stateArea": this.stateData.area,
            "stateLanguages": this.stateData.languages,
            "stateDance": this.stateData.danceforms,
            "stateLiteracy": this.stateData.literacy,
            "stateDescription": this.stateData.description
        };

        Object.entries(elements).forEach(([ id, value ]) => {
            document.getElementById(id).textContent = value || "N/A";
        });
    }

    async copyContent() {
        try {
            const content = this.modal.querySelector(".modal-body").innerText;
            await navigator.clipboard.writeText(content);
            this.showCopyFeedback();
        } catch (error) {
            console.error("Failed to copy content:", error);
        }
    }

    showCopyFeedback() {
        const copyBtn = this.modal.querySelector("#copyButton");
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
    }
}

// Add after DOMContentLoaded event listener
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    themeToggle.innerHTML = prefersDark 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = e.matches 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });

    // Handle manual toggles
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    window.indiaMap = new IndiaMap(MAP_CONFIG);
    window.indiaMap.loadData();
    setupThemeToggle();
});
