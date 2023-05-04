import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
// Create styles
const styles = StyleSheet.create({
  page: { backgroundColor: "red", color: "#000" },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    // width: "100vw", //the pdf viewer will take up all of the width and height
    // height: "100vh",
  },
  head: {
    fontWeight: "extrabold",
    lineHeight: "12vw",
    fontSize: "100vw",
  },
});

// Create Document Component
function BasicDocument({ id }) {
  return (
    <>
      {/* <PDFViewer style={styles.viewer}> */}
      {/* Start of the document*/}
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.head}>Ivan {id}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.head}>Hello</Text>
          </View>
        </Page>
      </Document>
      {/* </PDFViewer> */}
    </>
  );
}
export default BasicDocument;
