const conversation = [
    "\n__________________________________________________\n",
    "\nWillkommen im TriviaApi Grabber.\n",
    "\nEs werden pro Anfrage 10 Fragen generiert. Wie oft soll dieser Vorgang wiederholt werden?\n",
    "\nVielen Dank für die Informationen, Ihre Datei befindet sich nun in der Grabberschmiede und wird hergestellt\n",
    "\nIhre Datein wurde erfolgreich erstellt, Ich hoffe alles ist zu Ihrer zufriedenheit und Ich wünsche Ihnen einen schönen Tag oder aber bis später.\n"
]

const categoryMapper = {
    geography: () => "Geography",
    film_and_tv: () => "Film & TV",
    arts_and_literature: (tags) => {
        let category = "Art";
        for (let x = 0; x < tags.length; x++) {
            if (tags[x] === "literature") {
                category = "Books";
            }
        }
        return category;
    },
    science: (tags) => {
        let category = "Science";
        for (let x = 0; x < tags.length; x++) {
            if (tags[x] === "animals") {
                category = "Animals";
            }
            if (tags[x] === "mathematics") {
                category = "Mathematics";
            }
            if (tags[x] === "history") {
                category = "History";
            }
        }
        return category;
    },
    general_knowledge: () => "General Knowledge",
    sport_and_leisure: (tags) =>{
        let category = "Sports";
        for (let x = 0; x < tags.length; x++) {
            if (tags[x] === "board_games") {
                category = "Board Games";
            }
            if (tags[x] === "video_games") {
                category = "Video Games";
            }
        }
        return category;
    },
    society_and_culture: () => "General Knowledge",
    history: () => "History",
    music: () => "Music",
    food_and_drink: () => "Food and Drink"

}

module.exports = {
    conversation,
    categoryMapper
}