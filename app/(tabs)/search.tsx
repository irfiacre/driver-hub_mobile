import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components/StyledComponents";
import BaseInput from "@/components/BaseInput";
import { AntDesign } from "@expo/vector-icons";
import {
  findDocEntryByField,
  searchDocument,
} from "@/services/firebase/helpers";
import { COURSES_COLLECTION } from "@/constants/collectionNames";
import Spinner from "react-native-loading-spinner-overlay";

const search = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Array<any>>([]);

  const handleSearch = async () => {
    setLoading(true);

    const result = await searchDocument(
      COURSES_COLLECTION,
      "title",
      searchText
    );
    console.log("-----------", result);

    setLoading(false);
  };

  return (
    <StyledView className="bg-white h-full px-7 py-10">
      <Spinner visible={loading} />
      <StyledView className="flex flex-row items-end justify-between">
        <StyledView className="w-10/12">
          <BaseInput
            label=""
            value={searchText}
            onChangeText={(_, value: string) => setSearchText(value)}
            identifier="searchText"
            placeholder="Search For Courses"
          />
        </StyledView>

        <StyledTouchableOpacity
          className="mx-2 p-4 bg-primary rounded-full text-center"
          onPress={handleSearch}
        >
          <AntDesign name="search1" size={24} color="white" />
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default search;
