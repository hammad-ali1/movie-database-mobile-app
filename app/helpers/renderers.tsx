import HorizontalScroll from "../components/HorizontalScroll";
import { Movie, Show } from "../api/moviedb.api";
import { TouchableOpacity } from "react-native";
import { POSTER_SIZE, IMAGE_BASE_URL } from "../config/config";
import Thumb from "../components/Thumb";

export const renderHorizontalScroll = (
  title: string,
  items: Movie[] | Show[],
  navigation: ScreenNavigationProp
) => {
  if (items?.length === 0) return <></>;
  return (
    <HorizontalScroll
      title={title}
      data={items}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          key={item.id}
          onPress={() => {
            navigation.navigate("Movie", { id: item.id });
          }}
        >
          <Thumb
            image={
              item.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${item.poster_path}`
                : undefined
            }
          />
        </TouchableOpacity>
      )}
    />
  );
};
