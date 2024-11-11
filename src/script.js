const MAP_CONFIG = {
    center: [ 78.9629, 22.5937 ],
    scale: 900,
    width: window.innerWidth - 60,
    height: window.innerHeight - 180,
    initialTransform: null
};

class IndiaMap {
    // Main class handling the map visualization and interaction
    constructor(config) {
        this.config = config;
        this.stateData = {};
        this.projection = this.createProjection();
        this.path = d3.geoPath().projection(this.projection);
        this.zoom = d3.zoom()
            .scaleExtent([ 1, 8 ])
            .on("zoom", (event) => this.handleZoom(event));
        this.initializeSVG();
        this.initialTransform = null;
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);
    }

    // Initialize SVG container and set up zoom behavior
    initializeSVG() {
        this.svg = d3.select(".map-container")
            .append("svg")
            .attr("viewBox", `0 0 ${this.config.width} ${this.config.height}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        this.mapGroup = this.svg.append("g");

        this.initialTransform = d3.zoomIdentity
            .translate(this.config.width / 2, this.config.height / 2)
            .scale(1);

        this.svg.call(this.zoom);
    }

    // Create Mercator projection for India map
    createProjection() {
        return d3.geoMercator()
            .center(this.config.center)
            .scale(this.config.scale)
            .translate([ this.config.width / 2, this.config.height / 2 ]);
    }

    // Load GeoJSON and state data from external files
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

    // Handle zoom and pan events
    handleZoom(event) {
        this.mapGroup.attr("transform", event.transform);
    }

    renderMap(geoData) {
        if (!this.mapGroup) return;

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
            if (isNaN(x) || isNaN(y)) return;

            const g = capitals.append("g")
                .attr("class", "capital-group")
                .attr("data-state", stateName);

            g.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", 3)
                .attr("class", "capital-marker");

            g.append("text")
                .attr("x", 0)
                .attr("y", -10)
                .attr("class", "capital-label")
                .text(data.capital.name);

            g.attr("transform", `translate(${x},${y})`);
        });
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
        this.svg.transition()
            .duration(750)
            .call(
                this.zoom.transform,
                d3.zoomIdentity
                    .scale(1)
            );
    }

    handleResize() {
        this.config.width = window.innerWidth - 60;
        this.config.height = window.innerHeight - 180;

        this.svg
            .attr("viewBox", `0 0 ${this.config.width} ${this.config.height}`);

        this.projection
            .center(this.config.center)
            .scale(this.config.scale)
            .translate([ this.config.width / 2, this.config.height / 2 ]);

        this.mapGroup.selectAll("path")
            .attr("d", this.path);

        // Update capital positions
        this.mapGroup.selectAll(".capital-group").remove();
        this.renderCapitals();
    }
}

class StateModal {
    // Handles state information modal display and interactions
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

        window.onclick = (event) => {
            if (event.target === this.modal) this.hide();
        };

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

// Theme toggle functionality for dark/light mode
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    themeToggle.innerHTML = prefersDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = e.matches
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    });

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
