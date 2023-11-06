import React, { useEffect, useRef, useState } from "react";
import NavBar from "../admin-components/NavBar";
import AdminHeader from "../admin-components/AdminHeader";
import "../styles/admin-styles/adminEnquire.css";
import { fetchAPI, fetchGetAPI } from "../components/UserFunctions";
import { API_ADMIN_getEnquiryDetails, API_ADMIN_replyToEnquiry } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import { set } from "date-fns";

export default function AdminEnquire() {
  const data = {
    title: "Enquiries From Customer",
    sub_title: "Any Questions?? Glad to hear you! ",
    image: "admin_enquire_header.jpg",
  };
  const [dataFetch, setDataFetch] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([
    {
      sender: "admin",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, voluptatum repellat nemo, perspiciatis aut dicta, harum explicabo necessitatibus aperiam id iusto in! Accusantium minus quae sunt assumenda eius ad placeat.",
    },
    {
      sender: "user",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, voluptatum repellat nemo, perspiciatis aut dicta, harum explicabo necessitatibus aperiam id iusto in! Accusantium minus quae sunt assumenda eius ad placeat.",
    },
    {
      sender: "user",
      text: "Hey Sanket",
    },
  ]);
  const [sendMessage, setSendMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function getEnquiryDetails() {
    setLoading(true);
    const respones = await fetchGetAPI(API_ADMIN_getEnquiryDetails);
    const json = await respones.json();
    setLoading(false);
    // console.log(json);
    setContacts(json.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    }));
  }
  async function replyToEnquiry() {
    setLoading(true);
    selectedContact.answer = sendMessage;
    console.log(sendMessage);
    const respones = await fetchAPI(
      selectedContact,
      API_ADMIN_replyToEnquiry,
      "POST"
    );
    const json = await respones.json();
    console.log(json);
    getEnquiryDetails();
    setSendMessage("");
    setLoading(false);
  }
  function handleSendEmailClick() {
    console.log("Send Email : ", sendMessage, selectedContact);
    replyToEnquiry();
  }
  const handleContactClick = (contact) => {
    console.log(contact);
    setSelectedContact(contact);
    setSendMessage("");
    // Load chat history for the selected contact from your data source
    // For example: fetchChatHistory(contact.id).then(data => setMessages(data));
  };
  useEffect(() => {
    getEnquiryDetails();
  }, []);
  useEffect(() => {
    selectedContact &&
      setSelectedContact(
        contacts.find((contact) => contact._id === selectedContact._id)
      );
  }, contacts);
  return (
    <>
      <NavBar></NavBar>
      {loading && <LoadingSpinner></LoadingSpinner>}
      <AdminHeader data={data}></AdminHeader>
      <div className="chat-app">
        <div className="chat-app-container">
          <div className="contact-list">
            <div className="contact-list-title">
              <h1 className="title">Customer</h1>
            </div>

            <div className="contact-list-view">
              {contacts.length > 0 &&
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`contact ${
                      selectedContact === contact ? "active" : ""
                    }`}
                    onClick={() => handleContactClick(contact)}
                  >
                    <div className="contact-card">
                      <div className="main-info">
                        <p className="name">
                          {contact.firstName + " " + contact.lastName}
                        </p>
                        <p className="date">
                          {new Date(contact.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="sub-info">
                        <p
                          className={`${
                            contact.status === "New Enquiry"
                              ? "sub-message color-green"
                              : "sub-message"
                          }`}
                        >
                          {contact.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {selectedContact ? (
            <div className="chat-box-view">
              <div className="chat-box-title">
                <h3 className="title">
                  {selectedContact.firstName + " " + selectedContact.lastName}
                </h3>
                <p className="sub-title">{selectedContact.email}</p>
              </div>

              <div className="chat-messages">
                {selectedContact.chat.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${
                      message.sender === "user"
                        ? "user-message"
                        : "contact-message"
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              <input
                className="message-input"
                value={sendMessage}
                placeholder="Type your message..."
                onChange={(e) => {
                  setSendMessage(e.target.value);
                }}
              />
              <button className="send-button" onClick={handleSendEmailClick}>
                Send Email
              </button>
            </div>
          ) : (
            <div className="select-chat">
              <h3> Select Chat...</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
