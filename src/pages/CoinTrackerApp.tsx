// 코인 시세 앱 (라우팅)
import { useState, useEffect, ChangeEvent } from "react";

//코인 객체 타입 정의
type Coin = {
  id: string;
  name: string;
  symbol: string;
  quotes: {
    USD: {
      price: number;
    };
  };
};

const CoinTrackerApp = () => {
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [coins, setCoins] = useState<Coin[]>([]); // 전체 코인 목록 (Coin 배열)
  const [amount, setAmount] = useState<string>(""); // 사용자 입력값 (달러 금액, 문자열)
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null); // 선택된 코인 (혹은 null일 수 있음)
  const [result, setResult] = useState<number | null>(null); //계산 결과 (혹은 null)

  /*
  // 코인 API 호출 (처음 마운트될 때만 실행)
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json()) // 응답 데이터 파싱
      .then((data) => {
        setCoins(data); // 코인 목록 저장
        setLoading(false); // 로딩 완료 후 상태 변경
      });
  }, []);
  */

  // 코인 API 호출 (처음 마운트될 때만 실행)
  useEffect(() => {
    // 비동기 함수(async)를 선언해서, API를 호출
    const fetchCoins = async () => {
      // await 키워드 사용해 비동기 작업, fetch 함수가 완료될 때까지 기다렸다가 그 결과를 response에 저장.
      const response = await fetch("https://api.coinpaprika.com/v1/tickers");
      const data = await response.json(); // 응답 데이터 파싱

      //잡코인 필터링
      const filteredCoins = data.filter(
        (coin: Coin) => coin.quotes.USD.price >= 0.01
      );

      setCoins(filteredCoins); // 코인 목록 저장
      setLoading(false); // 로딩 완료 후 상태 변경
    };

    //선언한 비동기 함수 직접 호출.
    fetchCoins();
  }, []);

  // 선택된 코인이 바뀌면 결과 초기화
  useEffect(() => {
    setResult(null);
  }, [selectedCoin]);

  // 코인 선택 시 해당 코인 찾기
  const onCoinSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const coin = coins.find((c) => c.id === selectedId) || null;
    setSelectedCoin(coin);
  };
  // 달러 입력 시 상태 변경
  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  // 계산 버튼 클릭 시: 구매 가능한 코인 수 계산
  const onCalculate = () => {
    if (!selectedCoin || !amount) return;

    const coinPrice = selectedCoin.quotes.USD.price;
    const coinAmount = parseFloat(amount) / coinPrice;
    setResult(coinAmount);
  };

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          {/* 코인 선택 드롭다운 */}
          <select onChange={onCoinSelect}>
            <option value="">Select a coin</option>

            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price.toFixed(2)}
              </option>
            ))}
          </select>
          {/* 입력창 */}
          <input
            type="number"
            placeholder="Enter your dollars"
            value={amount}
            onChange={onAmountChange}
          />
          {/* 계산 버튼 */}
          <button onClick={onCalculate}>Calculate</button>
          {/* 결과 출력 */}
          {result !== null && selectedCoin && (
            <p>
              You can buy approximately {result.toFixed(4)}{" "}
              {selectedCoin.symbol}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CoinTrackerApp;
