const API_BASE_URL = 'https://www.algoexpert.io/api/testimonials';

/* response
{
  hasNext: true,         // means more can be fetched
  testimonials: [
    {
      "message": "Excellent products!",
      "id": 1
    },
    {
      "message": "Five Stars",
      "id": 55
    },
  ]
}

<div id="testimonial-container">
  <p class="testimonial">{message}</p>
</div>

each message is a box with content

fetch 5 at a time 
once page loads fetch 5 and append to end of container
when user scrolls to the to bottom of container then fetch another 5 and append

only 1 api call at a time, so if pending then no other call issued
once all fetched then issue no more calls
use fetch
listen to scroll events

scrolled to bottom if for containing div: scrollHeight - scrollTop - clientHeight <= 0

*/

console.log(testimonials)

const LIMIT = 5;
let after = 0;

function getTestimonialsApi(limit, after) {
  console.log(`${API_BASE_URL}?limit=${limit}&after=${after}`);
  //return fetch(`${API_BASE_URL}?limit=${limit}&after=${after}`);

  return Promise.resolve(testimonials.slice(after, after + limit));
}

async function getTestimonials(limit) {
  const testimonials = await getTestimonialsApi(limit, after);
  after = after + limit;  // should set after to last id in testimonials if using api

  return {
    hasNext: after <= 16,
    testimonials
  };
}

/***** render  */
function getTmContainer() {
  return document.getElementById('testimonial-container');
}
function renderTestimonials(testimonials) {
  const tmContainer = getTmContainer();

  console.log(testimonials)

  // to-do: optimize dom updates
  testimonials.forEach(testimonial => {
    const message = document.createElement('p');
    message.classList.add('testimonial');
    message.textContent = testimonial.message
    tmContainer.appendChild(message);
  });
}


/***** manager  */

async function fetchAndRenderUI() {
  // fetch 
  const response = await getTestimonials(LIMIT);

  // render
  renderTestimonials(response.testimonials);

  return response;
}

function buildTestimonialsUI() {
  let hasNext = true;

  // fetch and render  on startup
  fetchAndRenderUI()

  // fetch and render when scroll to bottom
  const tmContainer = getTmContainer();
  tmContainer.addEventListener("scroll", async (event) => {
    // scrolled to bottom if scrollHeight - scrollTop - clientHeight <= 0
    if (tmContainer.scrollHeight - tmContainer.scrollTop - tmContainer.clientHeight <= 0) {
      if (hasNext) {
        let response = await fetchAndRenderUI();
  
        hasNext = response.hasNext;
      }
    }
  });
  
  // fetch and render on more btn click
  const getMoreBtnEl =  document.getElementById('get-more');
  getMoreBtnEl.addEventListener('click', async (e) => {
    if (hasNext) {
      let response = await fetchAndRenderUI();

      hasNext = response.hasNext;
    }
  });
}

// initial load and render
buildTestimonialsUI();



