// src/pages/Course.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Course() {
  const courses = [
    {
      id: 1,
      title: "EcoMind",
      path: "/course/ecomind", // ✅ existing course
      thumbnail: "https://via.placeholder.com/300x200?text=EcoMind",
    },
    {
      id: 2,
      title: "EcoCarbonQuest", // ✅ replaced course name
      path: "/course/ecocarbonquest", // ✅ new path
      thumbnail: "https://via.placeholder.com/300x200?text=EcoCarbonQuest", // ✅ new thumbnail
    },
    {
      id: 3,
      title: "Waste Management",
      path: "/course/waste",
      thumbnail: "https://via.placeholder.com/300x200?text=Waste+Management",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Courses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={course.path}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-700">
                {course.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Click to explore this course →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
