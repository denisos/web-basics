
console.log("Course List")

// import courses from './courses.json'

function getApiCourses() {
  // return fetch('https://www.algoexpert.io/api/fe/questions');
  return Promise.resolve(courses)
}

function organizeCourses(courses) {
  return courses.reduce((accum, course) => {
    // if category in the map then get maps array and push course to it
    // else add new category and 
    if (accum[course.category]) {
      accum[course.category].push(course);
    } else {
      accum[course.category] = [course];
    }
    return accum;
  }, {})
}

async function getCourses() {
  try {
    const courses = await getApiCourses();
    // courses = await res.json();

    return {
      status: "ok",
      courses
    };
  } catch(err) {
    console.log(err)
    return {
      status: "error"
    };
  }
}

/**************************** 
<div class="category">
  <h2>HTML</h2>
  <div class="question">
    <h3>Stopwatch</h3>
  </div>
  <div class="question">
    <h3>Tic Tac Toe</h3>
  </div>
</div>
*/

function displayError() {
  document.querySelector('.error-message').style.visibility = 'visible';
}

function createDomCategory(title) {
  const category = document.createElement('div');
  category.className = 'category';
  
  // append key as title
  const categoryTitle = document.createElement('h2');
  categoryTitle.innerText = title;

  category.appendChild(categoryTitle);

  return category;
}

function createDomQuestion(title) {
  const question = document.createElement('div');
  question.className = 'question';
  
  // append key as title
  const questionTitle = document.createElement('h3');
  questionTitle.innerText = title;

  question.appendChild(questionTitle);

  return question;
}


function displayCourseUI(organizedCourses) {

  // create container
  const allCategories = document.createElement('div');
  allCategories.className = "all-categories";

  for (const [key, questions] of Object.entries(organizedCourses)) {
    console.log(key, questions);

    // for each key
    //   create a category with title
    const category = createDomCategory(key);

    // for each value
    //   create a question
    //   append to category
    questions.forEach(question => {
      category.appendChild(createDomQuestion(question.name));
    })

    // append category
    allCategories.appendChild(category);
  }

  // append allCategories to the main list container
  document.querySelector('.courses-container').appendChild(allCategories);
}

async function buildCourseUI() {
  // 1. fetch courses
  coursesResponse = await getCourses();
  if (coursesResponse.status === 'error') {
    displayError();
    return;
  }

  const organizedCourses = organizeCourses(coursesResponse.courses);

  // 2. display in ui
  displayCourseUI(organizedCourses);

}

buildCourseUI();


