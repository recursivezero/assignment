// Constants for map configuration
const MAP_CONFIG = {
    center: [ 78.9629, 22.5937 ],
    scale: 1000,
    width: window.innerWidth,
    height: window.innerHeight
};

// Class to handle map rendering and interactions
class IndiaMap {
    constructor(config) {
        this.config = config;
        this.stateData = {};
        this.svg = this.initializeSVG();
        this.projection = this.createProjection();
        this.path = d3.geoPath().projection(this.projection);
    }

    initializeSVG() {
        return d3.select("body")
            .append("svg")
            .attr("viewBox", `0 0 ${this.config.width} ${this.config.height}`)
            .attr("preserveAspectRatio", "xMidYMid meet");
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

    renderMap(geoData) {
        this.svg.selectAll("path")
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
        const capitals = this.svg.append("g").attr("class", "capitals");

        Object.entries(this.stateData).forEach(([ stateName, data ]) => {
            const coords = data.capital.coordinates;
            if (!coords) return;

            const [ x, y ] = this.projection(coords);
            this.addCapitalMarker(capitals, x, y, stateName, data.capital.name);
        });
    }

    addCapitalMarker(container, x, y, stateName, capitalName) {
        // Add marker
        container.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 3)
            .attr("class", "capital-marker")
            .attr("data-state", stateName);

        // Add label
        container.append("text")
            .attr("x", x + 5)
            .attr("y", y)
            .attr("class", "capital-label")
            .attr("data-state", stateName)
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
        window.onclick = (event) => {
            if (event.target === this.modal) this.hide();
        };
    }

    show() {
        this.updateModalContent();
        this.modal.style.display = "block";
    }

    hide() {
        this.modal.style.display = "none";
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

// Initialize map
document.addEventListener('DOMContentLoaded', () => {
    const indiaMap = new IndiaMap(MAP_CONFIG);
    indiaMap.loadData();
});
