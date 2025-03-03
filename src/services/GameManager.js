import { shuffleArray } from "../utils/helpers";
import { cardData } from "../cardData";
import Card from "../components/Card";

class GameManager {
  constructor() {
    this.hasFlippedCard = false;
    this.lockBoard = false; // 현재 잠겨있는지
    this.firstCard = null;
    this.secondCard = null;
    this.tries = 0;
    this.score = 0;
    this.timerInterval = null;
    this.seconds = 0;
    this.isTimerRunning = false; // 타이머가 실행중이다
    this.isGameStarted = false;

    this.cards = []; // 카드 객체들을 저장할 배열

    // DOM 요소 참조 저장
    this.startBtn = document.getElementById("startBtn");
    this.resetBtn = document.getElementById("resetBtn");
    this.timerElement = document.getElementById("timer");
    this.tryCountElement = document.getElementById("tryCount");
    this.pointCountElement = document.getElementById("pointCount");
    this.cardGrid = document.querySelector(".card-grid");
  }

  // 카드 클릭 이벤트 처리 메소드
  handleCardClick(clickedCard) {
    // 게임 상태 확인
    if (this.lockBoard || !this.isTimerRunning) return;
    if (clickedCard === this.firstCard) return;

    // 카드 뒤집기
    clickedCard.flip();

    if (!this.hasFlippedCard) {
      this.hasFlippedCard = true;
      this.firstCard = clickedCard;
    } else {
      this.secondCard = clickedCard;
      this.checkForMatch();
    }
  }

  // 카드 생성 및 배치 함수
  createCards() {
    const cardGrid = document.querySelector(".card-grid");
    cardGrid.innerHTML = ""; // 기존 카드 제거

    // 카드 데이터 복사본 만들기 (원본 변경 방지)
    const shuffledCards = shuffleArray([...cardData]);

    // 섞인 데이터로 카드 생성
    this.cards = shuffledCards.map((data) => {
      const card = new Card(data.id, data.value);
      const cardElement = card.createCardElement();
      cardGrid.appendChild(cardElement);

      // 카드에 이벤트 리스너 추가
      card.addClickListener(() => this.handleCardClick(card));

      return card;
    });
  }

  // 매치 확인 메소드 수정
  checkForMatch() {
    if (this.firstCard.value === this.secondCard.value) {
      this.firstCard.setMatched(true);
      this.secondCard.setMatched(true);
      this.updatePoints();
      this.disableCards();
      this.checkGameCompletion();
    } else {
      // 매치 되지않은 경우
      this.lockBoard = true;
      setTimeout(() => {
        this.firstCard.flip();
        this.secondCard.flip();
        this.updateTries();
        this.resetBoard();
      }, 1000);
    }
  }

  updateTries() {
    this.tries++;
    document.getElementById("tryCount").textContent = this.tries;
  }

  updatePoints() {
    this.score++;
    document.getElementById("pointCount").textContent = this.score;
  }

  // 매치 되고 난 카드들 상태
  disableCards() {
    this.resetBoard();
  }
  // 카드 클릭하고 난 상태
  resetBoard() {
    [this.hasFlippedCard, this.lockBoard] = [false, false];
    [this.firstCard, this.secondCard] = [null, null];
  }

  initialize() {
    this.resetGame();
    this.createCards();

    this.resetBtn.style.display = "inline-block";
  }

  resetGame() {
    [this.hasFlippedCard, this.lockBoard] = [false, false];
    [this.firstCard, this.secondCard] = [null, null];
    this.tries = 0;
    this.score = 0;

    document.getElementById("tryCount").textContent = this.tries;
    document.getElementById("pointCount").textContent = this.score;

    const wasTimerRunning = this.isTimerRunning;
    this.resetTimer();

    this.createCards();

    if (wasTimerRunning) {
      this.startTimer();
      this.isTimerRunning = true;
      this.updateUI();
    }
  }

  // UI 상태 업데이트를 별도 메소드로 분리
  updateUI() {
    if (this.isTimerRunning) {
      this.startBtn.textContent = "Pause";
      this.cardGrid.classList.remove("paused");
    } else {
      this.startBtn.textContent = "Resume";
      this.cardGrid.classList.add("paused");
    }
  }

  toggleTimer() {
    if (!this.isGameStarted) {
      this.initialize();
      this.isGameStarted = true;
    }

    if (!this.isTimerRunning) {
      this.startTimer();
      document.getElementById("startBtn").textContent = "Pause";

      // 카드 그리드에 활성화 상태 표시
      document.querySelector(".card-grid").classList.remove("paused");
    } else {
      //타이머 정지
      this.stopTimer();
      document.getElementById("startBtn").textContent = "Resume";

      // 카드 그리드에 일시정지 상태 표시
      document.querySelector(".card-grid").classList.add("paused");
    }
    this.isTimerRunning = !this.isTimerRunning;
  }

  startTimer() {
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  updateTimer() {
    this.seconds++;
    const minutes = Math.floor(this.seconds / 60);
    const remainingSeconds = this.seconds % 60;

    this.timerElement.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  resetTimer() {
    this.stopTimer();
    this.seconds = 0;
    this.isTimerRunning = false;
    this.timerElement.textContent = "00:00";
  }

  checkGameCompletion() {
    const matchedCards = document.querySelectorAll(".card.matched");
    const allMatched = matchedCards.length === 16;

    if (allMatched) {
      // 타이머 정지
      this.stopTimer();
      this.isTimerRunning = false;
      this.updateUI();

      // 선택적: 완료 메시지 표시
      alert(`축하합니다! 게임을 ${this.seconds}초 만에 완료했습니다!`);
    }
  }
}

export default GameManager;
