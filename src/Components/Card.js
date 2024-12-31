import React, { useState } from "react";
import Modal from "./Modal";

const Card = ({ book }) => {
    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState(null);

    console.log("Book data received:", book);

    return (
        <>
            <div className="card-container">
                {book.length > 0 ? (
                    book.map((item) => {
                        let thumbnail = item.volumeInfo.imageLinks?.smallThumbnail;
                        let amount = item.saleInfo.listPrice?.amount;
                        
                        if (thumbnail && amount) {
                            return (
                                <div
                                    key={item.id}
                                    className="card"
                                    onClick={() => {
                                        console.log("Card clicked:", item);
                                        setShow(true);
                                        setItem(item);
                                    }}
                                >
                                    <img src={thumbnail} alt={item.volumeInfo.title || "No Title"} />
                                    <div className="bottom">
                                        <h3 className="title">{item.volumeInfo.title || "No Title"}</h3>
                                        <p className="amount">&#8377;{amount}</p>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })
                ) : (
                    <p>No books available</p>
                )}
            </div>
            {show && <Modal show={show} item={bookItem} onClose={() => setShow(false)} />}
        </>
    );
};


export default Card;
