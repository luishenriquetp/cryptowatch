import { View } from "react-native";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { Input, Text } from "react-native-elements";
import { Feather as Icon } from "@expo/vector-icons";

export default function App() {
	const [text, setText] = useState("BTCUSDT");
	const [symbol, setSymbol] = useState("btcusdt");
	const [data, setData] = useState({});

	const { lastJsonMessage } = useWebSocket(
		`wss://stream.binance.com:9443/ws/${symbol}@ticker`,
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
		<View
			style={{
				flexDirection: "column",
				marginTop: 40,
				margin: 20,
				alignContent: "center",
			}}
		>
			<Text h1>CryptoWatch 1.0</Text>
			<Input
				title="Digite o par de moedas."
				autoCapitalize="characters"
				leftIcon={<Icon name="dollar-sign" size={24} color="black" />}
				value={text}
				rightIcon={
					<Icon.Button
						name="search"
						size={24}
						color="black"
						backgroundColor="transparent"
						onPress={(evt) => setSymbol(text.toLowerCase())}
					/>
				}
				onChangeText={(txt) => setText(txt.toUpperCase())}
			/>
			<Text>{JSON.stringify(data)}</Text>
		</View>
	);
}
