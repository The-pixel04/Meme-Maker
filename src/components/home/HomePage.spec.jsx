import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import requestMock from "../../tests/mocks/requestMock.js";
import HomePage from "./HomePage";
import { UserContext } from "../../contexts/UserContext.js";

describe("HomePage", () => {
    it("renders the home page component", () => {
        requestMock.get.mockResolvedValue({ results: [] });
        render(<HomePage />);

        expect(screen.getByText('Create Hilarious Memes in Seconds!')).toBeInTheDocument();
        expect(screen.getByText('☝️ Choose an image URL, add your text, and share it with the world 🚀')).toBeInTheDocument();
        expect(screen.getByText('Last Memes')).toBeInTheDocument();
        expect(screen.getByText('How It Works')).toBeInTheDocument();
        expect(screen.getByText('1. Upload an Image')).toBeInTheDocument();
        expect(screen.getByText('2. Add Text')).toBeInTheDocument();
        expect(screen.getByText('3. Customize')).toBeInTheDocument();
        expect(screen.getByText('4. Save & Share')).toBeInTheDocument();
    });

    it('show memes', async () => {
        const last3Memes = [
            { objectId: '1', imageUrl: 'https://example.com/meme1.jpg', topText: 'Top 1', bottomText: 'Bottom 1', textSize: 20, topTextColor: '#FFFFFF', bottomTextColor: '#000000', ownerId: '1', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-01T00:00:00Z' },
            { objectId: '2', imageUrl: 'https://example.com/meme2.jpg', topText: 'Top 2', bottomText: 'Bottom 2', textSize: 20, topTextColor: '#FFFFFF', bottomTextColor: '#000000', ownerId: '2', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-01T00:00:00Z' },
            { objectId: '3', imageUrl: 'https://example.com/meme3.jpg', topText: 'Top 3', bottomText: 'Bottom 3', textSize: 20, topTextColor: '#FFFFFF', bottomTextColor: '#000000', ownerId: '3', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-01T00:00:00Z' },
        ];

        requestMock.get.mockResolvedValue({ results: last3Memes });


        render(<HomePage />);

        await waitFor(() => {
            const images = screen.getAllByRole('img');
            expect(images).toHaveLength(3);
        });;

        expect(screen.getByText('Top 1')).toBeInTheDocument();
        expect(screen.getByText('Top 2')).toBeInTheDocument();
        expect(screen.getByText('Top 3')).toBeInTheDocument();
    });

    it("renders the button in the banner when the user is logged in", () => {
        const mockUser = { objectId: "123", username: "Test User", sessionToken: "valid-token" };

        render(
            <UserContext.Provider value={mockUser}>
                <HomePage />
            </UserContext.Provider>
        );

        const button = screen.getByRole('button', { name: 'Create a Meme Now' });

        expect(button).toBeInTheDocument();

        fireEvent.click(button);


    });

    it("does not render the button in the banner when no user is logged in", () => {

        vi.mock("../../context/UserContext", () => ({
            useUser: () => ({ sessionToken: null }),
        }));

        render(<HomePage />);

        const button = screen.queryByRole('button', { name: 'Create a Meme Now' });
        expect(button).not.toBeInTheDocument();
    });

})