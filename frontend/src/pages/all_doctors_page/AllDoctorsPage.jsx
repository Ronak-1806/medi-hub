import React, { useState, useEffect } from "react";
import { DoctorsCard } from "../../import-export/ImportExport";
import api from "../../axios/axios";

function AllDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const fallbackDoctors = [
    {
      _id: "1",
      firstName: "Harish",
      lastName: "Shukla",
      docAvatar: "/new_hero.png",
      department: { name: "Cardiology" },
      experience: "8+ Years",
      qualifications: ["MBBS", "MD"],
      appointmentCharges: 499,
      languagesKnown: ["English", "Hindi"],
    },
    {
      _id: "2",
      firstName: "Pooja",
      lastName: "Sharma",
      docAvatar: "/studentsImage.png",
      department: { name: "Dermatology" },
      experience: "6+ Years",
      qualifications: ["MBBS", "DDVL"],
      appointmentCharges: 399,
      languagesKnown: ["English", "Hindi"],
    },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/user/alldoctors");
        console.log(response.data.data);
        setDoctors(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="w-full">
      <section className="my-20 h-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-center justify-between px-3 md:px-6 lg:px-6 py-2">
        {/* Search doctors component */}
        {/* code here */}

        {/* Doctors components */}
        {(doctors.length ? doctors : fallbackDoctors).map((doctor) => (
          <DoctorsCard key={doctor._id} doctor={doctor} />
        ))}
      </section>
    </div>
  );
}

export default AllDoctorsPage;
