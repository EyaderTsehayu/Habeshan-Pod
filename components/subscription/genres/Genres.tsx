import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";

// const TabButton = ({ name, activeTab, onHandleSearchType }) => (
//   <TouchableOpacity
//     style={styles.btn(name, activeTab)}
//     onPress={onHandleSearchType}
//   >
//     <Text style={styles.btnText(name, activeTab)}>{name}</Text>
//   </TouchableOpacity>
// );
const Genres = () => {
  const tabs = ["Sport", "Technology", "Business", "Self Development"];

  return (
    <View>
      <Text>Genres</Text>
    </View>
    // <View style={styles.container}>
    //   <FlatList
    //     data={tabs}
    //     renderItem={({ item }) => (
    //       <TabButton
    //         name={item}
    //         activeTab={activeTab}
    //         onHandleSearchType={() => setActiveTab(item)}
    //       />
    //     )}
    //     horizontal
    //     showsHorizontalScrollIndicator={false}
    //     keyExtractor={(item) => item}
    //     contentContainerStyle={{ columnGap: SIZES.small / 2 }}
    //   />
    // </View>
  );
};

export default Genres;
