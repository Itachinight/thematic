import React, {Component, ReactElement} from "react";
import Select, {StylesConfig} from "react-select";
import {SelectControlsProps, User} from "../interfaces";
import globalContext from "./GlobalContext";

class SelectControls extends Component<SelectControlsProps, any> {
    static contextType = globalContext;

    private static readonly defaultStyles: StylesConfig = {
        container: (prev) => ({...prev, width: 275}),
        control: (prev) => ({...prev, cursor: 'pointer'}),
        loadingIndicator: (prev) => ({...prev, position: 'absolute', left: 200, top: 10}),
        loadingMessage: (prev) => ({...prev, opacity: 0.5}),
        option: (prev) => ({...prev, cursor: 'pointer'}),
        valueContainer: (prev) => ({...prev, justifyContent: 'center'})
    };

    render(): ReactElement {
        return (
            <div className="select-container" style={{flexDirection: 'column'}}>
                {this.props.level !== 1 &&
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                    {this.props.classes.length &&
                    <Select
                        options={this.props.classes}
                        value={this.props.selectedClass}
                        onChange={this.props.handleClassChange}
                        isSearchable={false}
                        isClearable={false}
                        classNamePrefix={'react-select'}
                        styles={{
                            container: (prev) => ({...prev, width: 200}),
                            control: (prev) => ({...prev, cursor: 'pointer'}),
                            option: (prev) => ({...prev, cursor: 'pointer'}),
                            valueContainer: (prev) => ({...prev, justifyContent: 'center'})
                        }}
                    />
                    }
                    {this.props.users.length &&
                    <Select
                        options={this.props.users}
                        value={this.props.selectedUser}
                        onChange={this.props.handleUserChange}
                        isSearchable={true}
                        isClearable={false}
                        classNamePrefix={'react-select'}
                        getOptionLabel={({name, id}) => id === 0 ? '' : `#${id} ${name}`}
                        getOptionValue={(option: User) => `${option.id}`}
                        loadingMessage={() => this.context.loading}
                        filterOption={({data}, input: string) => {
                            if (input.length < 2) {
                                return true;
                            }

                            const search = input.trim().toLowerCase().replace('ё', 'е');

                            return data.name.toLowerCase().replace('ё', 'е').includes(search) ||
                                // eslint-disable-next-line eqeqeq
                                data.id == search ||
                                data.email.toLowerCase().includes(search) ||
                                data.login.toLowerCase().includes(search);
                        }
                        }
                        styles={{
                            container: (prev) => ({...prev, width: 325}),
                            control: (prev) => ({...prev, cursor: 'pointer'}),
                            option: (prev, {data}) => ({
                                ...prev,
                                cursor: 'pointer',
                                textDecoration: data.isLocked ? 'line-through' : 'none'
                            }),
                            valueContainer: (prev) => ({...prev, justifyContent: 'center', cursor: 'text'})
                        }}
                    />
                    }
                </div>
                }
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Select
                        options={this.props.subjects}
                        value={this.props.selectedSubject}
                        onChange={this.props.handleSubjectChange}
                        isLoading={!this.props.isLoaded}
                        isSearchable={false}
                        isClearable={false}
                        classNamePrefix={'react-select'}
                        getOptionLabel={({name}) => name}
                        getOptionValue={({id}) => `${id}`}
                        loadingMessage={() => this.context.loading}
                        styles={SelectControls.defaultStyles}
                    />
                    {this.props.archives.length > 1 &&
                    <Select
                        options={this.props.archives}
                        value={this.props.selectedArchive}
                        onChange={this.props.handleArchiveChange}
                        isLoading={!this.props.isLoaded}
                        isSearchable={false}
                        isClearable={false}
                        classNamePrefix={'react-select'}
                        loadingMessage={() => this.context.loading}
                        styles={SelectControls.defaultStyles}
                    />
                    }
                </div>
            </div>
        );
    }
}

export default SelectControls;