import HorizontalScroll from "../components/HorizontalScroll";
import { Movie } from "../api/moviedb.api";
import { TouchableOpacity } from "react-native";
import { POSTER_SIZE, IMAGE_BASE_URL } from "../config/config";
import Thumb from "../components/Thumb";

export const renderHorizontalScroll = (
  title: string,
  movies: Movie[],
  navigation: ScreenNavigationProp
) => {
  return (
    <HorizontalScroll
      title={title}
      data={movies}
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
