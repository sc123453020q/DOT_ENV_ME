// src/pages/Contact.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";
import contact_bg from "../assets/contact_bg.jpg";


export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_jodkz7b",   // replace with EmailJS Service ID
        "template_p4xu2cl",  // replace with EmailJS Template ID
        formData,
        "yzv-K37MYyaDSQcqQ"  // replace with EmailJS Public Key
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("❌ Failed to send message. Try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-[#f9fbff] px-6 md:px-20 py-10">
      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full md:w-[380px]"
      >
        <h2 className="text-2xl font-semibold text-[#1a2b5c] mb-6">Contact us</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full p-3 mb-4 rounded-lg bg-[#f1f5ff] focus:outline-none"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-3 mb-4 rounded-lg bg-[#f1f5ff] focus:outline-none"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          required
          className="w-full p-3 mb-4 rounded-lg bg-[#f1f5ff] focus:outline-none resize-none h-28"
        ></textarea>

        <button
          type="submit"
          className="w-full p-3 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 text-white font-medium hover:opacity-90 transition"
        >
          Send Message
        </button>

        {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
      </form>

      {/* Illustration */}
      <div className="mt-10 md:mt-0 flex justify-center w-full md:w-1/2">
        <img
          src={contact_bg}
          alt="Illustration"
          className="max-w-[2000px] w-full"
        />
      </div>
    </div>
  );
}
