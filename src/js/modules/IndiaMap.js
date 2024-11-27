import { StateModal } from './StateModal.js';

export class IndiaMap {
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

        // Add cleanup method
        this.cleanup = this.cleanup.bind(this);
        window.addEventListener('beforeunload', this.cleanup);
    }

    cleanup() {
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('beforeunload', this.cleanup);
        // Clear any D3 selections
        if (this.svg) {
            this.svg.selectAll('*').remove();
        }
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
            // Add user-friendly error handling here
            this.handleDataLoadError();
        }
    }

    handleDataLoadError() {
        // Add error UI feedback
        const container = document.querySelector('.map-container');
        container.innerHTML = `
            <div class="error-message">
                Failed to load map data. Please try refreshing the page.
            </div>
        `;
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