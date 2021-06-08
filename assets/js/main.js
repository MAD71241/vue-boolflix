const app = new Vue({
    el: "#boolflix",

    data: {
        url: "https://api.themoviedb.org/3/search/movie?api_key=",
        myKey: "b03ae2cf97e2691b0cbd883f2249f38a",
        searchQuery: "",
        movieList: [],
    },

    methods: {

    },

    mounted () {
        axios.get(this.url+this.myKey+"&query="+"ritorno+al+futuro")
        .then (response => {
            this.movieList = response.data.results
            console.log(this.movieList);
        })
    }

})