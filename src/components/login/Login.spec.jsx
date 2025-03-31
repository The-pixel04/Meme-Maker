import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import requestMock from "../../tests/mocks/requestMock.js";
import Login from "./Login.jsx";

// Mock useNavigate from react-router
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

describe('Login', () => {
    it('renders the login component', () => {
        requestMock.post.mockResolvedValue({});
        render(<Login />);

        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it("handles login and navigates to catalog", async () => {
        const user = { email: "testEmail@abv.com", password: "testPassword" };
        render(<Login />);

        requestMock.post.mockResolvedValue(user);

        // Fill in the form fields
        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.change(emailInput, { target: { value: user.email } });
        fireEvent.change(passwordInput, { target: { value: user.password } });

        // Submit the form
        const form = document.querySelector("form");
        fireEvent.submit(form);

        // Wait for the mock request to be called and navigation to occur
        await waitFor(() => {
            expect(requestMock.post).toHaveBeenCalledWith(
                expect.anything(),
                { email: user.email, password: user.password },
                expect.anything()
            );
        });

        // Verify navigation
        expect(mockNavigate).toHaveBeenCalledWith("/catalog");
    });

    it("does nothing when login fails", async () => {
        const user = { email: "invalid@example.com", password: "wrongpassword" };
        render(<Login />);

        // Mock the request to return null (simulate login failure)
        requestMock.post.mockResolvedValue(null);

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText("Email"), { target: { value: user.email } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: user.password } });

        // Submit the form
        fireEvent.submit(document.querySelector("form"));

        // Wait for the mock request to be called
        await waitFor(() => {
            expect(requestMock.post).toHaveBeenCalledWith(
                expect.anything(),
                { email: "invalid@example.com", password: "wrongpassword" },
                expect.objectContaining({
                    headers: expect.objectContaining({
                        "X-Parse-Revocable-Session": 1,
                    }),
                    signal: expect.any(Object),
                })
            );
        });

        // Verify no navigation
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    });
});