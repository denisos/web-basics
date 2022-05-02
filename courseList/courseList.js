
console.log("Course List")

// import courses from './courses.json'
/**** Fetching and processing ************************ */

function getApiSubmissions() {
  // return fetch('https://www.algoexpert.io/api/fe/submissions');
  return Promise.resolve(submissions);  // so can run locally in browser
}


function getApiCourses() {
  // return fetch('https://www.algoexpert.io/api/fe/questions');
  return Promise.resolve(courses);     // so can run locally in browser
}

// convert to a map keyed by course category
function organizeCourses(courses) {
  return courses.reduce((accum, question) => {
    // if category in the map then get maps array and push course to it
    // else add new category and 
    if (accum[question.category]) {
      accum[question.category].questions.push(question);
    } else {
      accum[question.category] = { 
        completed: 0, 
        questions: [question] 
      };
    }
    return accum;
  }, {})
}

function markCourseSubmissionStatus(organizedCourses, submissions) {
  // return if no submissions
  if (!submissions || submissions.length <= 0) {
    return organizedCourses;
  }

  const submissionsMap = submissions.reduce((accum, submission) => {
    accum[submission.questionId] = submission;
    return accum;
  }, {});


  for (const [key, courses] of Object.entries(organizedCourses)) {
    courses.questions.forEach(question => {
      const submission = submissionsMap[question.id];
      if (submission) {
        question.submissionStatus = submission.status;
      }    
    });
  }

  return organizedCourses;
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

async function getCoursesData() {
  return Promise.all([getApiCourses(), getApiSubmissions()])
    .then(([courses, submissions]) => {
      console.log("courses are: ", courses, submissions)
      // if (coursesResponse.status === 'error') {
      //   displayError();
      //   return;
      // }

      const organizedCourses = markCourseSubmissionStatus(organizeCourses(courses), submissions);

      return organizedCourses;

    })
    .catch(err => {
      console.log("An Error happened ", err)
    });
}




/**** Rendering ************************ */


function displayError() {
  document.querySelector('.error-message').style.visibility = 'visible';
}

function createDomCategory(title) {
  const category = document.createElement('div');
  category.className = 'category';
  // alternative: category.classList.add('category')
  
  // append key as title
  const categoryTitle = document.createElement('h2');
  categoryTitle.innerText = title;
  // alternative: categoryTitle.textContent = title;

  category.appendChild(categoryTitle);

  return category;
}

function createDomQuestion(question) {
  const questionEl = document.createElement('div');
  questionEl.classList.add('question');

  const statusEl = document.createElement('div');
  if (question.submissionStatus) {
    statusEl.classList.add(question.submissionStatus.toLowerCase());
  } else {
    statusEl.classList.add('unattempted');
  }
  questionEl.appendChild(statusEl);
  
  // append key as title
  const questionTitleEl = document.createElement('h3');
  questionTitleEl.textContent = question.name;

  questionEl.appendChild(questionTitleEl);

  return questionEl;
}


function displayCourseUI(organizedCourses) {

  // create container
  const allCategories = document.createElement('div');
  allCategories.className = "all-categories";

  for (const [key, courses] of Object.entries(organizedCourses)) {
    console.log(key, courses);

    // for each key
    //   create a category with title
    const category = createDomCategory(key);

    let correctAnswers = 0;

    // for each value
    //   create a question
    //   append to category
    courses.questions.forEach(question => {
      if (question.submissionStatus?.toLowerCase() === 'correct') {
        correctAnswers++
      }
      category.appendChild(createDomQuestion(question));
    })

    let categoryTitle = category.querySelector("h2").textContent
    category.querySelector("h2").textContent = `${categoryTitle} - 
      ${correctAnswers} / ${courses.questions.length}`;

    // append category
    allCategories.appendChild(category);
  }

  // append allCategories to the main list container
  document.querySelector('.courses-container').appendChild(allCategories);
}

async function buildCourseUI() {
  // 1. fetch courses
  const organizedCourses = await getCoursesData();

  // 2. display in ui
  displayCourseUI(organizedCourses);
}

buildCourseUI();   // kick it all off
