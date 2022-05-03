const API_BASE_URL = 'https://www.algoexpert.io/api/testimonials';

const LIMIT = 5;
let after = 0;

function getTestimonialsApi(limit, after) {
  // since just local comment out for now
  //return fetch(`${API_BASE_URL}?limit=${limit}&after=${after}`);

  // just use local mock data and add artificial 2 sec delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(testimonials.slice(after, after + limit))
    }, 2000);
  })

  // return Promise.resolve(testimonials.slice(after, after + limit));
}

async function getTestimonials(limit) {
  const testimonials = await getTestimonialsApi(limit, after);
  after = after + limit;  // should set after to last id in testimonials if using api

  return {
    hasNext: after <= 16,
    testimonials
  };
}

async function getTestimonialsThrottle() {
  let isRunning = false;

  return async function (...args) {
    if (isRunning) {
      console.log("getTestimonials called while still running, so return");
      return {
        hasNext: true,
        testimonials: []
      };
    }
    isRunning = true;
    let res = await getTestimonials(...args)
    isRunning = false;
  }
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
  let isFetching = false;
  let timerId;

  // fetch and render  on startup
  fetchAndRenderUI()

  // fetch and render when scroll to bottom
  const tmContainer = getTmContainer();
  tmContainer.addEventListener("scroll", async (event) => {

    // scrolled to bottom if scrollHeight - scrollTop - clientHeight <= 0
    if (tmContainer.scrollHeight - tmContainer.scrollTop - tmContainer.clientHeight <= 0) {
      if (hasNext) {
        // only call if not already requesting
        if (isFetching) {
          console.log("getTestimonials called while still running, so return");
          return;
        }
        console.log("getTestimonials called isRunning false, so call api");

        isFetching = true;

        let response = await fetchAndRenderUI();
        hasNext = response.hasNext;

        isFetching = false;
      }
    }
  });
  
  // fetch and render on more btn click
  const getMoreBtnEl =  document.getElementById('get-more');
  getMoreBtnEl.addEventListener('click', async (e) => {
    if (hasNext) {
      // lets debounce clicks
      clearTimeout(timerId);

      timerId = setTimeout(async () => {
        const response = await fetchAndRenderUI();
        hasNext = response.hasNext;
        
        timerId = undefined;
      }, 300);
    }
  });
}

// initial load and render
buildTestimonialsUI();



