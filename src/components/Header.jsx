import React from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import AddIcon from '@mui/icons-material/Add';
import './Header.css'

function Header(props) {
    return (
        <div>
            <div className="header-container">
                <h1><ion-icon name="layers-sharp" size="small"></ion-icon>Contact Keeper</h1>
                <Input onChange={(event) => {props.search(event.target.value)}} value={props.searchText} variant="soft" size="sm" startDecorator={<ion-icon name="search-sharp"></ion-icon>} placeholder="Search..." sx={{height: "30px", width: "250px", fontSize: "14px"}}/>
                <Button onClick={props.click} startDecorator={<AddIcon fontSize='small'/>} size="md">Add</Button>
            </div>
        </div>
    )
}

export default Header;