import "./PhotoThumbnail.css";

function PhotoThumbnail({ photo }) {

    return (

        <div className="thumbnail">

            {

                photo ?

                <img
                    src={photo}
                    alt="Captured"
                />

                :

                null

            }

        </div>

    );

}

export default PhotoThumbnail;