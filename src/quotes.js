const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "If you are not embarrassed by the first version of your product, you've launched too late.", author: "Reid Hoffman" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupéry" },
  { text: "It's not about ideas. It's about making ideas happen.", author: "Scott Belsky" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { text: "Life begins at the end of your comfort zone.", author: "Neale Donald Walsch" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "Two roads diverged in a wood, and I — I took the one less travelled by.", author: "Robert Frost" },
  { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  { text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou" },
  { text: "Every artist was first an amateur.", author: "Ralph Waldo Emerson" },
  { text: "The creative adult is the child who has survived.", author: "Ursula K. Le Guin" },
  { text: "An idea that is not dangerous is unworthy of being called an idea at all.", author: "Oscar Wilde" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "To live is the rarest thing in the world. Most people just exist.", author: "Oscar Wilde" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  { text: "Hard times never last, but hard people do.", author: "Robert H. Schuller" },
  { text: "The harder the conflict, the greater the triumph.", author: "George Washington" },
];

function getRandomQuote(excludeText) {
  const pool = excludeText
    ? QUOTES.filter(q => q.text !== excludeText)
    : QUOTES;
  return pool[Math.floor(Math.random() * pool.length)];
}
