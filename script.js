// 🔹 Select elements
let container = document.querySelector(".cards");
let inp = document.querySelector(".inp");

// 🔹 Store users (comming from API)
let users = [];

// 🔹 Reusable No Result element
const noResult = document.createElement("h3");
noResult.textContent = "No Result Found";
noResult.style.fontSize = "3rem";
noResult.style.color = "white";
noResult.style.textAlign = "center";

// 🔹 Show Users Function
function showUsers(arr) {
  container.innerHTML = "";

  arr.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = user.pic;
    img.classList.add("bg-img");

    const blurredLayer = document.createElement("div");
    blurredLayer.style.backgroundImage = `url(${user.pic})`;
    blurredLayer.classList.add("blurred-layer");

    const content = document.createElement("div");
    content.classList.add("content");

    const heading = document.createElement("h3");
    heading.textContent = user.name;

    const para = document.createElement("p");
    para.textContent = user.email;

    content.append(heading, para);
    card.append(img, blurredLayer, content);

    container.appendChild(card);
  });
}

// 🔹 Fetch Users from API
async function fetchUsers() {
  try {
    container.innerHTML = "<h2 style='color:white;text-align:center;'>Loading...</h2>";

    let res = await fetch("https://randomuser.me/api/?results=7");
    let data = await res.json();

    // 🔥 Convert API data into your format
    users = data.results.map((item) => ({
      name: item.name.first + " " + item.name.last,
      pic: item.picture.large,
      email: item.email,
    }));

    showUsers(users);
  } catch (error) {
    container.innerHTML = "<h2 style='color:red;text-align:center;'>Error loading data</h2>";
    console.error(error);
  }
}

// 🔹 Search Filter
inp.addEventListener("input", function () {
  let searchValue = inp.value.toLowerCase().trim();

  let filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchValue)
  );

  container.innerHTML = "";

  if (filteredUsers.length === 0 && searchValue !== "") {
    container.appendChild(noResult);
  } else {
    showUsers(filteredUsers.length ? filteredUsers : users);
  }
});

// 🔹 Initial Call
fetchUsers();
