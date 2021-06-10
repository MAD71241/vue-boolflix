const boolflix = new Vue({
    el: "#boolflix",

    data: {
        moviesUrl: "https://api.themoviedb.org/3/search/movie?api_key=",
        seriesUrl: "https://api.themoviedb.org/3/search/tv?api_key=",
        castUrl: "https://api.themoviedb.org/3/movie/",
        flagUrl: "https://flagcdn.com/24x18/",
        moviePosterUrl: "https://image.tmdb.org/t/p/w300/",
        myKey: "b03ae2cf97e2691b0cbd883f2249f38a",
        searchQuery: "",
        movieList: [],
        seriesList: [],
        flagExt: ".png",
    },

    methods: {
        /* funzione di ricerca simultanea tra serie tv e film */
        boolSearch() {
            axios.all([
                axios.get(this.moviesUrl + this.myKey + "&query=" + this.searchQuery),
                axios.get(this.seriesUrl + this.myKey + "&query=" + this.searchQuery)
            ])
                .then(axios.spread((movies, series) => {
                    this.movieList = movies.data.results
                    for (let index = 0; index < this.movieList.length; index++) {
                        const element = this.movieList[index];
                        console.log(element);
                        element.vote_average = parseInt(element.vote_average / 2);
                        /* ciclo che ritorna una stringa se l'elemento overview nell'oggetto movie è vuoto. */
                        if (element.overview == "") {
                            element.overview = "Overview not found."
                        }
                        const movieId = element.id
                        /* chiamata Axios per ottenere il cast degli attori */
                        axios.get(this.castUrl + movieId + "/credits?api_key=" + this.myKey)
                            .then(cast => {
                                //inserisce oggetto "cast" in ogni film
                                this.$set(element, "cast", cast.data.cast.slice(0, 5));
                            })
                            .catch(error => {
                                console.log(error);
                            })
                        // chiamata Axios per ottenere il genere del film
                        axios.get(this.castUrl + movieId + "?api_key=" + this.myKey)
                            .then(moviedata => {
                                this.$set(element, "genre", moviedata.data.genres);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    }

                    this.seriesList = series.data.results
                    console.log(this.movieList);
                    /* ciclo che ritorna una stringa se l'elemento overview nell'oggetto serie è vuoto. */
                    for (let index = 0; index < this.seriesList.length; index++) {
                        const element = this.seriesList[index];
                        element.vote_average = parseInt(element.vote_average / 2);
                        const seriesId = element.id
                        if (element.overview == "") {
                            element.overview = "Overview not found."
                        }
                        /* chiamata Axios per ottenere il cast degli attori */
                        axios.get(this.castUrl + seriesId + "/credits?api_key=" + this.myKey)
                            .then(cast => {
                                //inserisce oggetto "cast" in ogni film
                                this.$set(element, "cast", cast.data.cast.slice(0, 5));
                            })
                            .catch(error => {
                                console.log(error);
                            })
                        // chiamata Axios per ottenere il genere della serie
                        axios.get(this.castUrl + seriesId + "?api_key=" + this.myKey)
                            .then(seriedata => {
                                this.$set(element, "genre", seriedata.data.genres);
                                console.log(element);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    }
                }))
                .catch(error => {
                    console.log("Non è stato possibile caricare i risultati, errore: " + error);
                })
        },
        /* funzione utilizzata per sostituire i codici bandiera che generano un errore 404 */
        flagError(event) {
            if (event.target.src.includes("en")) {
                event.target.src = "https://flagcdn.com/24x18/us.png"
            } else if (event.target.src.includes("ja")) {
                event.target.src = "https://flagcdn.com/24x18/jp.png"
            } else if (event.target.src.includes("zh")) {
                event.target.src = "https://flagcdn.com/24x18/cn.png"
            } else if (event.target.src.includes("ko")) {
                event.target.src = "https://flagcdn.com/24x18/kr.png"
            } else if (event.target.src.includes("da")) {
                event.target.src = "https://flagcdn.com/24x18/dk.png"
            } else if (event.target.src.includes("fa")) {
                event.target.src = "https://flagcdn.com/24x18/ir.png"
            }

        },
        /* funzione utilizzata per sostituire le immagini poster quando si presenta un errore 404 */
        posterError(event) {
            event.target.src = "./assets/img/404_screen.jpg"
        }

    }
    ,
    computed: {

    }
})