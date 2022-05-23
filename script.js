let data
async function start()
{
    const response= await fetch("https://api.aniapi.com/v1/anime")// fetch an endpoint using api
    const datainjson= await response.json()
    data = datainjson.data.documents
    const animeList=data.map(onlyAnimeNames)
    createSelectionOptions(animeList)
}
function onlyAnimeNames(animeinfo)
{
  return animeinfo.titles.en
}
start()
function createSelectionOptions(animeList){

  document.getElementById("anime").innerHTML=`
    <select id="selectBar" class="selectBar" onchange="loadThingsByAnime(this.value)">
      <option> Choose Your Favourite Anime </option>
      ${ animeList.map(function(animeList){
        return `<option>${animeList}</option>`
      })}
    </select>
  `
}

async function loadThingsByAnime(animeName)
{

    if(animeName != "Choose Your Favourite Anime")
    {
      let animeInfo= data.filter(function(anime){

              return anime.titles.en == animeName
          })

          console.log(animeInfo)
          createDescriptionSlide(animeInfo)
    }
}

function createDescriptionSlide(anime){

  let animeCardWindow=document.getElementById("slide-show")
  animeCardWindow.innerHTML=`
      <div class="image-container">
      <img src=${anime[0].cover_image} alt="coverImage" />
      </div>
      <div class=" aboutSection">
      <h3> Description </h3>
      <p> ${anime[0].descriptions.en}</p>
      </div>

    `
}
