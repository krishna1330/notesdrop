import React, { useEffect, useState } from 'react';
import { fetchSubjects } from '../services/supabaseService'; // adjust path as needed
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SubjectsGrid() {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const loadSubjects = async () => {
            const data = await fetchSubjects();
            setSubjects(data);
        };
        loadSubjects();
    }, []);

    return (
        <Container className="mt-5">
            <h2 className="mb-4 fw-bold" style={{ color: '#4F46E5' }}>📘 Subjects</h2>
            <Row className="g-4">
                {subjects.map((subject) => (
                    <Col md={4} key={subject.id}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>{subject.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {subject.branch} – {subject.year} Year
                                </Card.Subtitle>
                                <a
                                    style={{ color: '#4F46E5', borderColor: '#4F46E5' }}
                                    href={`/subject/${subject.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-primary"
                                >
                                    View Notes
                                </a>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default SubjectsGrid;
