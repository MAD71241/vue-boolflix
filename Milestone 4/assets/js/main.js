const app = new Vue({
    el: "#boolflix",

    data: {
        moviesUrl: "https://api.themoviedb.org/3/search/movie?api_key=",
        seriesUrl: "https://api.themoviedb.org/3/search/tv?api_key=",
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
                    console.log(this.movieList);
                    /* ciclo che ritorna una stringa se l'elemento overview nell'oggetto movie è vuoto. */
                    for (let index = 0; index < this.movieList.length; index++) {
                        const element = this.movieList[index];
                        if (element.overview == "") {
                            element.overview = "Overview not found."
                        }

                    }
                    this.seriesList = series.data.results
                    console.log(this.seriesList);
                    /* ciclo che ritorna una stringa se l'elemento overview nell'oggetto serie è vuoto. */
                    for (let index = 0; index < this.seriesList.length; index++) {
                        const element = this.seriesList[index];
                        if (element.overview == "") {
                            element.overview = "Overview not found."
                        }

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
    mounted() {
        
    }
    ,
    computed: {
        
    }
})