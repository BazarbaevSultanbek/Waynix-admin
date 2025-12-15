import { useEffect, useState } from "react";
import axios from "axios";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/hotels");
        setHotels(res.data);
      } catch (err) {
        console.error("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <div>Loading hotels...</div>;

  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    rating: "",
    image: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangeFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const res = await axios.post(
        "http://localhost:8001/api/hotels",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setHotels([...hotels, res.data]);
      setForm({
        name: "",
        description: "",
        location: "",
        price: "",
        rating: "",
        image: null,
        phone: "",
      });
    } catch (err) {
      console.error("Error creating hotel:", err);
    }
  };

  return (
    <div>
      <h1>Hotels</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Hotel Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input type="file" name="image" onChange={handleChangeFile} />

        <button type="submit">Add Hotel</button>
      </form>

      <ul>
        {hotels.map((hotel) => (
          <li key={hotel._id}>
            {hotel.name} - {hotel.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
