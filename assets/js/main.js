const app = new Vue({
    el: "#boolflix",

    data: {
        url: "https://api.themoviedb.org/3/search/movie?api_key=",
        myKey: "b03ae2cf97e2691b0cbd883f2249f38a",
        searchQuery: "",
        movieList: [],
        flagUrl: "https://flagcdn.com/24x18/",
        flagExt: ".png",
        movieLang: "",
    },

    methods: {
        boolSearch() {
            axios.get(this.url + this.myKey + "&query=" + this.searchQuery)
                .then(response => {
                    this.movieList = response.data.results
                })
                .catch(error => {
                    console.log("Non è stato possibile caricare i risultati, errore: " + error);
                })
        }
    },

    mounted() {

    }

})