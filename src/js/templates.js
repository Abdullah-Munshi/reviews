// Template for review block
export const templates = {
  reviewTemplate: (review, stars, getTimeSincePost) => {
    return `
        <div class="sc-3251946c-1 eNBLKG">
  <div
    data-aqa-id="feedback-customer-details-container"
    class="sc-3251946c-2 fFEKVS"
  >
    <div class="sc-9971eb42-7 ZBsxw">
      <div class="sc-9971eb42-8 bwJPW">
        <div
          data-aqa-id="avatar"
          class="MediaCustomerPhoto-feefo-ui__sc-1qwn52x-0 jHzHeR"
        >
          <div
            height="18"
            width="18"
            class="IconWrapperContainer-feefo-ui__sc-13vzm5b-0 tmeFg"
          >
            ${icons.user}
          </div>
        </div>
        <div class="sc-9971eb42-9 calcVV">
          <div data-aqa-id="customer-name" class="sc-9971eb42-10 iRguQW">
            Trusted Customer
          </div>
          <div class="sc-9971eb42-11 gktsqd">
            <div
              data-aqa-id="customer-feedback-date"
              class="sc-9971eb42-13 gBQsGp"
            >
              ${getTimeSincePost}
            </div>
          </div>
        </div>
      </div>
      <div data-aqa-id="customer-purchased-date" class="sc-9971eb42-14 feAvtC">
        Date of purchase: ${new Date(review.date).toLocaleDateString()}
      </div>
    </div>
    <div class="star-rating">${stars}</div>
    <div class="sc-9971eb42-3 ffNIF"></div>
  </div>
  <div class="sc-3251946c-3 dOdHwh">
    <div class="sc-d23b41c-2 ctyGXN">
      <div data-aqa-id="customer-comment-container" class="sc-d23b41c-5 epKtko">
         <div class="review-content truncated" data-full-content="${
           review.fullContent
         }">
        ${review.content}
      </div>
      ${
        review.hasMoreContent
          ? `
        <button class="read-more-btn" aria-expanded="false">
          Read More
        </button>
      `
          : ""
      }
      </div>
    </div>
  </div>
  <div class="sc-3251946c-10 gJFiju">
    <div class="sc-3251946c-11 cMWRxC">
      <div
        data-aqa-id="feedback-like-button"
        tabindex="0"
        id="feedback-like-button-for-feedback-6719138ae4b0861b9aa5a60a"
        class="sc-3251946c-12 dITaOZ"
      >
        ${icons.like}2
      </div>
      <div
        tabindex="0"
        data-aqa-id="feedback-share-button"
        id="feedback-share-button-for-feedback-6719138ae4b0861b9aa5a60a"
        class="sc-3251946c-12 dITaOZ"
      >
        Share ${icons.share}
      </div>
    </div>
  </div>
</div>
    `;
  },

  noReviewsTemplate: () => `
        <div class="no-reviews">
            ${icons.empty}
            <p>No reviews match the selected criteria.</p>
        </div>
    `,
};

// Icons used in review
export const icons = {
  user: `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><circle cx="10" cy="6" r="4" stroke="#303030" stroke-width="2"></circle><path d="M17.5 18c0-5-2.5-8-7.5-8s-8 3-8 8" stroke="#303030" stroke-width="2" stroke-linecap="round"></path></svg>`,
  like: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" id="feedback-like-button-for-feedback-66ed9d8fe4b02711a83f53db-icon"><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.834 18.333V9.167m-4.167 1.666v5.834c0 .92.746 1.666 1.667 1.666h11.188a2.5 2.5 0 0 0 2.471-2.12l.898-5.833A2.5 2.5 0 0 0 15.42 7.5H12.5a.833.833 0 0 1-.833-.833V3.72c0-1.134-.92-2.054-2.055-2.054-.27 0-.516.159-.626.406L6.054 8.672a.83.83 0 0 1-.762.495H3.334c-.92 0-1.667.746-1.667 1.666"></path></svg>`,

  share: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" id="feedback-share-button-for-feedback-66ed9d8fe4b02711a83f53db-icon"><path stroke="#292F36" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m7.158 11.258 5.692 3.317m-.008-9.15L7.158 8.742M17.5 4.167a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M7.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m10 5.833a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"></path></svg>`,

  starFilled: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 18 18" role="img" id="customer-star-service-attributes-outlined-0-svg" font-size="18"><path id="customer-star-service-attributes-outlined-0-path-1" fill="#FFD100" d="m6.342 6.058-5.94.461c-.387.03-.544.536-.248.797l3.285 2.918C5.166 9.7 6.367 7.992 6.34 6.056z"></path><path id="customer-star-service-attributes-outlined-0-path-2" fill="#FFD100" d="m17.599 6.528-5.945-.462L9.4.282a.425.425 0 0 0-.8 0L7.544 2.989c.38.737.614 1.584.676 2.507.178 2.56-1.252 4.97-3.529 5.861l.012.01-1.417 6.071c-.092.394.319.706.647.493L9 14.64l5.068 3.29c.328.213.739-.1.647-.493l-1.417-6.07 4.55-4.041c.295-.263.138-.768-.248-.797z"></path></svg>`,

  starUnFilled: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 18 18" role="img" id="customer-star-service-attributes-outlined-4-svg" font-size="18"><path id="customer-star-service-attributes-outlined-4-path-1" fill="#E3EBF5" d="m6.342 6.058-5.94.461c-.387.03-.544.536-.248.797l3.285 2.918C5.166 9.7 6.367 7.992 6.34 6.056z"></path><path id="customer-star-service-attributes-outlined-4-path-2" fill="#E3EBF5" d="m17.599 6.528-5.945-.462L9.4.282a.425.425 0 0 0-.8 0L7.544 2.989c.38.737.614 1.584.676 2.507.178 2.56-1.252 4.97-3.529 5.861l.012.01-1.417 6.071c-.092.394.319.706.647.493L9 14.64l5.068 3.29c.328.213.739-.1.647-.493l-1.417-6.07 4.55-4.041c.295-.263.138-.768-.248-.797z"></path></svg>`,
};
