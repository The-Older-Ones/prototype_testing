const URL = 'https://opentdb.com/';

const fetchQuestion = async (categoryId, token = null) => {
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default(`${URL}api.php?amount=1&category=${categoryId}&type=multiple${token !== null && `&token=${token}`}&encode=url3986`);
        const data = await response.json();
        return data.results;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const fetchToken = async () => {
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default(`${URL}api_token.php?command=request`);
        const data = await response.json();
        return data.token;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    fetchQuestion,
    fetchToken
};
