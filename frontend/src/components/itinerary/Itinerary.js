import React, { useState, useEffect } from "react";

import './Itinerary.css'

import { useNavigate } from "react-router-dom";
import {
    Navbar, Form, Button, List, FlexboxGrid, Modal,
    Input, InputGroup, InputNumber, Schema
} from 'rsuite';
import sampleData from '../assets/itinerary.json'

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
const Rule = Schema.Types.StringType().isRequired('This field is required.');

const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px'
};

const slimText = {
    fontSize: '0.666em',
    color: '#97969B',
    fontWeight: 'lighter',
    paddingBottom: 5,
    textAlign: 'left'
};

const titleStyle = {
    paddingBottom: 5,
    whiteSpace: 'nowrap',
    fontWeight: 500
};

const noteStyle = {
    paddingBottom: 5,
    whiteSpace: 'nowrap',
    fontSize: '0.9em',
    fontWeight: 300
};

const dataStyle = {
    fontSize: '1.2em',
    fontWeight: 500
};

const Itinerary = () => {

    const navigate = useNavigate();

    const [itinerary, setItinerary] = useState({
        name: 'Japan Spring 2025',
        country: 'Japan',
        budget: 2000,
    });

    const [open, setOpen] = useState(false);
    const [temp, setTemp] = useState();
    const [data, setData] = useState([{
        name: 'N.A.',
        datetime: '2017.10.13 14:50',
        cost: 0,
        notes: 0,
    }]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        name: 'N.A.',
        datetime: '2017.10.13 14:50',
        cost: 0,
        notes: 0,
    },);

    useEffect(() => {
        console.log(sampleData);
        setData(sampleData.data);
    }, []);
  

    const handleView = (item) => {
        setOpenModal(true);
        setSelectedItem(item);
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{itinerary["name"]}</div>
            </div>
            <div style={{ padding: "10px" }}>

                <Button appearance="default" active onClick={() => { setOpen(true) }}>
                    Edit
                </Button>

                <Button appearance="primary" style={{marginLeft: "10px"}} active onClick={() => { navigate("/"); }}>
                    Back
                </Button>

            </div>
            <div className='details' style={{margin: '10px'}}>
                <div style={{ marginBottom: '15px', marginTop: '15px' }}>Country: {itinerary["country"]}</div>
                <div style={{ marginBottom: '15px' }}>Budget ($): {itinerary["budget"]}</div>
            </div>
            <div className='destinations' style={{margin: '10px'}}>
                <div style={{ marginBottom: '5px' }}>Destinations:</div>
                <Button appearance="primary" block style={{ marginBottom: '20px' }} onClick={() => setOpenCreate(true)}>
                    Add Destination
                </Button>
                <List hover>
                    {data.map((item, index) => (
                        <List.Item key={item['name']} index={index + 1}>
                            <FlexboxGrid>
                                <FlexboxGrid.Item
                                    colspan={6}
                                    style={{
                                        ...styleCenter,
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={titleStyle}>{item['name']}</div>
                                    <div style={slimText}>
                                        <div>{item['datetime']}</div>
                                    </div>
                                </FlexboxGrid.Item>
                                {/*cost data*/}
                                <FlexboxGrid.Item colspan={6} style={styleCenter}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={slimText}>Cost ($)</div>
                                        <div style={dataStyle}>{item['cost'].toLocaleString()}</div>
                                    </div>
                                </FlexboxGrid.Item>
                                {/*notes data*/}
                                <FlexboxGrid.Item colspan={6} style={{
                                    ...styleCenter,
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={slimText}>Notes</div>
                                        <div style={noteStyle}>{item['notes'].toLocaleString()}</div>
                                    </div>
                                </FlexboxGrid.Item>
                                {/*view or edit*/}
                                <FlexboxGrid.Item
                                    colspan={4}
                                >
                                    <a href="#" onClick={() => { handleView(item) }}>View</a>
                                    <span style={{ padding: 5 }}>|</span>
                                    <a href="#" onClick={() => { setOpenEdit(true); setSelectedItem(item); }}>Edit</a>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </List.Item>
                    ))}
                </List>
            </div>
            <Modal open={openModal} onClose={() => { setOpenModal(false) }}>
                <Modal.Header>
                    <Modal.Title>Destination Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form fluid readOnly={'readonly'} formValue={selectedItem}>
                        <Form.Group controlId="name">
                            <Form.ControlLabel>Name:</Form.ControlLabel>
                            <Form.Control name="name" />
                        </Form.Group>
                        <Form.Group controlId="cost">
                            <Form.ControlLabel>Cost ($):</Form.ControlLabel>
                            <Form.Control name="cost" />
                        </Form.Group>

                        <Form.Group controlId="notes">
                            <Form.ControlLabel>Notes</Form.ControlLabel>
                            <Form.Control rows={5} name="notes" accepter={Textarea} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" onClick={() => { setOpenModal(false) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal open={openEdit} onClose={() => { setOpenEdit(false) }} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Edit Destination Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form fluid formDefaultValue={selectedItem}>
                        <Form.Group controlId="name">
                            <Form.ControlLabel>Name:</Form.ControlLabel>
                            <Form.Control name="name" />
                        </Form.Group>
                        <Form.Group controlId="cost">
                            <Form.ControlLabel>Cost ($):</Form.ControlLabel>
                            <Form.Control name="cost" />
                        </Form.Group>

                        <Form.Group controlId="notes">
                            <Form.ControlLabel>Notes</Form.ControlLabel>
                            <Form.Control rows={5} name="notes" accepter={Textarea} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="default" onClick={() => { setOpenEdit(false) }}>
                        Delete
                    </Button>
                    <Button appearance="primary" onClick={() => { setOpenEdit(false) }}>
                        Save Changes
                    </Button>
                    
                </Modal.Footer>
            </Modal>
            <Modal open={openCreate} onClose={() => { setOpenCreate(false) }} >
                <Modal.Header>
                    <Modal.Title>Create New Destination</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form fluid onChange={value => { setTemp(value)}}>
                        <Form.Group controlId="name">
                            <Form.ControlLabel>Name:</Form.ControlLabel>
                            <Form.Control name="name" />
                            <Form.HelpText>Name is required</Form.HelpText>
                        </Form.Group>
                        <Form.Group controlId="cost">
                            <Form.ControlLabel>Cost ($):</Form.ControlLabel>
                            <Form.Control name="cost" />
                        </Form.Group>

                        <Form.Group controlId="notes">
                            <Form.ControlLabel>Notes</Form.ControlLabel>
                            <Form.Control rows={5} name="notes" accepter={Textarea} />
                        </Form.Group>
                        <Button appearance="primary" onClick={() => { setOpenCreate(false); 
                        const newArray = [...data, temp];
                        setData(newArray);
                        }}>
                        Create New
                    </Button>
                    </Form>
                </Modal.Body>
                
            </Modal>
            <Modal open={open} onClose={() => { setOpen(false) }} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Edit Itinerary Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form fluid formDefaultValue={itinerary}>
                        <Form.Group controlId="name">
                            <Form.ControlLabel>Itinerary Name:</Form.ControlLabel>
                            <Form.Control name="name" rule={Rule}/>
                        </Form.Group>
                        <Form.Group controlId="country">
                            <Form.ControlLabel>Country:</Form.ControlLabel>
                            <Form.Control name="country" rule={Rule}/>
                        </Form.Group>

                        <Form.Group controlId="budget">
                            <Form.ControlLabel>Budget ($)</Form.ControlLabel>
                            <Form.Control name="budget" rule={Rule}/>
                        </Form.Group>
                        <Button appearance="primary" onClick={() => { setOpen(false) }} >
                        Save Changes
                    </Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Itinerary;