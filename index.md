<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="./assets/img/favicon.ico" rel="icon" type="image/x-icon" />
    <link rel="stylesheet" href="./assets/css/style.css" />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.1.1/css/all.css"
      integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
      integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
      crossorigin="anonymous"
    />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
      rel="stylesheet"
    />
    <title>Boolflix</title>
  </head>
  <body class="bg-black">
    <div id="boolflix" class="text-white">

      <!-- Header div -->
      <div class="header d-flex justify-content-between">
        <a href="#"
          ><img
            src="https://fontmeme.com/permalink/210609/4937b74c6317b36c509baa13669b4b20.png"
            alt="netflix-font"
        /></a>
        <input
          id="research_field"
          type="text"
          v-model="searchQuery"
          v-on:keyup.enter="boolSearch"
          class="align-self-center"
          placeholder="search your title here"
        />
      </div>
      <!-- /Header div -->

      <!-- sezione film -->
      <h2 class="text-netflixred">Movies</h2>
      <!-- movie card -->
      <div class="boolrow d-flex flex-direction-row flex-wrap justify-content-start">
        <div class="movie-card" v-for="movie in movieList">
          <img
            :src="moviePosterUrl+movie.poster_path"
            alt=""
            class="boolflix_thumbnail"
            @error="posterError"
          />
          <!-- overlay -->
          <div class="card-flip">
            <h3>{{ movie.title }}</h3>
            <h6>Titolo originale: <span class="font-weight-normal">{{ movie.original_title }}</h6>
            <h6>
            Lingua:
            <img
              :src="flagUrl+movie.original_language+flagExt"
              alt=""
              @error="flagError"
            />
            </h6>
            <h6>Voto: 
              <strong v-if="movie.vote_average == 0"><i class="far fa-star"></i></strong>
              <i class="fas fa-star" v-for="x in movie.vote_average" v-else></i>
            </h6>
            <h6>Cast: <span v-for="cast in movie.cast" class="font-size-12 font-weight-normal">{{cast.name}}, </span></h6>
            <h6>Genre: <span v-for="genre in movie.genre" class="font-size-12 font-weight-normal">{{genre.name}}, </span></h6>
            <p class="font-size-12"><span class="font-size-14 font-weight-bold">Overview: </span>{{ movie.overview }}</p>
          </div>
          <!-- /overlay -->
        </div>
      </div>
      <!-- /movie card -->
      <!-- /sezione film -->

      <!-- sezione serie tv -->
      <h2 class="text-netflixred">TV Series</h2>
      <div class="boolrow d-flex flex-direction-row flex-wrap justify-content-start">
        <div class="series-card text-wrap" v-for="serie in seriesList">
          <img
            :src="moviePosterUrl+serie.poster_path"
            alt=""
            class="boolflix_thumbnail"
            @error="posterError"
          />
          <div class="card-flip">
            <h5>{{ serie.name }}</h5>
            <h6>Titolo originale: <span class="font-weight-normal">{{ serie.original_name }}</span></h6>
        <h6>
          Lingua:
          <img
            :src="flagUrl+serie.original_language+flagExt"
            alt=""
            @error="flagError"
          />
        </h6>
        <h6>
          Voto:
          <strong v-if="serie.vote_average == 0"
            ><i class="far fa-star"></i
          ></strong>
          <i class="fas fa-star" v-for="x in serie.vote_average" v-else></i>
        </h6>
        <h6>Cast: <span v-for="cast in serie.cast" class="font-size-12 font-weight-normal">{{cast.name}}, </span></h6>
        <h6>Genre: <span v-for="genre in serie.genre" class="font-size-12 font-weight-normal">{{genre.name}}, </span></h6>
        <p><span class="font-size-12"><span class="font-size-14 font-weight-bold">Overview: </span>{{ serie.overview }}</p>
          </div>
      </div>
      
    </div>
    </div>

    <!-- Vuejs -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
    <!-- Axios -->
    <script
      type="application/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"
      integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <!-- my Javascript -->
    <script type="application/javascript" src="./assets/js/main.js"></script>
  </body>
</html>
