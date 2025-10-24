import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNotesBySubject } from '../services/supabaseService';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function SubjectDetails() {
    const { id } = useParams();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const loadNotes = async () => {
            const data = await fetchNotesBySubject(id);
            setNotes(data);
        };
        loadNotes();
    }, [id]);

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-primary fw-bold">📄 Notes</h2>
            <Row className="g-4">
                {notes.map((note) => (
                    <Col md={6} key={note.id}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>{note.title}</Card.Title>
                                <Card.Text className="text-muted">
                                    Uploaded by: {note.uploaded_by}<br />
                                    Uploaded at: {new Date(note.uploaded_at).toLocaleString()}
                                </Card.Text>
                                <div className="d-flex gap-2">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => window.open(note.file_url, '_blank')}
                                    >
                                        View PDF
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = note.file_url;
                                            link.download = note.title + '.pdf';
                                            link.click();
                                        }}
                                    >
                                        Download PDF
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default SubjectDetails;
