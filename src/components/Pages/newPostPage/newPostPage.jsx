import { useState } from "react";
import "./newPostPage.scss";
import apiRequest from "../../../utils/apiRequest";
import UploadWidget from "../../uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    street: '',
    address: '',
    rooms: 0,
    ownerId: '',
    bedrooms: 0,
    bathrooms: 0,
    shortAddress: '',
    image: '',
    price: 0,
    rent: 0,
    description: '',
    neighbourhood: '',
    ownerUsername: '',
    images: [],
    location: {
      address: '',
      city: '',
      latitude: '',
      longitude: ''
    },
    facilities: {
      bathrooms: '',
      bedrooms: '',
      ac: false,
      tv: false,
      parking: false,
      kitchen: false,
      heating: false,
      electricity: false,
      wifi: false,
      elevator: false
    },
    category: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setFormData(prevState => ({
        ...prevState,
        [parentKey]: {
          ...prevState[parentKey],
          [childKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await apiRequest.post("/public/home/new", formData);
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <label>
              Street:
              <input type="text" name="street" value={formData.street} onChange={handleChange} />
            </label><br />
            <label>
              Address:
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </label><br />
            <label>
              Rooms:
              <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} />
            </label><br />
            <label>
              Owner ID:
              <input type="text" name="ownerId" value={formData.ownerId} onChange={handleChange} />
            </label><br />
            <label>
              Bedrooms:
              <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
            </label><br />
            <label>
              Bathrooms:
              <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
            </label><br />
            <label>
              Short Address:
              <input type="text" name="shortAddress" value={formData.shortAddress} onChange={handleChange} />
            </label><br />
            <label>
              Image:
              <input type="text" name="image" value={formData.image} onChange={handleChange} />
            </label><br />
            <label>
              Price:
              <input type="number" name="price" value={formData.price} onChange={handleChange} />
            </label><br />
            <label>
              Rent:
              <input type="number" name="rent" value={formData.rent} onChange={handleChange} />
            </label><br />
            <label>
              Description:
              <input type="text" name="description" value={formData.description} onChange={handleChange} />
            </label><br />
            <label>
              Neighbourhood:
              <input type="text" name="neighbourhood" value={formData.neighbourhood} onChange={handleChange} />
            </label><br />
            <label>
              Owner Username:
              <input type="text" name="ownerUsername" value={formData.ownerUsername} onChange={handleChange} />
            </label><br />
            <label>
              Location - Address:
              <input type="text" name="location.address" value={formData.location.address} onChange={handleChange} />
            </label><br />
            <label>
              Location - City:
              <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} />
            </label><br />
            <label>
              Location - Latitude:
              <input type="text" name="location.latitude" value={formData.location.latitude} onChange={handleChange} />
            </label><br />
            <label>
              Location - Longitude:
              <input type="text" name="location.longitude" value={formData.location.longitude} onChange={handleChange} />
            </label><br />
            <label>
              Facilities - Bathrooms:
              <input type="text" name="facilities.bathrooms" value={formData.facilities.bathrooms} onChange={handleChange} />
            </label><br />
            <label>
              Facilities - Bedrooms:
              <input type="text" name="facilities.bedrooms" value={formData.facilities.bedrooms} onChange={handleChange} />
            </label><br />
            <label>
              AC:
              <input type="checkbox" name="facilities.ac" checked={formData.facilities.ac} onChange={handleChange} />
            </label><br />
            <label>
              TV:
              <input type="checkbox" name="facilities.tv" checked={formData.facilities.tv} onChange={handleChange} />
            </label><br />
            <label>
              Parking:
              <input type="checkbox" name="facilities.parking" checked={formData.facilities.parking} onChange={handleChange} />
            </label><br />
            <label>
              Kitchen:
              <input type="checkbox" name="facilities.kitchen" checked={formData.facilities.kitchen} onChange={handleChange} />
            </label><br />
            <label>
              Heating:
              <input type="checkbox" name="facilities.heating" checked={formData.facilities.heating} onChange={handleChange} />
            </label><br />
            <label>
              Electricity:
              <input type="checkbox" name="facilities.electricity" checked={formData.facilities.electricity} onChange={handleChange} />
            </label><br />
            <label>
              WiFi:
              <input type="checkbox" name="facilities.wifi" checked={formData.facilities.wifi} onChange={handleChange} />
            </label><br />
            <label>
              Elevator:
              <input type="checkbox" name="facilities.elevator" checked={formData.facilities.elevator} onChange={handleChange} />
            </label><br />
            <label htmlFor="type">Property Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="APARTMENT">Apartment</option>
              <option value="HOUSE">House</option>
              <option value="CONDO">Condo</option>
              <option value="STAND">Stand</option>
              <option value="SINGLE_FAMILY_HOME">Single Family Home</option>
              <option value="TOWNHOUSE">Stand</option>
              <option value="DUPLEX">Duplex</option>
              <option value="VILLA">Villa</option>
              <option value="COTTAGE">Stand</option>
              <option value="BUNGALOW">Bungalow</option>
              <option value="MANSION">Mansion</option>
              <option value="TINY_HOUSE">Tiny house</option>
            </select><br/>
           
            <button type="submit">Submit</button>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
