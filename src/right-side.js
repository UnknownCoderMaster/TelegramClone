import React, {useState} from 'react';

function RightSide(props) {

    const [messageText, setMessageText] = useState({});


    function getMessageText(e) {
        setMessageText(e.target.value);
    }

    function addMessage() {
        let d = new Date();
        d = d.getHours() + ":" + d.getMinutes();
        let NewObject = {
            text: messageText,
            messageTime: d
        };
        let newArr = props.MainBox.mainUserBox.map((item, index) => {
            if (index ===  props.MainBox.userIndex) {
                item.messageBox = Array.from(item.messageBox).concat(NewObject);
                console.log( props.MainBox.mainUserBox)
            }
            return item
        });
        props.MainBox.setMainUserBox(newArr);
        setMessageText("");
    }



    return (
        <div className="right-main-box">
            {
                (props.MainBox.mainUserBox.length !== 0) && (props.MainBox.userIndex >= 0) ?
                    <>
                        <div className="header">
                            <div className="photo">
                                {
                                    (props.MainBox.mainUserBox[props.MainBox.userIndex].photo === undefined) ?
                                        <h1 className="text-dark">
                                            {props.MainBox.mainUserBox[props.MainBox.userIndex].userName.slice(0, 1)}
                                        </h1> :
                                        <img src={props.MainBox.mainUserBox[props.MainBox.userIndex].photo} alt=""/>
                                }
                            </div>
                            <div className="names">
                                {props.MainBox.mainUserBox[props.MainBox.userIndex].userName}
                                <div>
                                    last seen {props.MainBox.mainUserBox[props.MainBox.userIndex].time}
                                </div>
                            </div>

                        </div>
                        <div className="body">
                                <div>
                                    {
                                        props.MainBox.mainUserBox[props.MainBox.userIndex].messageBox.map((item,index)=>{
                                            return <div className="MainMassageBox">
                                                <div className="massageBox">
                                                    {item.text}
                                                    <div className="massage-time">{item.messageTime}</div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>



                        </div>
                        <div className="footer">
                            <div className="smile">

                            </div>

                            <input onChange={getMessageText} placeholder="message" type="text"/>

                            <div onClick={addMessage} className="send-btn">
                                <img src="./send-button.png" alt=""/>
                            </div>
                        </div>
                    </> : ""

            }
        </div>
    );
}

export default RightSide;