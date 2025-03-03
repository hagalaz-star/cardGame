import GameManager from "../services/GameManager";

class Card {
  constructor(id, value) {
    this.id = id;
    this.value = value;
    this.isFlipped = false;
    this.isMatched = false;
    this.element = null;
  }

  // 새로 추가하는 메소드: DOM 요소 생성
  createCardElement() {
    // 카드 컨테이너 생성
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = this.id;

    // 카드 내부 요소 생성
    const card_inner = document.createElement("div");
    card_inner.className = "card_inner";

    // 카드 앞면 생성
    const card_front = document.createElement("div");
    card_front.className = "card_front";
    card_front.textContent = `${this.value}`;

    // 카드 뒷면 생성
    const card_back = document.createElement("div");
    card_back.className = "card_back";

    // 요소들 조립
    card.appendChild(card_inner);
    card_inner.appendChild(card_front);
    card_inner.appendChild(card_back);

    // 생성된 요소 저장 및 반환
    this.element = card;
    return card;
  }

  // 카드 뒤집기
  flip() {
    this.isFlipped = !this.isFlipped;

    if (this.isFlipped) {
      this.element.classList.add("flipped");
    } else {
      this.element.classList.remove("flipped");
    }
  }

  // 매치 상태 설정
  setMatched(matched) {
    this.isMatched = matched;

    if (matched) {
      this.element.classList.add("matched");
    } else {
      this.element.classList.remove("matched");
    }
  }

  // 카드 리셋
  reset() {
    this.isFlipped = false;
    this.isMatched = false;
    this.element.classList.remove("flipped", "matched");
  }

  // 클릭 이벤트 등록
  addClickListener(callback) {
    this.element.addEventListener("click", () => {
      // 이미 뒤집혔거나 매치된 카드는 무시
      if (this.isFlipped || this.isMatched) return;

      // 콜백 함수 호출 (GameManager에서 처리할 로직)
      callback(this);
    });
  }
}

export default Card;
