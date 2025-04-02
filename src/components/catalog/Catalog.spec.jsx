import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import requestMock from "../../tests/mocks/requestMock.js";
import Catalog from "./Catalog.jsx";

describe('Catalog', () => {
    it('renders the catalog component', () => {
        requestMock.get.mockResolvedValue({ results: [] });
        render(<Catalog />);

        expect(screen.getByText('Meme Catalog')).toBeInTheDocument();
        const spinner = document.querySelector('.spinner-container');
        expect(spinner).toBeInTheDocument();
    });

    it('shows memes', async () => {
        const memes = {
            results: [
                { objectId: '1', imageUrl: 'https://example.com/meme1.jpg', topText: 'Top 1', bottomText: 'Bottom 1', textSize: 20, topTextColor: '#FFFFFF', bottomTextColor: '#000000', ownerId: '1', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-01T00:00:00Z' },
                { objectId: '2', imageUrl: 'https://example.com/meme2.jpg', topText: 'Top 2', bottomText: 'Bottom 2', textSize: 20, topTextColor: '#FFFFFF', bottomTextColor: '#000000', ownerId: '2', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-01T00:00:00Z' },
                { objectId: '3', imageUrl: 'https://example.com/meme3.jpg', topText: 'Top 3', bottomText: 'Bottom 3', textSize: 20, topTextColor: '#FFFFFF', bottomTextColor: '#000000', ownerId: '3', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-01T00:00:00Z' },
            ],
            count: 12
        };

        requestMock.get.mockResolvedValue(memes);

        render(<Catalog />);

        await waitFor(() => {
            const images = screen.getAllByRole('img', { name: 'Meme' });
            expect(images).toHaveLength(3);
        });

        expect(screen.getByText('Top 1')).toBeInTheDocument();
        expect(screen.getByText('Top 2')).toBeInTheDocument();
        expect(screen.getByText('Top 3')).toBeInTheDocument();
    });

    it('handles pagination', async () => {
        const memesPage1 = {
            results: [
                { objectId: '1', imageUrl: 'https://example.com/meme1.jpg', topText: 'Top 1', bottomText: 'Bottom 1', textSize: 20, topTextColor: '#FFFFFF', bottomTextColor: '#000000', ownerId: '1', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-01T00:00:00Z' },
                { objectId: '2', imageUrl: 'https://example.com/meme2.jpg', topText: 'Top 2', bottomText: 'Bottom 2', textSize: 20, topTextColor: '#FFFFFF', bottomTextColor: '#000000', ownerId: '2', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-01T00:00:00Z' },
            ],
            count: 4
        };

        const memesPage2 = {
            results: [
                { objectId: '3', imageUrl: 'https://example.com/meme3.jpg', topText: 'Top 3', bottomText: 'Bottom 3', textSize: 20, topTextColor: '#FFFFFF', bottomTextColor: '#000000', ownerId: '3', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-01T00:00:00Z' },
                { objectId: '4', imageUrl: 'https://example.com/meme4.jpg', topText: 'Top 4', bottomText: 'Bottom 4', textSize: 20, topTextColor: '#FFFFFF', bottomTextColor: '#000000', ownerId: '4', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-01T00:00:00Z' },
            ],
            count: 4
        };

        requestMock.get
            .mockResolvedValueOnce(memesPage1)

        render(<Catalog />);

        await waitFor(() => {
            const images = screen.getAllByRole('img', { name: 'Meme' });
            expect(images).toHaveLength(2);
        });

        expect(screen.getByText('Top 1')).toBeInTheDocument();
        expect(screen.getByText('Top 2')).toBeInTheDocument();

        const nextPageButton = screen.getByLabelText('right');
        fireEvent.click(nextPageButton);

        requestMock.get
            .mockResolvedValueOnce(memesPage2)

        render(<Catalog />);
        
        await waitFor(() => {
            const images = screen.getAllByRole('img', { name: 'Meme' });
            expect(images).toHaveLength(2);
        });

        expect(screen.getByText('Top 3')).toBeInTheDocument();
        expect(screen.getByText('Top 4')).toBeInTheDocument();
    });
});
