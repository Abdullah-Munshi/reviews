// main.js or index.js
import ReviewsManager from "./js/reviewsManager";
import AccordionManager from "./js/accordionManager";

const reviews = [
  {
    id: 1,
    content:
      " This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!This is the most recent review. Very helpful!",
    date: "2024-11-09",
    rating: 5,
    liked: 12,
    shares: 3,
  },
  {
    id: 2,
    content: "This review is a bit older. Could be more detailed.",
    date: "2024-09-01",
    rating: 3,
    liked: 8,
    shares: 1,
  },
  {
    id: 3,
    content: "Another review, recently added. Pretty good.",
    date: "2024-11-03",
    rating: 4,
    liked: 15,
    shares: 5,
  },
  {
    id: 4,
    content: "The oldest review in the list. Could be better.",
    date: "2024-01-12",
    rating: 2,
    liked: 5,
    shares: 0,
  },
  {
    id: 5,
    content: "This is the most recent review. Very helpful!",
    date: "2024-11-09",
    rating: 5,
    liked: 12,
    shares: 3,
  },
  {
    id: 6,
    content: "This review is a bit older. Could be more detailed.",
    date: "2024-09-01",
    rating: 3,
    liked: 8,
    shares: 1,
  },
  {
    id: 7,
    content: "Another review, recently added. Pretty good.",
    date: "2024-11-03",
    rating: 4,
    liked: 15,
    shares: 5,
  },
  {
    id: 8,
    content: "The oldest review in the list. Could be better.",
    date: "2024-01-12",
    rating: 2,
    liked: 5,
    shares: 0,
  },
  {
    id: 9,
    content: "This is the most recent review. Very helpful!",
    date: "2024-11-09",
    rating: 5,
    liked: 12,
    shares: 3,
  },
  {
    id: 10,
    content: "This review is a bit older. Could be more detailed.",
    date: "2024-09-01",
    rating: 3,
    liked: 8,
    shares: 1,
  },
  {
    id: 11,
    content: "Another review, recently added. Pretty good.",
    date: "2024-11-03",
    rating: 4,
    liked: 15,
    shares: 5,
  },
  {
    id: 4,
    content: "The oldest review in the list. Could be better.",
    date: "2024-01-12",
    rating: 2,
    liked: 5,
    shares: 0,
  },
];
const reviewsManager = new ReviewsManager({
  reviews: reviews,
  itemsPerPage: 10,
});

// Accordion Data
const accordionData = [
  {
    title: "How are Feefo reviews collected?",
    content:
      "We independently collect feedback on behalf of the businesses that work with us. Our platform only reaches out to verified buyers, so you can be sure you’re reading reviews from real customers.",
  },
  {
    title: "Who can leave a Feefo review?",
    content:
      "Only customers with proof of purchase can leave a Feefo review. We ensure this by reaching out to buyers straight after their transaction.",
  },
  {
    title: "How do we verify reviews?",
    content:
      "We verify that reviews are from genuine customers by matching them to a sale or transaction. People are only invited to leave a review after purchasing from the business.",
  },
  {
    title: "How do we deal with fake reviews?",
    content:
      "We verify that reviews are from genuine customers by matching them to a sale or transaction. People are only invited to leave a review after purchasing from the business.",
  },
];

const accordion = new AccordionManager({
  containerId: "faq",
  data: accordionData,
  allowMultiple: false, // Set to true if you want multiple panels open at once
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize read more/less for all elements with data-para
  initReadMore();
});

function initReadMore(maxChars = 120) {
  // You can adjust default maxChars
  const paragraphs = document.querySelectorAll('[data-para="para"]');

  paragraphs.forEach((container) => {
    const paragraph = container.querySelector(".text");
    const button = container.querySelector(".button");

    if (!paragraph || !button) return;

    // Store the original text
    const fullText = paragraph.textContent.trim();

    // Only apply if text is longer than maxChars
    if (fullText.length <= maxChars) {
      button.style.display = "none";
      return;
    }

    // Set initial state
    paragraph.dataset.fullText = fullText;
    const truncatedText = fullText.slice(0, maxChars) + "...";
    paragraph.textContent = truncatedText;

    // Add event listener to button
    button.addEventListener("click", function () {
      const isExpanded = paragraph.dataset.expanded === "true";

      if (!isExpanded) {
        paragraph.textContent = paragraph.dataset.fullText;
        button.textContent = "Read Less";
        paragraph.dataset.expanded = "true";
      } else {
        paragraph.textContent = truncatedText;
        button.textContent = "Read All";
        paragraph.dataset.expanded = "false";
      }
    });
  });
}
