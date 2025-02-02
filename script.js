// Fonction pour afficher un message dans la chat-box
function displayMessage(message, sender) {
    const messagesContainer = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender === "user" ? "user" : "assistant");

    const avatarElement = document.createElement("div");
    avatarElement.classList.add("avatar");
    avatarElement.textContent = sender === "user" ? "U" : "M";

    const messageContentElement = document.createElement("div");
    messageContentElement.classList.add("message-content");
    messageContentElement.textContent = message;

    messageElement.appendChild(avatarElement);
    messageElement.appendChild(messageContentElement);

    // Ajouter le message à la fin (pas en haut)
    messagesContainer.appendChild(messageElement);

    // Scroll vers le bas pour afficher le dernier message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Fonction pour rechercher un mot dans le dictionnaire
function getDefinition() {
    const userInput = document.getElementById("userInput").value.trim().toLowerCase();
    if (userInput) {
        // Afficher le message de l'utilisateur
        displayMessage(userInput, "user");

        // Recherche de mots
        const words = userInput.split(" ");
        let foundDefinitions = [];

        words.forEach(word => {
            if (dictionary[word]) {
                foundDefinitions.push(`**${word}** : ${dictionary[word]}`);
            }
        });

        // Affichage des résultats
        if (foundDefinitions.length > 0) {
            foundDefinitions.forEach(definition => displayMessage(definition, "assistant"));
        } else {
            displayMessage("Désolé, je ne connais pas ces mots.", "assistant");
        }

        // Effacer le champ après traitement
        document.getElementById("userInput").value = "";
    }
}

// Fonction pour activer la recherche avec la touche Entrée
function handleKeyPress(event) {
    if (event.key === "Enter") {
        getDefinition();
    }
}