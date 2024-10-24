import { useState } from "react";
import cancel from "../image/cancel.svg";
import swipeRight from "../image/swipe_right.svg";
import swipeLeft from "../image/swipe_left.svg";

const ShowDetails = ({elementDetails, setElementDetails}) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const swipe = (dir) => {
        if (dir == 'left'){
            setCurrentImgIndex(currentImgIndex == 0 ? elementDetails[4].length - 1 : currentImgIndex -1)
        }
        else if(dir == 'right'){
            setCurrentImgIndex(currentImgIndex == elementDetails[4].length - 1 ? 0 : currentImgIndex + 1)
        }
    }

    const detailImages = () => {
        if(Array.isArray(elementDetails[4])){
            if(elementDetails[4].length > 1){
                return(
                    <div>
                        <button onClick={() => swipe('left')} className="swipel"><img src={swipeLeft} className="swipeIcon"/></button>
                        <button onClick={() => swipe('right')} className="swiper"><img src={swipeRight} className="swipeIcon"/></button>
                        <img className="thumbnailmulti" src={elementDetails[4][currentImgIndex]}/>
                    </div>
                )
            }
            else if(elementDetails[4].length == 1){
                return(
                    <img className="thumbnail" src={elementDetails[4][0]}/>
                )
            }
        }
        else{
            return(
                <img className="thumbnailColor" src={elementDetails[4]}/>
            )
        }
    }

    const cancelbtn = () => {
        const prevArray = [... elementDetails];
        prevArray[0] = !elementDetails[0];
        setElementDetails(prevArray);
    }

    return ( 
        <div className="linesside">
            {elementDetails[0] && (
                <div className="displaydeatils">
                    <div className="detailBox">
                        <div className="canceldetailbtn"><button onClick={cancelbtn}><img className="cancelicon" src={cancel}/></button></div>
                        <h3>{elementDetails[1]} {elementDetails[2]}</h3>
                        <p dangerouslySetInnerHTML={{ __html: elementDetails[3] }} />
                        {detailImages()}
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default ShowDetails;