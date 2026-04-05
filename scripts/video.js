//1. Fetch, Load and show Categories on html

// create loadCategories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => DisplayCategories(data.categories))
    .catch((err) => console.log(err));
};

loadCategories();

// create loadVideo
const loadVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      return DisplayCard(data.videos);
    })
    .catch((err) => console.log(err));
};

loadVideo();

const loadCategoriesVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.category);
      return DisplayCard(data.category);
    })
    .catch((err) => console.log(err));
};

// Create DisplayCategories

const DisplayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  const button = document.createElement("button");
  button.classList = "btn";
  button.innerText = "All";
  button.onclick = () => loadVideo();
  categoryContainer.append(button);
  categories.forEach((element) => {
    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button onclick="loadCategoriesVideos(${element.category_id})" class="btn">
      ${element.category}
      </button>
    `;

    // add button to category container
    categoryContainer.append(buttonContainer);
  });
};

// get time/date

const getTimeDate = (time) => {
  // 1. Calculate units using Remainder (%)
  const day = Math.floor(time / 86400);
  const hrs = Math.floor((time % 86400) / 3600);
  const min = Math.floor((time % 3600) / 60);
  const sec = time % 60;

  // 2. Build the string conditionally
  // We check if the number is greater than 0 instead of .length
  let result = "";

  if (day > 0) result += `${day} day `;
  if (hrs > 0) result += `${hrs}hr `;
  if (min > 0) result += `${min}min `;
  result += `${sec}sec`;

  return result.trim();
};

// create DisplayCard

const DisplayCard = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = " ";
  if (videos.length == 0) {
    const card = document.createElement("div");
    videoContainer.classList.remove("grid");
    card.innerHTML = `
      <div class="w-full min-h-screen flex gap-5 justify-center items-center flex-col">
        <img src = "./assets/Icon.png" class='w-30'/>
        <p>Opps! there is no video </p>
      </div>
    `;
    videoContainer.append(card);
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-sm flex flex-col">
  <figure class="h-52 overflow-hidden relative">
    <img
      src="${video.thumbnail}"
      alt="${video.title}"
      class="w-full h-full object-cover"
    />
    ${
      video.others.posted_date?.length == 0
        ? " "
        : `
      <span class="absolute bottom-4 right-4 bg-white color-[#000000]">
      ${getTimeDate(video.others.posted_date)}
      </span>
      `
    }
  </figure>

  <div class="card-body flex flex-col flex-1">
    <div class="flex gap-2 items-center mb-2">
      <img
        src="${video.authors[0].profile_picture}"
        alt="${video.authors[0].profile_name}"
        class="w-10 h-10 rounded-full object-cover"
      />
      <h2 class="card-title text-lg line-clamp-2">${video.title}</h2>
    </div>

    <p class="text-sm text-gray-500 truncate flex gap-5 justify-start items-center">
      ${video.authors[0].profile_name}
      <span>${video.authors[0].verified == true ? '<img src="https://static.vecteezy.com/system/resources/thumbnails/047/309/918/small_2x/verified-badge-profile-icon-png.png" class="w-5" />' : " "}</span>
    </p>
    <p class="text-sm text-gray-500 mt-auto">
      ${video.others.views} views
    </p>
  </div>
</div>
    `;

    // card added to the videoContainer
    videoContainer.append(card);
  });
};
