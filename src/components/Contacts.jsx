import React, { useState } from "react";
import axios from 'axios';
import Table from '@mui/joy/Table';
import Button from '@mui/joy/Button';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import "./Contacts.css"

function Contacts(props) {
    const [error, setError] = useState(null);

    const filteredData = props.tableData.filter(contact =>
        contact.name.toLowerCase().includes(props.searchText.toLowerCase()) ||
        contact.role.toLowerCase().includes(props.searchText.toLowerCase()) ||
        contact.email.toLowerCase().includes(props.searchText.toLowerCase()) ||
        contact.location.toLowerCase().includes(props.searchText.toLowerCase())
    );

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if (confirmDelete) {
          try {
            await axios.delete(`https://contactkeeperbackend-env.eba-3tmpzsnk.us-east-2.elasticbeanstalk.com/api/contacts/${id}`);
            props.setTableData((prevData) => prevData.filter(contact => contact.id !== id));
          } catch (err) {
            setError(err.message);
          }
        }
      }

    return (
        <div>
            <div className="contacts-container">
                <Table noWrap>
                    <thead>
                        <tr>
                            <th style={{width: "3%"}}>ID</th>
                            <th style={{width: "27%"}}>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th style={{width: "15%"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((contact) => {
                            return (
                                <tr className="row" key={contact.id}>
                                    <td>{contact.id}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.role}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.location}</td>
                                    <td className="row-buttons">
                                        <Button size="sm" startDecorator={<EditRoundedIcon fontSize="small" />} onClick={() => {props.click("edit", contact)}}></Button>
                                        <Button color="danger" size="sm" startDecorator={<DeleteRoundedIcon fontSize="small" />} onClick={()=> handleDelete(contact.id)}></Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Contacts;