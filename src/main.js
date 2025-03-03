import "./style.css";
import { cardData } from "./cardData";
import GameManager from "./services/GameManager";

// 게임 매니저 인스턴스 생성
const gameManager = new GameManager();

// 게임 시작 버튼에 이벤트 리스너 연결
document.getElementById("startBtn").addEventListener("click", () => {
  gameManager.toggleTimer();
});

// 리셋 버튼에 이벤트 리스너 연결
document.getElementById("resetBtn").addEventListener("click", () => {
  gameManager.resetGame();
});

// 페이지 로드 시 게임 매니저 초기화
window.addEventListener("DOMContentLoaded", () => {
  gameManager.initialize();
});

// ----------------------------------------------------------------------------------------------------
// // 스타트 버튼 이벤트 리스너
// function startGame() {
//   resetGameState();
//   createCards();

//   // UI 상태 변경
//   document.getElementById("resetBtn").style.display = "inline-block";
// }

// let hasFlippedCard = false; // 카드가 뒤집혔는지
// let firstCard, secondCard;
// let lockBoard = false; // 두 카드 확인 중에 추가 클릭 방지

// // 게임 상태 초기화 함수
// function resetGameState() {
//   [hasFlippedCard, lockBoard] = [false, false];
//   [firstCard, secondCard] = [null, null];
//   tries = 0;
//   score = 0;

//   document.getElementById("tryCount").textContent = tries;
//   document.getElementById("pointCount").textContent = score;
// }

// // 카드 데이터 섞기
// function shuffleArray(array) {
//   // 배열의 마지막 요소부터 시작
//   for (let i = array.length - 1; i > 0; i--) {
//     // 0부터 i 사이의 랜덤한 위치 선택
//     const j = Math.floor(Math.random() * (i + 1));

//     let temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   }
//   return array;
// }

// // 카드 생성 및 배치 함수
// function createCards() {
//   const cardGrid = document.querySelector(".card-grid");
//   cardGrid.innerHTML = ""; // 기존 카드 제거

//   // 카드 데이터 복사본 만들기 (원본 변경 방지)
//   const shuffledCards = shuffleArray([...cardData]);

//   // 섞인 데이터로 카드 생성
//   shuffledCards.forEach((element) => {
//     const card = document.createElement("div");
//     card.className = "card";

//     const card_inner = document.createElement("div");
//     card_inner.className = "card_inner";

//     const card_front = document.createElement("div");
//     card_front.className = "card_front";
//     card_front.textContent = `${element.value}`;

//     const card_back = document.createElement("div");
//     card_back.className = "card_back";

//     cardGrid.appendChild(card);
//     card.appendChild(card_inner);
//     card_inner.appendChild(card_front);
//     card_inner.appendChild(card_back);

//     // 카드에 이벤트 리스너 추가
//     card.addEventListener("click", flipCard);
//   });
// }

// // 지금은 카드가 뒤집혔는지 안되었는지 확인 하는 함수이고 변수에 저장
// function flipCard() {
//   const clickCard = this;

//   if (!isTimerRunning) return;

//   if (lockBoard) return;
//   if (clickCard === firstCard) return;

//   if (!hasFlippedCard) {
//     hasFlippedCard = true;
//     firstCard = clickCard;
//     firstCard.classList.add("flipped");
//   } else {
//     secondCard = clickCard;
//     secondCard.classList.add("flipped");

//     checkForMatch();
//   }
// }

// // 매치가 될때와 안될때
// function checkForMatch() {
//   let firstCardValue = firstCard.querySelector(".card_front").textContent;
//   let secondCardValue = secondCard.querySelector(".card_front").textContent;
//   // 값이 일치하는지 확인
//   if (firstCardValue === secondCardValue) {
//     // 매치된 경우의 처리

//     firstCard.classList.add("matched");
//     secondCard.classList.add("matched");

//     updatePoints();
//     disableCards();

//     // 게임 완료 확인 추가
//     checkGameCompletion();
//   } else {
//     lockBoard = true;

//     setTimeout(() => {
//       firstCard.classList.remove("flipped");
//       secondCard.classList.remove("flipped");

//       updateTries();

//       resetBoard();
//     }, 1000);
//   }
// }

// // 매치 되고 난 카드들 상태
// function disableCards() {
//   firstCard.removeEventListener("click", flipCard);
//   secondCard.removeEventListener("click", flipCard);

//   resetBoard();
// }
// // 카드 클릭하고 난 상태
// function resetBoard() {
//   [hasFlippedCard, lockBoard] = [false, false];
//   [firstCard, secondCard] = [null, null];
// }

// // 실행한 횟수

// let score = 0;
// let tries = 0;

// function updateTries() {
//   tries++;
//   document.getElementById("tryCount").textContent = tries;
// }

// // 획득점수
// function updatePoints() {
//   score++;
//   document.getElementById("pointCount").textContent = score;
// }

// // 타이머 관련 변수
// let timerInterval;
// let seconds = 0;
// let isTimerRunning = false;
// let isGameStarted = false;

// // 스타트 버튼을 타이머 시작 버튼으로 활용
// document.getElementById("startBtn").addEventListener("click", toggleTimer);

// // 타이머 시작 / 정지 토글 함수
// function toggleTimer() {
//   if (!isGameStarted) {
//     startGame();
//     isGameStarted = true;
//   }

//   if (!isTimerRunning) {
//     startTimer();
//     document.getElementById("startBtn").textContent = "Pause";

//     // 카드 그리드에 활성화 상태 표시
//     document.querySelector(".card-grid").classList.remove("paused");
//   } else {
//     //타이머 정지
//     stopTimer();
//     document.getElementById("startBtn").textContent = "Resume";

//     // 카드 그리드에 일시정지 상태 표시
//     document.querySelector(".card-grid").classList.add("paused");
//   }
//   isTimerRunning = !isTimerRunning;
// }

// // 타이머 시작 함수
// function startTimer() {
//   timerInterval = setInterval(updateTimer, 1000);
// }

// // 타이머 정지 함수
// function stopTimer() {
//   clearInterval(timerInterval);
// }

// // 타이머 업데이트 함수
// function updateTimer() {
//   seconds++;
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;

//   // 타이머 표시 형식: MM:SS
//   document.getElementById("timer").textContent = `${minutes
//     .toString()
//     .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
// }

// // 타이머 리셋 함수
// function resetTimer() {
//   stopTimer();
//   seconds = 0;
//   isTimerRunning = false;
//   document.getElementById("timer").textContent = "00:00";
// }

// // 게임 완료 확인 함수
// function checkGameCompletion() {
//   const matchedCards = document.querySelectorAll(".card.matched");
//   const allMatched = matchedCards.length === 16;

//   if (allMatched) {
//     // 타이머 정지
//     stopTimer();
//     // 선택적: 완료 메시지 표시
//     alert(`축하합니다! 게임을 ${seconds}초 만에 완료했습니다!`);
//   }
// }

// // 리셋 버튼 이벤트 리스터
// document.getElementById("resetBtn").addEventListener("click", () => {
//   //타이머 리셋
//   resetTimer();
//   // 게임 변수 초기화
//   isGameStarted = false;

//   // 게임 상태 초기화
//   resetGameState();

//   // 카드 다시 생성
//   createCards();

//   // 타이머 다시 시작
//   startTimer();
// });
