import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { AppContext } from "@/context";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "@/services/firebase/storage";
import { CHAT_COLLECTION } from "@/constants/collectionNames";
import { GiftedChat } from "react-native-gifted-chat";
import { PLACEHOLDER_IMG } from "@/constants/fixtures";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const message = () => {
  const { id } = useLocalSearchParams<any>();
  const collectionRef = collection(database, CHAT_COLLECTION);
  const [messages, setMessages] = useState<any>([]);
  const [receiver, setReceiver] = useState<any>([]);
  const [sender, setSender] = useState<any>([]);
  const { contextState, _ } = useContext<any>(AppContext);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    // navigation.setOptions({
    //   headerRight: () => (
    //     <TouchableOpacity>
    //       <Ionicons name="chevron-back" size={24} color="white" />
    //     </TouchableOpacity>
    //   ),
    // });
    const receiverData = contextState.staffUsers.find(
      (staff: any) => staff.userId === id
    );
    if (receiverData) {
      setReceiver(receiverData);
      setSender(contextState.user);
    }
  }, []);

  useLayoutEffect(() => {
    const messageQuery = query(collectionRef, orderBy("createdAt", "desc"));
    const receiver = contextState.staffUsers.find(
      (staff: any) => staff.userId === id
    );
    const sender = contextState.user;
    const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
      setMessages(
        snapshot.docs
          .filter((doc) => {
            const docData = doc.data();
            return (
              docData.senderId === sender.userId &&
              docData.receiverId === receiver.userId
            );
          })
          .map((doc) => ({
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          }))
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messagesArr: any = []) => {
    const receiverData = contextState.staffUsers.find(
      (staff: any) => staff.userId === id
    );
    setMessages((prevMessages: any) =>
      GiftedChat.append(prevMessages, messagesArr)
    );
    const { _id, createdAt, user, text } = messagesArr[0];
    if (contextState.user.userId && receiverData.userId) {
      addDoc(collectionRef, {
        _id,
        createdAt,
        text,
        user,
        senderId: contextState.user.userId,
        receiverId: receiverData.userId,
      });
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{ ...sender, avatar: PLACEHOLDER_IMG }}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
    />
  );
};

export default message;
