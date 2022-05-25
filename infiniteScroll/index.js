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
  console.log(testimonials);

  const tmContainer = getTmContainer();

  // add updates to documentFragment to minize browser relows
  const docFragment = document.createDocumentFragment();

  testimonials.forEach(testimonial => {
    const message = document.createElement('p');
    message.classList.add('testimonial');
    message.textContent = testimonial.message;
    docFragment.appendChild(message);
  });

  tmContainer.appendChild(docFragment);
}


/***** manager  */

async function fetchAndRenderUI() {
  // fetch 
  const response = await getTestimonials(LIMIT);
  // render
  if (response.testimonials.length > 0) {
    renderTestimonials(response.testimonials);
  }

  return response;
}

// utility fn to debounce a function
function debounceFunction(callback, delay = 300) {
  let timerId;

  return () => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = undefined;
      callback();
    }, delay);
  }
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
          console.log("getTestimonials still running, so just return");
          return;
        }
        console.log("getTestimonials is not Running, so call api");

        isFetching = true;

        let response = await fetchAndRenderUI();
        hasNext = response.hasNext;

        isFetching = false;
      }
    }
  });

  
  // fetch and render on more btn click
  const getMoreBtnEl =  document.getElementById('get-more');
  const debouncedFetchAndRender = debounceFunction(async () => {
    if (hasNext) {
      const response = await fetchAndRenderUI();
      hasNext = response.hasNext;
    }
  });

  getMoreBtnEl.addEventListener('click', debouncedFetchAndRender);
}

// initial load and render
buildTestimonialsUI();



