// 카드 데이터 섞기
export function shuffleArray(array) {
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
