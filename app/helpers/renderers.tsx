import HorizontalScroll from "../components/HorizontalScroll";
import { Movie, Show } from "../api/moviedb.api";
import { TouchableOpacity } from "react-native";
import { POSTER_SIZE, IMAGE_BASE_URL } from "../config/config";
import Thumb from "../components/Thumb";
import LoadMoreButton from "../components/LoadMoreListButton";

//
type ScrollRenderer = {
  title: string;
  items: Movie[] | Show[];
  navigation: ScreenNavigationProp;
  onPress?: onPressHandler;
  showButton: boolean;
};
export const renderHorizontalScroll = ({
  title,
  items,
  navigation,
  onPress,
  showButton,
}: ScrollRenderer) => {
  if (items?.length === 0) return <></>;
  return (
    <HorizontalScroll
      title={title}
      data={items}
      ListFooterComponent={() =>
        showButton ? <LoadMoreButton onPress={onPress} /> : <></>
      }
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
