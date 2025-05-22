import React, { useEffect, useState } from "react";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog'
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import './ModalForm.css';

function ModalForm(props) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        props.close();
        try {
            const contactData = {name, role, email, location};
            await props.submit(contactData);
        } catch (err) {

        }
    };

    useEffect(() => {
        if (props.mode === "edit" && props.contactData) {
            setName(props.contactData.name);
            setRole(props.contactData.role);
            setEmail(props.contactData.email);
            setLocation(props.contactData.location);
        } else {
            setName("");
            setRole("");
            setEmail("");
            setLocation("");
        }
    }, [props.mode, props.contactData]);

    return (
        <Modal open={props.open} onClose={props.close}>
            <ModalDialog sx={{width:400}}>
                <form onSubmit={handleSubmit}>
                    <ModalClose />
                    <Typography sx={{marginBottom:2, fontSize: "20px"}}>{(props.mode === "edit") ? "Editing contact: " : "Add a new contact:"}</Typography>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input size="sm" placeholder="Type name here..." sx={{marginBottom:1}} onChange={(event) => setName(event.target.value)} value={name}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Input size="sm" placeholder="Type role here..." sx={{marginBottom:1}} onChange={(event) => setRole(event.target.value)} value={role}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input size="sm" placeholder="Type email here..." sx={{marginBottom:1}} onChange={(event) => setEmail(event.target.value)} value={email}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Location</FormLabel>
                        <Input size="sm" placeholder="Type location here..." sx={{marginBottom:3}} onChange={(event) => setLocation(event.target.value)} value={location}/>
                    </FormControl>
                    <Button type="submit" sx={{width: "75px", alignSelf: "center"}}>Submit</Button>
                </form>
            </ModalDialog>
        </Modal>
    )
}

export default ModalForm;