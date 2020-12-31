import React from "react";

class TabPanel extends React.Component {
    render() {
        return (
            <div
                role="tabpanel"
                hidden={this.props.value !== this.props.index}
                id={`simple-tabpanel-${this.props.index}`}
                aria-labelledby={`simple-tab-${this.props.index}`}
            >
                {this.props.value === this.props.index && (
                    this.props.content
                )}
            </div>
        )
    }
}

export default TabPanel;