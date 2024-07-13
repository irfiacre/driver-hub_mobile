import React, { useState } from "react";
import { View, Button, Modal, StyleSheet } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import Video from "react-native-video";
// import Pdf from "react-native-pdf";

const MediaViewer = () => {
  const [visible, setVisible] = useState(false);
  const [mediaType, setMediaType] = useState<"image" | "video" | "pdf">(
    "image"
  );

  const mediaUrls = {
    image: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/driverhub-01.appspot.com/o/images%2F1782159.jpeg-1720866947456?alt=media&token=84681863-b48b-4a4c-b3c1-5abaf40f31d6",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/driverhub-01.appspot.com/o/images%2F1782159.jpeg-1720866947456?alt=media&token=84681863-b48b-4a4c-b3c1-5abaf40f31d6",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/driverhub-01.appspot.com/o/images%2F1782159.jpeg-1720866947456?alt=media&token=84681863-b48b-4a4c-b3c1-5abaf40f31d6",
      },
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    pdf: "http://www.pdf995.com/samples/pdf.pdf",
  };

  const renderViewer = () => {
    switch (mediaType) {
      case "image":
        return (
          <ImageViewer
            imageUrls={mediaUrls.image}
            onCancel={() => setVisible(false)}
            enableSwipeDown
          />
        );
      case "video":
        return (
          <Video
            source={{ uri: mediaUrls.video }}
            style={styles.video}
            controls={true}
            onEnd={() => setVisible(false)}
          />
        );
      //   case "pdf":
      //     return (
      //       <Pdf
      //         source={{ uri: mediaUrls.pdf }}
      //         style={styles.pdf}
      //         onLoadComplete={() => console.log("PDF loaded")}
      //         onPageChanged={(page, numberOfPages) =>
      //           console.log(`Page ${page} of ${numberOfPages}`)
      //         }
      //         onError={(error) => console.log(error)}
      //         onPressLink={(uri) => console.log(`Link pressed: ${uri}`)}
      //       />
      //     );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="View Images"
        onPress={() => {
          setMediaType("image");
          setVisible(true);
        }}
      />
      <Button
        title="View Video"
        onPress={() => {
          setMediaType("video");
          setVisible(true);
        }}
      />
      <Button
        title="View PDF"
        onPress={() => {
          setMediaType("pdf");
          setVisible(true);
        }}
      />

      <Modal visible={visible} transparent={true}>
        <View style={styles.modalContainer}>{renderViewer()}</View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  pdf: {
    flex: 1,
    width: "100%",
  },
});

export default MediaViewer;
