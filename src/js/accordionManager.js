class AccordionManager {
  constructor(options = {}) {
    this.accordionData = options.data || [];
    this.allowMultiple = options.allowMultiple || false; // Whether multiple panels can be open at once

    // DOM Element
    this.container = document.getElementById(
      options.containerId || "accordion"
    );

    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
  }

  createAccordionItem(item, index) {
    return `
        <div class="accordion-item" data-index="${index}">
          <button class="accordion-header" aria-expanded="false">
            <span class="accordion-title">${item.title}</span>
            <svg class="accordion-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          <div class="accordion-content" hidden>
            <div class="accordion-body">
              ${item.content}
            </div>
          </div>
        </div>
      `;
  }

  render() {
    const accordionHTML = this.accordionData
      .map((item, index) => this.createAccordionItem(item, index))
      .join("");

    this.container.innerHTML = accordionHTML;
    this.container.classList.add("accordion-container");
  }

  setupEventListeners() {
    this.container.addEventListener("click", (e) => {
      const header = e.target.closest(".accordion-header");
      if (!header) return;

      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isExpanded = header.getAttribute("aria-expanded") === "true";

      // If not allowing multiple open panels, close all others
      if (!this.allowMultiple && !isExpanded) {
        this.closeAllPanels();
      }

      // Toggle current panel
      this.togglePanel(header, content, !isExpanded);
    });
  }

  togglePanel(header, content, isOpen) {
    header.setAttribute("aria-expanded", isOpen);
    content.hidden = !isOpen;

    // Add animation classes
    if (isOpen) {
      content.style.height = content.scrollHeight + "px";
      header.classList.add("expanded");
    } else {
      content.style.height = "0px";
      header.classList.remove("expanded");
    }
  }

  closeAllPanels() {
    const headers = this.container.querySelectorAll(
      '.accordion-header[aria-expanded="true"]'
    );
    headers.forEach((header) => {
      const content = header.nextElementSibling;
      this.togglePanel(header, content, false);
    });
  }

  // Public methods
  openPanel(index) {
    const header = this.container.querySelector(
      `.accordion-item[data-index="${index}"] .accordion-header`
    );
    const content = header.nextElementSibling;
    if (header && content) {
      if (!this.allowMultiple) {
        this.closeAllPanels();
      }
      this.togglePanel(header, content, true);
    }
  }

  closePanel(index) {
    const header = this.container.querySelector(
      `.accordion-item[data-index="${index}"] .accordion-header`
    );
    const content = header.nextElementSibling;
    if (header && content) {
      this.togglePanel(header, content, false);
    }
  }

  updateData(newData) {
    this.accordionData = newData;
    this.render();
    this.setupEventListeners();
  }
}

export default AccordionManager;
