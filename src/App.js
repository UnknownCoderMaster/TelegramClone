import React, {useState} from 'react';
import LeftSide from "./left-side";
import RightSide from "./right-side";

function App(props) {
    const [mainUserBox, setMainUserBox] = useState([]);
    const [userIndex, setUserIndex] = useState();
    
    return (
        <>
            <div className="main-box">
                <div className="left-side">
                    <LeftSide MainBox={{
                        mainUserBox,
                        setMainUserBox,
                        setUserIndex,
                        userIndex

                    }}/>
                </div>
                <div className="right-side">
                    <RightSide MainBox={{
                        mainUserBox,
                        setMainUserBox,
                        userIndex

                    }}/>
                </div>
            </div>
        </>
    );
}

export default App;