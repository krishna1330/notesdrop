import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

function Home() {
    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
            {/* Hero Section */}
            <div className="py-5 border-bottom shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                <Container>
                    <h1 className="display-4 mb-3 fw-bold" style={{ color: '#4F46E5' }}>📚 Welcome to Notes Drop</h1>
                    <p className="lead text-dark">
                        Your classroom’s digital library. Upload, explore, and download notes shared by your peers.
                    </p>
                    <Button style={{
                        background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
                        color: 'white',
                        border: 'none',
                    }} size="lg" className="mt-3">
                        Upload Notes
                    </Button>
                </Container>
            </div>

            {/* Features Section */}
            <Container className="mt-5">
                <Row className="g-4">
                    <Col md={4}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body>
                                <Card.Title style={{ color: '#4F46E5' }}>📤 Easy Upload</Card.Title>
                                <Card.Text>
                                    Upload PDFs with subjects and tags to keep everything organized and searchable.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body>
                                <Card.Title style={{ color: '#4F46E5' }}>🔍 Smart Search</Card.Title>
                                <Card.Text>
                                    Browse notes by subject, uploader, or keywords. Find what you need in seconds.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body>
                                <Card.Title style={{ color: '#4F46E5' }}>🛡️ Admin Control</Card.Title>
                                <Card.Text>
                                    Admins keep the library clean and relevant by managing uploads and user activity.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            {/* <footer className="text-center mt-5 py-4" style={{ backgroundColor: '#4F46E5', color: 'white' }}>
                <p>© 2025 NotesDrop. Built for students, by students.</p>
            </footer> */}
        </div>
    );
}

export default Home;
