import React, {ChangeEvent, Component, KeyboardEvent, ReactElement} from "react";
import {ThemeMarkEditorProps} from "../interfaces";
import GlobalContext from "./GlobalContext";

interface ThemeMarkEditorState {
    localThemeMark: number
}

class ThemeMarkEditor extends Component<ThemeMarkEditorProps, ThemeMarkEditorState> {
    static contextType = GlobalContext;

    state = {
        localThemeMark: this.props.mark
    };

    handleThemeMarkChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const input = +event.target.value;
        if (!Number.isNaN(input) && input <= 12) {
            this.setState({
                localThemeMark: input
            });
        }
    };

    // static getDerivedStateFromProps(props: ThemeMarkEditorProps, prevState: ThemeMarkEditorState): ThemeMarkEditorState | null {
    //     if (props.mark === prevState.localThemeMark) {
    //         return null;
    //     }
    //
    //     return {
    //         localThemeMark: props.mark
    //     }
    // }

    editTestMarkWrapper = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key !== 'Enter') {
            return;
        }

        this.context.editThematicMark(this.props.id, this.props.title, this.state.localThemeMark)
            .then((mark: number) => this.setState({
                localThemeMark: mark
            }))
            .catch(this.resetLocalThemeMark);
    };

    resetLocalThemeMark = (): void => {
        this.setState({
            localThemeMark: this.props.mark || 0
        });
    };

    render(): ReactElement {
        return (
            <>
                <input
                    value={this.state.localThemeMark || ''}
                    type="text"
                    className="admin-marks theme"
                    onChange={this.handleThemeMarkChange}
                    onBlur={this.resetLocalThemeMark}
                    onKeyDown={this.editTestMarkWrapper}
                />
                {this.props.isRedacted &&
                    <span className="thematic-mark">(р.)</span>
                }
            </>
        );
    }
}

export default ThemeMarkEditor;