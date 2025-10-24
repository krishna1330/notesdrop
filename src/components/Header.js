import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header() {
    return (
        <Navbar
            expand="lg"
            variant="dark"
            style={{
                background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
                color: 'white',
            }}
        >
            <Container fluid className="px-4">
                <Navbar.Brand
                    href="/"
                    style={{
                        fontWeight: 'bold',
                        fontSize: '1.6rem',
                        marginLeft: '-10px', // nudges title slightly left
                    }}
                >
                    📚 Notes Drop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/notes" style={{ color: 'white', fontWeight: '500' }}>
                            Notes
                        </Nav.Link>
                        <Nav.Link href="/login" style={{ color: 'white', fontWeight: '500' }}>
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
