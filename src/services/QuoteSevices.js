import axios from "axios";

const QUOTE_URL = "https://qapi.vercel.app/api/random"

function getQuote(){
    return axios.get(QUOTE_URL)
}

const QuoteService = {
    getQuote
}   

export default QuoteService