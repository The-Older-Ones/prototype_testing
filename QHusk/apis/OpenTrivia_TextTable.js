const categoryTable = [
    "General Knowledge = 9",
    "Entertainment : Books = 10",
    "Entertainment : Film = 11",
    "Entertainment : Music = 12",
    "Entertainment : Musicals and Theaters = 13",
    "Entertainment : Televison = 14",
    "Entertainment : Videogames = 15",
    "Entertainment : Boardgames = 16",
    "Science & Nature = 17",
    "Science : Computers = 18",
    "Science : Mathematics = 19",
    "Mythologie = 20",
    "Sports = 21",
    "Geography = 22",
    "History = 23",
    "Politics = 24",
    "Art = 25",
    "Celebriteis = 26",
    "Animals = 27",
    "Vehicles = 28",
    "Entertainment: Comics = 29",
    "Science: Gadgets = 30",
    "Entertainment : Japanese Anime & Manga = 31",
    "Entertainment : Cartoon & Animations = 32"
]

const minCategorieNumber = 9;
const maxCategorieNumber = 32;

const conversation = [
    "\n__________________________________________________\n",
    "\nWillkommen im OpenTrivia Grabber. Bitte teilen Sie mir im folgenden Dialog mit was Sie genau erhalten möchten.\n",
    "\nWieviele Fragen sollen angefordert werden? (Max. 50)\n",
    "\nWelche Kategorie sollen die Fragen haben? (Bitte geben sie die zugehörige Zahl ein oder , Keine Eingabe = Gemischt)\n",
    "\nWelche Schwierigkeit sollen die Fragen haben? ( 1 = Easy , 2 = Medium , 3 = Hard , Keine Eingabe = Gemischt)\n",
    "\nMöchten Sie Multiple Choice, Wahr/Falsch oder Gemischte Fragen? ( 1 = Muliple Choice , 2 = Wahr/Falsch , Keine Eingabe = Gemischt)\n",
    "\nWie oft soll versucht werden, diesen Vorgang zu wiederholen? (Bei 10 Fragen und 2 wiederholungen entstehen 20 Fragen)\n",
    "\nVielen Dank für die Informationen, Ihre Datei befindet sich nun in der Grabberschmiede und wird hergestellt\n",
    "\nIhre Datein wurde erfolgreich erstellt, Ich hoffe alles ist zu Ihrer zufriedenheit und Ich wünsche Ihnen einen schönen Tag oder aber bis später.\n"
]

const responseCode = {
    1: "No Results Could not return results.The API doesnt have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)",
    2: "Invalid Parameter Contains an invalid parameter.Arguements passed in arent valid. (Ex. Amount = Five)",
    3: "Token Not Found Session Token does not exist.",
    4: "Token Empty Session Token has returned all possible questions for the specified query.Resetting the Token is necessary.",
}

const categoryMapper = {
    "Entertainment: Video Games": "Video Games",
    "Sports": "Sports",
    "Science & Nature": "Science",
    "Entertainment: Cartoon & Animations": "Cartoon & Animations",
    "Art": "Art",
    "Entertainment: Music": "Music",
    "Geography": "Geography",
    "Science: Computers": "Computer",
    "History": "History",
    "Animals": "Animals",
    "Entertainment: Japanese Anime & Manga": "Anime & Manga",
    "Entertainment: Television": "Film & TV",
    "Celebrities": "Celebrities",
    "General Knowledge": "General Knowledge",
    "Entertainment: Board Games": "Board Games",
    "Entertainment: Books": "Books",
    "Science: Mathematics": "Mathematics",
    "Entertainment: Film": "Film & TV",
    "Mythology": "Mythology",
    "Entertainment: Comics": "Comics",
    "Vehicles": "Vehicles",
    "Politics": "Politics",
    "Entertainment: Musicals & Theatres": "Musicals & Theatres",
    "Science: Gadgets": "Gadgets"
}

module.exports = {
    categoryTable,
    conversation,
    responseCode,
    minCategorieNumber,
    maxCategorieNumber,
    categoryMapper
}