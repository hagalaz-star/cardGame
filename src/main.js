import "./style.css";
import { cardData } from "./cardData";

// 카드 데이터 섞기
function shuffleArray(array) {
  // 배열의 마지막 요소부터 시작
  for (let i = array.length - 1; i > 0; i--) {
    // 0부터 i 사이의 랜덤한 위치 선택
    const j = Math.floor(Math.random() * (i + 1));

    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// 카드 데이터 복사본 만들기 (원본 변경 방지)
const shuffledCards = [...cardData];
// 카드 섞기
shuffleArray(shuffledCards);

const cardContainer = document.querySelector(".card-grid");

// 섞인 데이터로 카드 생성
shuffledCards.forEach((element) => {
  const card = document.createElement("div");
  card.className = "card";

  const card_inner = document.createElement("div");
  card_inner.className = "card_inner";

  const card_front = document.createElement("div");
  card_front.className = "card_front";
  card_front.textContent = `${element.value}`;

  const card_back = document.createElement("div");
  card_back.className = "card_back";

  cardContainer.appendChild(card);
  card.appendChild(card_inner);
  card_inner.appendChild(card_front);
  card_inner.appendChild(card_back);
});

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", flipCard);
});

let hasFlippedCard = false; // 카드가 뒤집혔는지
let firstCard, secondCard;
let lockBoard = false; // 두 카드 확인 중에 추가 클릭 방지

// 지금은 카드가 뒤집혔는지 안되었는지 확인 하는 함수이고 변수에 저장
function flipCard() {
  const clickCard = this;

  if (lockBoard) return;
  if (clickCard === firstCard) return;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = clickCard;
    firstCard.classList.add("flipped");
  } else {
    secondCard = clickCard;
    secondCard.classList.add("flipped");

    checkForMatch();
  }
}

// 매치가 될때와 안될때
function checkForMatch() {
  let firstCardValue = firstCard.querySelector(".card_front").textContent;
  let secondCardValue = secondCard.querySelector(".card_front").textContent;
  // 값이 일치하는지 확인
  if (firstCardValue === secondCardValue) {
    // 매치된 경우의 처리

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    updatePoints();
    disableCards();
  } else {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      updateTries();

      resetBoard();
    }, 1000);
  }
}

// 매치 되고 난 카드들 상태
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}
// 카드 클릭하고 난 상태
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// 실행한 횟수

let score = 0;
let tries = 0;

function updateTries() {
  tries++;
  document.getElementById("tryCount").textContent = tries;
}

// 획득점수
function updatePoints() {
  score++;
  document.getElementById("pointCount").textContent = score;
}

// 리셋
document.getElementById("resetBtn").addEventListener("click", resetGame);

function resetGame() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];

  tries = 0;
  points = 0;

  document.getElementById("tryCount").textContent = tries;
  document.getElementById("pointCount").textContent = points;

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.remve("flipped", "matched");

    card.removeEventListener("click", firstCard);
    card.addEventListener("click", firstCard);
  });

  shuffleArray();
}
