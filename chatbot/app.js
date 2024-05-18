import axios from "axios";

const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "sk-proj-yP7Y2ZOkXvfMNXWSYIOfT3BlbkFJRvhfMltDS2ewKGJMYx62";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim(); // Remove leading and trailing whitespace
  if (!message) return; // Do not proceed if the message is empty
  input.value = "";

  // Display user message
  displayMessage("user", message);

  try {
    // Request to OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: message,
        model: "text-davinci-003",
        temperature: 0.7, // Adjust temperature for variability in responses
        max_tokens: 100, // Limit the length of generated response
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // Display chatbot response
    const chatbotResponse = response.data.choices[0].text.trim(); // Remove leading and trailing whitespace
    displayMessage("bot", chatbotResponse);
  } catch (error) {
    console.error("Error:", error.message);
    displayMessage("bot", "Sorry, I couldn't process your request.");
  }
});

// Function to display messages
function displayMessage(sender, message) {
  const messageClass = sender === "user" ? "user-message" : "bot-message";
  const iconPath = sender === "user" ? "./icons/user.png" : "./icons/chatbot.png";
  const messageHTML = `
    <div class="message ${messageClass}">
      <img src="${iconPath}" alt="${sender} icon"> 
      <span>${message}</span>
    </div>`;
  messages.innerHTML += messageHTML;
}
