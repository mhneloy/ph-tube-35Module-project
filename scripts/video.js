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
// Create DisplayCategories

const DisplayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  const button = document.createElement("button");
  button.classList = "btn";
  button.innerText = "All";
  categoryContainer.append(button);
  categories.forEach((element) => {
    // create a button
    const button = document.createElement("button");
    button.classList = "btn"; // button.classList ekhante amara ekshate onek gula class add krote pari ekshate inverted comma er bhitore
    button.innerText = element.category;

    // add button to category container
    categoryContainer.append(button);
  });
};

// create DisplayCard

const DisplayCard = (videos) => {
  const videoContainer = document.getElementById("videos");
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-sm flex flex-col">
  <figure class="h-52 overflow-hidden">
    <img
      src="${video.thumbnail}"
      alt="${video.title}"
      class="w-full h-full object-cover"
    />
  </figure>

  <div class="card-body flex flex-col flex-1">
    <div class="flex gap-2 items-center mb-2">
      <img
        src="${video.authors[0].profile_picture}"
        alt="${video.authors[0].profile_picture.profile_name}"
        class="w-10 h-10 rounded-full object-cover"
      />
      <h2 class="card-title text-lg line-clamp-2">${video.title}</h2>
    </div>

    <p class="text-sm text-gray-500 truncate">
      ${video.authors[0].profile_picture.profile_name}
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
