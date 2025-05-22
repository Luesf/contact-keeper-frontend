import { useState, useEffect} from 'react'
import axios from 'axios';
import Header from './components/Header'
import './App.css'
import Contacts from './components/Contacts'
import ModalForm from './components/ModalForm'

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchText, setSearchText] = useState("");
  const [contactData, setContactData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
        const response = await axios.get("https://contactkeeperbackend-env.eba-3tmpzsnk.us-east-2.elasticbeanstalk.com/api/contacts")
        setTableData(response.data)
    } catch (err) {
        err.message;
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleOpen(mode, contact) {
    setContactData(contact)
    setModalOpen(true);
    setModalMode(mode);
  }

  const handleSubmit = async (newContactData) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post("https://contactkeeperbackend-env.eba-3tmpzsnk.us-east-2.elasticbeanstalk.com/api/contacts", newContactData);
        setTableData((prevData) => [...prevData, response.data]);
        console.log("Contact added.", response.data);
      } catch (error) {
        console.log("Error adding contact.", error);
      }
    } else {
      try {
        const response = await axios.put(`https://contactkeeperbackend-env.eba-3tmpzsnk.us-east-2.elasticbeanstalk.com/api/contacts/${contactData.id}`, newContactData);
        setTableData((prevData) => prevData.map((contact) => (contact.id === contactData.id ? response.data : contact)));
        console.log("Contact updated: ", response.data);
      } catch (error) {
        console.error("Error updating contact:", error)
      }
    }
  }

  return (
    <div>
      <Header click={() => handleOpen("add")} search={setSearchText} searchText={searchText}/>
      <Contacts click={handleOpen} searchText={searchText} tableData={tableData} setTableData={setTableData} />
      <ModalForm open={modalOpen} close={() => setModalOpen(false)} submit={handleSubmit} mode={modalMode} contactData={contactData} />
    </div>
  )
}

export default App
