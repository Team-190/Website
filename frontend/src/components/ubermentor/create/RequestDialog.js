import React from "react";
import {Button, Dialog, DialogTitle} from "@material-ui/core";

class RequestDialog extends React.Component {
    render() {
        return (
            <Dialog open={this.props.open}>
                <DialogTitle> {this.props.title} </DialogTitle>
                <Button onClick={this.props.onClose}> OK </Button>
            </Dialog>
        );
    }
}

export default RequestDialog;