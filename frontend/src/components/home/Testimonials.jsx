import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../axios/axios";

function Testimonials() {
  const [testimonial, setTestimonial] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [review, setReview] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get("/testimonial/getall");
        setTestimonial(response.data.data || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/testimonial/add",
        { fullName, email, country, state, review },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Feedback submitted successfully");
      setFullName("");
      setEmail("");
      setCountry("");
      setState("");
      setReview("");
      setShowForm(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit feedback");
    }
  };

  const featuredReview = testimonial[0]?.review || "Loved the experience at MediHub, best healthcare system that makes life easier.";
  const featuredName = testimonial[0]?.fullName || "MediHub User";

  return (
    <main className="w-full">
      <section className="my-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-3 md:px-6 lg:px-8 gap-10">
        <div className="space-y-4">
          <h3 className="text-md text-dark_theme font-medium">Testimonial</h3>
          <h1 className="text-3xl lg:text-5xl text-dark_theme font-bold">What They Say?</h1>
          <p className="text-md text-text_grey">
            MediHub has got more than <span className="text-dark_theme font-medium">10k positive ratings</span> from our users around the world.
          </p>
          <p className="text-md text-text_grey">Some doctors and patients were greatly helped by Medi-Hub.</p>
          <p className="text-md text-text_grey">Are you too? Please give your feedback.</p>

          <button
            onClick={() => setShowForm(true)}
            className="border border-dark_theme hover:bg-light_theme text-dark_theme py-2 px-5 rounded-full"
          >
            Send Your Feedback &#8594;
          </button>
        </div>

        <div className="bg-testimonial_img_bg rounded-xl p-4 md:p-6 shadow-md space-y-4">
          <div className="h-64 rounded-lg overflow-hidden bg-white/30">
            <img
              src="/contrimage.png"
              alt="testimonial"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/medicine.jpg";
              }}
            />
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-text_grey line-clamp-3">{featuredReview}</p>
            <p className="mt-3 text-dark_theme font-semibold">{featuredName}</p>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-md w-full max-w-md mx-auto">
              <form onSubmit={handleFeedback} className="flex flex-col items-center space-y-4">
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your Full Name" className="p-2 border border-gray-300 rounded w-full" />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email Address" className="p-2 border border-gray-300 rounded w-full" />
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="p-2 border border-gray-300 rounded w-full" />
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className="p-2 border border-gray-300 rounded w-full" />
                <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Your Review" className="p-2 border border-gray-300 rounded w-full"></textarea>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Testimonials;
