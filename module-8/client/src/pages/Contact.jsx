import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    timeline: "",
    details: ""
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);
  }

  return (
    <section className="contact-section">
      <div className="contact-container">

        <div className="section-heading">
          <p className="section-eyebrow">
            Get In Touch
          </p>

          <h1>Contact Me</h1>

          <p className="contact-heading-text">
            Cultivating connections: reach out and
            connect with me.
          </p>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="contact-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-row">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
            >
              <option value="">
                Service of Interest
              </option>

              <option value="frontend">
                Frontend Development
              </option>

              <option value="backend">
                Backend Development
              </option>

              <option value="fullstack">
                Full-Stack Development
              </option>

              <option value="design">
                UI/UX Implementation
              </option>
            </select>
          </div>

          <div className="contact-row contact-row-details">
            <input
              type="text"
              name="timeline"
              placeholder="Timeline"
              value={formData.timeline}
              onChange={handleChange}
            />

            <textarea
              name="details"
              placeholder="Project Details..."
              value={formData.details}
              onChange={handleChange}
              rows="6"
            />
          </div>

          <div className="contact-submit-row">
            <button
              type="submit"
              className="contact-submit"
            >
              Send
            </button>
          </div>

          {submitted && (
            <p className="contact-success">
              Thanks! Your form was submitted locally.
            </p>
          )}

        </form>

      </div>
    </section>
  );
}

export default Contact;