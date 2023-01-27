const contenitorecard = document.querySelector("#contenitore-card");
const favSong = document.querySelector("#favSong");
// const carosello = document.querySelector("#carouselExampleCaptions");

const APIUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const fetchByQuery = async (query) => {
  const res = await fetch(`${APIUrl}${query}`);
  const { data: songs } = await res.json();
  return songs;
};

//Prima sezione
const prendiCanzone = async function () {
  try {
    const res = await fetchByQuery("vasco rossi");
    // const { data: canzoni } = await res.json();
    // console.log(canzoni);
    for (let i = 0; i < 4; i++) {
      let song = res[i];
      contenitorecard.innerHTML += `
      <div class='col'>
        <div class="card mt-5 bg-warning m-1 " style="width: 18rem; height:40rem">
          <img class="card-img-top mt-3 img-fluid w-100" style="height:420px" src="${song.album.cover_medium}" alt="Card image cap">
          <div class="card-body d-flex flex-column align-items-center justify-content-between  ">
            <h5 class="card-title">${song.title} </h5>
            <p class="card-text">${song.artist.name} </p>
            <a id="skip" href="${song.link}" class="btn btn-dark">Prewiew</a>
          </div>
        </div>
      </div>
      `;
    }
  } catch (error) {
    console.log(error);
  }
};
prendiCanzone();

//Seconda sezione

async function favouriteSong() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=vasco%20rossi"
  );
  const data = await response.json();
  const song = data.data.find((song) => song.title === "Senza Parole");
  favSong.innerHTML = `
  <div class='col'>
  <div class="card mt-5 bg-warning m-1 " style="width: 18rem; height:40rem">
  <img class="card-img-top mt-3 img-fluid w-100" style="height:420px" src="${song.album.cover_medium}" alt="Card image cap">
  <div class="card-body d-flex flex-column align-items-center justify-content-between  ">
  <h5 class="card-title">${song.title} </h5>
  <p class="card-text">${song.artist.name} </p>
  <a id="skip" href="${song.link}" class="btn btn-dark">Prewiew</a>
  </div>
  </div>
  </div>
  `;
}

favouriteSong();

//Terza sezione

async function favouriteAlbum() {
  try {
    const arrayDiQuery = ["nonostante tutto", "eclissi gemitaiz", "ali iltre"];
    for (let i = 0; i < arrayDiQuery.length; i++) {
      const singolaQuery = arrayDiQuery[i];
      let [canzone] = await fetchByQuery(singolaQuery);
      const sezione = document.querySelector(".carousel-inner");
      sezione.innerHTML += `
      <div class="carousel-item ${i == 0 ? "active" : " "}">
      <img src="${
        canzone.album.cover_medium
      }" class="d-block w-100" alt="..." />
        </div>`;
    }
  } catch (error) {
    console.log(error);
  }
}
favouriteAlbum();

//   const response = await fetch(
//     "https://striveschool-api.herokuapp.com/api/deezer/search?q=nonostante%20tutto%20gemitaiz"
//   );
//   const data = await response.json();
//   const song1 = data.data.find(
//     (song1) => song1.album.title === "Nonostante Tutto"
//   );
//   carosello.innerHTML += `<div class="carousel-item ${i == 0 ? "active" : " "}
//     ">
//     <img src= "${song1.album.cover}" class ="d-block w-100"
//     </div>
//     `;
// }