import React from "react";
import {Document, Page, pdfjs} from "react-pdf";
import {Grid} from "@material-ui/core";
import StudentBackground from "./StudentBackground";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

const styles = {
    document: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }
}

class Requirements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1
        }
        this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    }

    onDocumentLoadSuccess({numPages}) {
        this.setState({numPages: numPages});
    }

    render() {
        return (
            <StudentBackground content={
                <Grid container justify={"center"}>
                    <div style={styles.document}>
                        <Document
                            file={"https://190website-images.s3.amazonaws.com/Travel+Team_Active+Team+Requirements.pdf"}
                            onLoadSuccess={this.onDocumentLoadSuccess} options={options}>
                            {Array.from(
                                new Array(this.state.numPages),
                                (el, index) => (
                                    <Page
                                        width={document.getElementById('root').clientWidth * 98 / 300}
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                    />
                                ),
                            )}
                        </Document>
                    </div>
                </Grid>
            }/>
        );
    }
}

export default Requirements;