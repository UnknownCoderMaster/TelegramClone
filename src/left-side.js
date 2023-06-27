import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {getElement} from "bootstrap/js/src/util";
import RightSide from "./right-side";

function LeftSide(props) {

    const [boxUser, setBoxUser] = useState([]);
    const [userName, setUserName] = useState("");
    const [telNumber, setTelNumber] = useState();
    const [photo, setPhoto] = useState();
    const [deleteIcon, setDeleteIcon] = useState(false);


    function getInputUserName(e) {
        setUserName(e.target.value);

    }

    function getInputUserNumber(e) {
        setTelNumber(e.target.value);

    }


    function getIndex(ind) {
        props.MainBox.setUserIndex(ind);
    }


    function addUser() {
        if (userName.length > 0 && telNumber.length > 0) {
            let d = new Date();
            d = d.getHours() + ":" + d.getMinutes();
            let userBox = {
                id: Date.now(),
                time: d,
                userName,
                telNumber,
                photo,
                deleteIcon,
                messageBox:[]
            };
            let NewArr = boxUser.concat(userBox);
            setBoxUser(NewArr);
            setUserName("");
            setPhoto(undefined);
            setTelNumber(null);
            handleClose();
        }
    }

    const getInputUserPhoto = (event) => {
        const {target: {files}} = event;
        const file = files[0];

        function getBase64(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setPhoto(reader.result);
            };
            reader.onerror = function () {
                setPhoto(null);
            };
        }

        getBase64(file); // prints the base64 string
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function showDeleteIcon(ind) {
        // boxUser.map((item,index)=>{
        //     if(index === ind){
        //         item.deleteIcon=!item.deleteIcon
        //     }
        // });
        boxUser[ind].deleteIcon = !boxUser[ind].deleteIcon;
        let newArr = [...boxUser];
        setBoxUser(newArr);
        console.log(boxUser[ind]);
    }

    function deletePerson(index) {
        boxUser.splice(index, 1);
        let newArr = [...boxUser];
        setBoxUser(newArr);
    }


    props.MainBox.setMainUserBox(boxUser);


    return (
        <>
            <div className="left-main-box">
                <div className="top-side">
                    <input placeholder="Search" type="text"/>

                    <div onClick={handleShow} className="add-btn">
                        <img src="./add-user.png" alt=""/>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Enter User Profile </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input id="nameId" onChange={getInputUserName} className="form-control" placeholder="Name"
                                   type="text"/>
                            <input onChange={getInputUserNumber} className="form-control mt-3" placeholder="Number"
                                   type="text"/>

                            <label className="mt-3" htmlFor="photo">User photo</label>
                            <input onChange={getInputUserPhoto} id="photo" className="form-control "
                                   placeholder="user photo" type="file"/>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={() => {
                                addUser();
                            }} className="btn btn-dark">Add user
                            </button>
                        </Modal.Footer>
                    </Modal>

                </div>
                <div className="bottom-side">
                    {
                        boxUser.map((item, index) => {
                            return <div onDoubleClick={() => showDeleteIcon(index)} onClick={() => getIndex(index)}
                                        className="user-profile">
                                <div className="photo">
                                    <img src={item.photo} alt=""/>
                                </div>
                                <div className="name">
                                    <div>{item.userName}</div>
                                    <div>{item.telNumber}</div>
                                </div>
                                <div onClick={() => deletePerson(index)}
                                     className={item.deleteIcon ? "delete-icon" : "delete-icon2"}>
                                    <img src="./delete.png" alt=""/>
                                </div>
                            </div>
                        })
                    }
                        {/*<button onClick={addMessage}>ADD</button>*/}
                </div>
            </div>

        </>
    );
}

export default LeftSide;