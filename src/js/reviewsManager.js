import NiceSelect from "nice-select2";
import { templates, icons } from "./templates";

class ReviewsManager {
  constructor(options = {}) {
    // Configuration
    this.itemsPerPage = options.itemsPerPage || 10;
    this.currentPage = 1;
    this.reviews = options.reviews || [];
    this.activeFilter = "all";

    // DOM Elements
    this.elements = {
      reviewsBlock: document.getElementById("reviewsBlock"),
      pagination: document.getElementById("pagination"),
      sortDropdown: document.getElementById("sort-reviews"),
      filterDropdown: document.getElementById("filter-reviews"),
    };

    // Bind methods
    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);

    this.init();
  }

  init() {
    // Initialize NiceSelect for both dropdowns
    this.initializeDropdowns();
    this.setupEventListeners();
    this.render();
  }

  initializeDropdowns() {
    this.sortSelect = new NiceSelect(this.elements.sortDropdown, {
      searchable: false,
      placeholder: "Select sorting",
    });

    this.filterSelect = new NiceSelect(this.elements.filterDropdown, {
      searchable: false,
      placeholder: "Filter by rating",
    });
  }

  setupEventListeners() {
    this.elements.sortDropdown.addEventListener("change", this.handleSort);
    this.elements.filterDropdown.addEventListener("change", this.handleFilter);
  }

  handleSort(event) {
    this.currentPage = 1;
    this.render(event.target.value, this.activeFilter);
  }

  handleFilter(event) {
    this.currentPage = 1;
    this.activeFilter = event.target.value;
    this.render(this.elements.sortDropdown.value, this.activeFilter);
  }

  handlePageClick(pageNumber) {
    const blockTop =
      this.elements.reviewsBlock.getBoundingClientRect().top +
      window.scrollY -
      200; // Adjust the 50 value as needed

    this.currentPage = pageNumber;
    this.render(this.elements.sortDropdown.value, this.activeFilter);

    // Scroll back to the adjusted position
    window.scrollTo({
      top: Math.max(0, blockTop), // Prevent negative scroll
      behavior: "smooth",
    });
  }

  // New method to handle scrolling to reviews
  scrollToReviews() {
    this.elements.reviewsBlock.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  getFilteredAndSortedReviews(sortOrder, filterValue) {
    let filteredReviews = this.reviews;
    if (filterValue !== "all") {
      const ratingFilter = parseInt(filterValue);
      filteredReviews = this.reviews.filter(
        (review) => review.rating === ratingFilter
      );
    }

    return filteredReviews.sort((a, b) => {
      if (sortOrder === "mostRecent") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOrder === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });
  }

  getPaginatedReviews(sortedReviews) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return sortedReviews.slice(startIndex, endIndex);
  }

  getStarRating(rating) {
    return (
      icons.starFilled.repeat(rating) + icons.starUnFilled.repeat(5 - rating)
    );
  }
  getTimeSincePost(dateString) {
    const pastDate = new Date(dateString);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate - pastDate;

    const daysPassed = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    // Return in years if more than 365 days
    if (daysPassed >= 365) {
      const years = Math.floor(daysPassed / 365);
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }

    // Return in months if more than 30 days but less than 365 days
    if (daysPassed >= 30) {
      const months = Math.floor(daysPassed / 30);
      return months === 1 ? "1 month ago" : `${months} months ago`;
    }

    // Return in weeks if more than 7 days but less than 30 days
    if (daysPassed >= 7) {
      const weeks = Math.floor(daysPassed / 7);
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    }

    // Otherwise, return in days
    return daysPassed === 1 ? "1 day ago" : `${daysPassed} days ago`;
  }
  renderReviewElement(review) {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review", "sc-3251946c-0", "dRXJlU");

    // Add the review content with read more/less functionality
    const fullContent = review.content;
    const truncatedContent = this.truncateText(review.content, 150); // Adjust character limit as needed
    const isLongContent = fullContent.length > 150;

    reviewElement.innerHTML = templates.reviewTemplate(
      {
        ...review,
        content: truncatedContent,
        fullContent: fullContent,
        hasMoreContent: isLongContent,
      },
      this.getStarRating(review.rating),
      this.getTimeSincePost(review.date)
    );

    // Add click event listener for read more/less button
    const readMoreBtn = reviewElement.querySelector(".read-more-btn");
    if (readMoreBtn) {
      readMoreBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleReadMore(reviewElement);
      });
    }

    return reviewElement;
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + "...";
  }

  toggleReadMore(reviewElement) {
    const contentElement = reviewElement.querySelector(".review-content");
    const readMoreBtn = reviewElement.querySelector(".read-more-btn");
    const fullContent = contentElement.getAttribute("data-full-content");
    const isTruncated = contentElement.classList.contains("truncated");

    if (isTruncated) {
      contentElement.textContent = fullContent;
      contentElement.classList.remove("truncated");
      readMoreBtn.textContent = "Read Less";
    } else {
      contentElement.textContent = this.truncateText(fullContent, 150);
      contentElement.classList.add("truncated");
      readMoreBtn.textContent = "Read More";
    }
  }

  renderReviews(sortOrder = "mostRecent", filterValue = "all") {
    const filteredAndSortedReviews = this.getFilteredAndSortedReviews(
      sortOrder,
      filterValue
    );
    const paginatedReviews = this.getPaginatedReviews(filteredAndSortedReviews);

    this.elements.reviewsBlock.innerHTML = "";

    if (paginatedReviews.length === 0) {
      this.elements.reviewsBlock.innerHTML = templates.noReviewsTemplate();
      return;
    }

    paginatedReviews.forEach((review) => {
      const reviewElement = this.renderReviewElement(review);
      this.elements.reviewsBlock.appendChild(reviewElement);
    });
  }

  renderPagination() {
    const filteredReviews = this.getFilteredAndSortedReviews(
      this.elements.sortDropdown.value,
      this.activeFilter
    );
    const totalPages = Math.ceil(filteredReviews.length / this.itemsPerPage);

    this.elements.pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement("button");
      pageItem.textContent = i;
      pageItem.classList.toggle("active", i === this.currentPage);
      pageItem.addEventListener("click", () => this.handlePageClick(i));
      this.elements.pagination.appendChild(pageItem);
    }
  }

  render(sortOrder = "mostRecent", filterValue = "all") {
    this.renderReviews(sortOrder, filterValue);
    this.renderPagination();
  }

  // Public methods remain the same
  updateReviews(newReviews) {
    this.reviews = newReviews;
    this.currentPage = 1;
    this.render(this.elements.sortDropdown.value, this.activeFilter);
  }

  setItemsPerPage(count) {
    this.itemsPerPage = count;
    this.currentPage = 1;
    this.render(this.elements.sortDropdown.value, this.activeFilter);
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getActiveFilter() {
    return this.activeFilter;
  }
}

export default ReviewsManager;
