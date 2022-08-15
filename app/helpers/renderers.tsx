import HorizontalScroll from "../components/HorizontalScroll";
import { Movie, Show, Cast } from "../api/moviedb.api";
import { TouchableOpacity, TextStyle } from "react-native";
import { POSTER_SIZE, IMAGE_BASE_URL } from "../config/config";
import Thumb from "../components/Thumb";
import LoadMoreButton from "../components/LoadMoreListButton";

class RenderParams<T> {
  title: string = "";
  titleStyles?: TextStyle = {};
  items: T[] = [];
  navigation: ScreenNavigationProp | undefined;
  onPress?: onPressHandler;
  showButton: boolean = false;
  customKeyExtractor?: (item: T) => number;
}
export function renderHorizontalScroll<Item extends Movie | Show | Cast>(
  {
    title,
    titleStyles,
    items,
    navigation,
    onPress,
    showButton,
    customKeyExtractor,
  } = new RenderParams<Item>()
) {
  if (items?.length === 0) return <></>;
  return (
    <HorizontalScroll
      title={title}
      titleStyles={titleStyles}
      data={items}
      ListFooterComponent={() =>
        showButton ? <LoadMoreButton onPress={onPress} /> : <></>
      }
      customKeyExtractor={customKeyExtractor}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          key={item.id}
          onPress={() => {
            navigation?.navigate("Movie", { id: item.id });
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
}
