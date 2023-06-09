import { Text, View } from "react-native";
import { useState } from "react";
import useWebSocket from "react-use-websocket";

export default function App() {
	const [data, setData] = useState({});

	const { lastJsonMessage } = useWebSocket(
		`wss://stream.binance.com:9443/ws/btcusdt@ticker`,
		{
			onOpen: () => {},
			onMessage: () => {
				if (lastJsonMessage) {
					setData({
						priceChange: parseFloat(lastJsonMessage.p),
						priceChangePercent: parseFloat(lastJsonMessage.P),
						close: lastJsonMessage.c,
						high: lastJsonMessage.h,
						low: lastJsonMessage.l,
						quoteVolume: lastJsonMessage.q,
					});
				}
			},
			onError: (event) => console.error(event),
			shouldReconnect: (closeEvent) => true,
			reconnectInterval: 3000,
		}
	);

	return (
		<View>
			<Text>{JSON.stringify(data)}</Text>
		</View>
	);
}
