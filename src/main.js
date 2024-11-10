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
    title: "Section 1",
    content: "Content for section 1...",
  },
  {
    title: "Section 2",
    content: "Content for section 2...",
  },
  {
    title: "Section 3",
    content: "Content for section 3...",
  },
];

const accordion = new AccordionManager({
  containerId: "faq",
  data: accordionData,
  allowMultiple: false, // Set to true if you want multiple panels open at once
});
