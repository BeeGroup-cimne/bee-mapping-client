import {Fragment, useEffect, useState} from "react";
import {message, Select, Table} from "antd";
import OntologyService from "../services/OntologyService";
import store from "../store";
import {setProperties} from "../actions/mapping_actions";

const {Column} = Table;
const MappingDataProperties = () => {
    const ontologyService = new OntologyService();

    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<any>([]);


    const getOntology = () => {
        ontologyService.getProperties("data", {classes: store.getState().mapping.classesSelected.toString()}).then((res) => {
            setOptions(res.data['data'])
        }).catch((err) => {
            message.error(err.toString())
        })
    }

    useEffect(() => {
        getOntology();
    }, [])

    const onChange = (value: string, record: any) => {
        let newDataSource = [...store.getState().mapping.properties];
        newDataSource[record.key].ontology = value
        store.dispatch(setProperties(newDataSource))
    }

    return (
        <Fragment>
            <Table size={"middle"} dataSource={store.getState().mapping.properties}
                   bordered={true}
                   loading={loading}
                   scroll={{x: 1300}}>
                <Column align={"center"} title={"Column"} dataIndex={"columnName"} key={"key"} width={"20%"}/>
                <Column align={"center"} title={"Data Properties"} dataIndex={"ontologyValue"} key={"key"}
                        render={(value, record: any, index) => (
                            <Select
                                mode="multiple"
                                showSearch={true}
                                allowClear={true}
                                defaultValue={store.getState().mapping.properties[record.key].ontology}
                                options={options}
                                style={{width: "80%"}}
                                onChange={(value: string) => onChange(value, record)}
                            >
                            </Select>
                        )}/>
            </Table>
        </Fragment>
    );
}
export default MappingDataProperties;