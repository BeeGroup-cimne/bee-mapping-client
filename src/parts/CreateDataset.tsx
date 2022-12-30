import {InboxOutlined} from '@ant-design/icons';
import {Button, Col, Divider, Form, Input, message, Row, Upload} from 'antd';
import React from 'react';
import {useForm} from "antd/lib/form/Form";
import ConfigService from "../services/ConfigService";
import AuthService from "../services/AuthService";
import CleaningService from "../services/CleaningService";

const {Dragger} = Upload;


const CreateDataset = (props: any) => {

    const configService = new ConfigService().getConfig()
    const authService = new AuthService()
    const cleaningService = new CleaningService()

    const [createForm] = useForm();


    const onFinish = () => {
        cleaningService.create(createForm.getFieldsValue()).then(() => message.success("The instances has been created successfully.")).catch(err => message.error(err.toString()))
    }

    const onChangeDragger = (info: any) => {
        const {status} = info.file;

        switch (status) {
            case 'uploading':
                console.log(info.file, info.fileList);
                break
            case 'error':
                message.error(`${info.file.name} file upload failed.`, 2);
                break
            case 'done':
                createForm.setFieldsValue({file_id: info.file.response.file_id})
                break
            default:
                break
        }
    }


    return props.isVisible ? <>
        <Form form={createForm} onFinish={onFinish}>
            <Row>
                <Col span={8}>
                    <Form.Item name={"name"} label={"Name"} rules={[{required: true}]}>
                        <Input placeholder={"Dataset Name"}/>
                    </Form.Item>
                </Col>
            </Row>
            <Divider/>
            <Row>
                <Col span={24}>
                    <Form.Item name={"file_id"} label={"Upload File"}>
                        <Dragger
                            maxCount={1}
                            onChange={onChangeDragger}
                            action={configService.api_url + "/files/upload"}
                            headers={{Authorization: "Bearer " + authService.hasCredentials()}}
                            accept={".csv"}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or
                                other
                                band files
                            </p>
                        </Dragger>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        <Button onClick={createForm.submit}>ssss</Button>

    </> : <></>
}
export default CreateDataset;