export class StateModal {
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
