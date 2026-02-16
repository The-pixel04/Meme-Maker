import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import requestMock from "../../tests/mocks/requestMock.js";
import Login from "./Login.jsx";

const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

describe("Login", () => {
    it("renders the login component", () => {
        requestMock.post.mockResolvedValue({});
        render(<Login />);

        expect(screen.getByText("Welcome Back")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    it("handles login and navigates to catalog", async () => {
        const user = { email: "testEmail@abv.com", password: "testPassword" };
        render(<Login />);

        requestMock.post.mockResolvedValue(user);
        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.change(emailInput, { target: { value: user.email } });
        fireEvent.change(passwordInput, { target: { value: user.password } });

        const form = document.querySelector("form");
        fireEvent.submit(form);

        await waitFor(() => {
            expect(requestMock.post).toHaveBeenCalledWith(
                expect.anything(),
                { email: user.email, password: user.password },
                expect.anything(),
            );
        });

        expect(mockNavigate).toHaveBeenCalledWith("/catalog");
    });

    it("does nothing when login fails", async () => {
        const user = { email: "invalid@example.com", password: "wrongpassword" };
        render(<Login />);

        requestMock.post.mockResolvedValue(null);

        fireEvent.change(screen.getByLabelText("Email"), { target: { value: user.email } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: user.password } });

        fireEvent.submit(document.querySelector("form"));

        await waitFor(() => {
            expect(requestMock.post).toHaveBeenCalledWith(
                expect.anything(),
                { email: "invalid@example.com", password: "wrongpassword" },
                expect.objectContaining({
                    headers: expect.objectContaining({
                        "X-Parse-Revocable-Session": 1,
                    }),
                    signal: expect.any(Object),
                }),
            );
        });

        expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    });
});
