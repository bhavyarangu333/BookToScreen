const Modal = ({ show, item, onClose }) => {
    if (!show) {
        return null;
    }

    const thumbnail = item.volumeInfo?.imageLinks?.smallThumbnail || "placeholder-image-url";
    const title = item.volumeInfo?.title || "No Title Available";
    const authors = item.volumeInfo?.authors?.join(", ") || "Unknown Author";
    const publisher = item.volumeInfo?.publisher || "Unknown Publisher";
    const publishedDate = item.volumeInfo?.publishedDate || "N/A";
    const previewLink = item.volumeInfo?.previewLink || "#";
    const description = item.volumeInfo?.description || "No Description Available";

    return (
        <>
            <div 
                className="overlay" 
                role="dialog" 
                aria-hidden={!show} 
                onClick={onClose} // Close modal on overlay click
            >
                <div 
                    className="overlay-inner" 
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                >
                    <button 
                        className="close" 
                        onClick={onClose} 
                        aria-label="Close Modal"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                    <div className="inner-box">
                        <img 
                            src={thumbnail} 
                            alt={title} 
                            onError={(e) => (e.target.src = "placeholder-image-url")} 
                        />
                        <div className="info">
                            <h1>{title}</h1>
                            <h3>{authors}</h3>
                            <h4>
                                {publisher} <span>{publishedDate}</span>
                            </h4>
                            <br />
                            <a 
                                href={previewLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <button>More</button>
                            </a>
                        </div>
                    </div>
                    <h4 className="description">{description}</h4>
                </div>
            </div>
        </>
    );
};

export default Modal;
