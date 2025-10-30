import React, { useEffect, useState } from "react";
import {
  fetchSubjects,
  addSubject,
  uploadNotes,
  deleteSubject,
} from "../services/supabaseService";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { supabase } from "../supabaseClient";

function SubjectsGrid() {
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    branch: "",
    year: "",
    files: [],
  });

  useEffect(() => {
    const loadSubjects = async () => {
      const data = await fetchSubjects();
      setSubjects(data);
    };
    loadSubjects();
  }, []);

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Add new subject
      const subject = await addSubject({
        title: formData.title,
        branch: formData.branch,
        year: parseInt(formData.year),
        created_by: null, // Replace with user ID if available
      });

      if (!subject) return;

      // 2️⃣ Upload each file
      const notesToUpload = [];

      for (const file of formData.files) {
        const { data, error } = await supabase.storage
          .from("notes")
          .upload(`subject-${subject.id}/${file.name}`, file);

        if (error) {
          console.error("File upload error:", error.message);
          continue;
        }

        const fileUrl = supabase.storage
          .from("notes")
          .getPublicUrl(`subject-${subject.id}/${file.name}`).data.publicUrl;

        notesToUpload.push({
          subject_id: subject.id,
          title: file.name,
          file_url: fileUrl,
          uploaded_by: null, // Replace with user ID if available
          uploaded_at: new Date().toISOString(),
        });
      }

      // 3️⃣ Save uploaded notes metadata
      await uploadNotes(notesToUpload);

      // 4️⃣ Reset modal and reload subjects
      setShowModal(false);
      setFormData({ title: "", branch: "", year: "", files: [] });
      const updatedSubjects = await fetchSubjects();
      setSubjects(updatedSubjects);
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  const handleDelete = async (subjectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject and all its notes?"
    );
    if (!confirmDelete) return;

    const success = await deleteSubject(subjectId);
    if (success) {
      alert("✅ Subject deleted successfully!");
      const updatedSubjects = await fetchSubjects();
      setSubjects(updatedSubjects);
    } else {
      alert("❌ Failed to delete subject.");
    }
  };

  return (
    <Container className="mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: "#4F46E5" }}>
          📘 Subjects
        </h2>
        <Button
          style={{ backgroundColor: "#4F46E5", color: "white" }}
          onClick={() => setShowModal(true)}
        >
          Add
        </Button>
      </div>

      {/* Subject Cards */}
      <Row className="g-4">
        {subjects.map((subject) => (
          <Col md={4} key={subject.id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{subject.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {subject.branch} – {subject.year} Year
                </Card.Subtitle>
                <div className="d-flex justify-content-between">
                  <a
                    style={{ color: "#4F46E5", borderColor: "#4F46E5" }}
                    href={`/subject/${subject.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    View Notes
                  </a>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(subject.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for adding new subject */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subject & Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Subject Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Branch</Form.Label>
              <Form.Select
                value={formData.branch}
                onChange={(e) =>
                  setFormData({ ...formData, branch: e.target.value })
                }
                required
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Select
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                required
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload PDFs</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default SubjectsGrid;
