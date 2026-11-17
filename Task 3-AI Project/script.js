// HTML ელემენტების დაკავშირება JavaScript-თან
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const saveQuoteBtn = document.getElementById('save-quote-btn');
const favoritesContainer = document.getElementById('favorites-container');
const noFavoritesText = document.getElementById('no-favorites');

// ცვლადი, რომელშიც ვინახავთ მიმდინარე ციტატას
let currentQuote = {
    quote: "",
    author: ""
};

// საჯარო API-ს მისამართი (გენერირებს შემთხვევით ციტატას)
const API_URL = 'https://dummyjson.com/quotes/random';

// ფუნქცია: წამოიღოს ახალი ციტატა API-დან
async function fetchNewQuote() {
    try {
        // ვიზუალური ეფექტი - სანამ იტვირთება
        quoteText.textContent = "იტვირთება ციტატა...";
        quoteAuthor.textContent = "";

        // ვურეკავთ API-ს (ველოდებით პასუხს async/await-ით)
        const response = await fetch(API_URL);

        // შევამოწმოთ, წარმატებულია თუ არა პასუხი
        if (!response.ok) {
            throw new Error('ვერ მოხერხდა მონაცემების წამოღება!');
        }

        // ვაკონვერტირებთ პასუხს JSON ფორმატში
        const data = await response.json();

        // ვინახავთ მიმდინარე ციტატის მონაცემებს
        currentQuote.quote = data.quote;
        currentQuote.author = data.author;

        // გამოვსახავთ ეკრანზე
        quoteText.textContent = `„${currentQuote.quote}“`;
        quoteAuthor.textContent = `— ${currentQuote.author}`;

    } catch (error) {
        // თუ რამე შეცდომა მოხდა, ვბეჭდავთ კონსოლში და ვატყობინებთ მომხმარებელს
        console.error("შეცდომა:", error);
        quoteText.textContent = "უპფ! რაღაც შეიშალა. სცადე თავიდან.";
        quoteAuthor.textContent = "";
    }
}

// ფუნქცია: შეინახოს მიმდინარე ციტატა ფავორიტებში
function saveToFavorites() {
    // თუ ტექსტი ჯერ კიდევ იტვირთება, არაფერი ვქნათ
    if (!currentQuote.quote || quoteText.textContent.includes("იტვირთება")) {
        return;
    }

    // ვამოწმებთ, არის თუ არა უკვე ტექსტი "ჯერ ფავორიტები არ გაქვს" და ვშლით
    if (noFavoritesText) {
        noFavoritesText.remove();
    }

    // ვქმნით ახალ დივ (div) ელემენტს ფავორიტის ბარათისთვის
    const favoriteCard = document.createElement('div');
    favoriteCard.className = "bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col gap-2 shadow-md relative";

    // ვქმნით შიგთავსს ციტატისთვის და ავტორისთვის
    favoriteCard.innerHTML = `
        <p class="text-slate-200 text-sm italic">„${currentQuote.quote}“</p>
        <span class="text-xs text-cyan-400 font-semibold">— ${currentQuote.author}</span>
        <button class="delete-btn absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs font-bold cursor-pointer">✕</button>
    `;

    // წაშლის ღილაკის ლოგიკა
    const deleteBtn = favoriteCard.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        favoriteCard.remove();

        // თუ აღარცერთი ფავორიტი აღარ დარჩა, უკან დავაბრუნოთ წარწერა
        if (favoritesContainer.children.length === 0) {
            favoritesContainer.appendChild(noFavoritesText);
        }
    });

    // ვამატებთ ახალ ბარათს ფავორიტების კონტეინერში (სიაში ბოლოში)
    favoritesContainer.appendChild(favoriteCard);
}

// ღილაკებზე მიბმა (EventListener-ები)
newQuoteBtn.addEventListener('click', fetchNewQuote);
saveQuoteBtn.addEventListener('click', saveToFavorites);

// თავიდანვე რომ გამოჩნდეს ერთი ციტატა გვერდის გახსნისთანავე
fetchNewQuote();