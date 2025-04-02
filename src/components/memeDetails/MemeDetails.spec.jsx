import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, vi, expect } from "vitest";
import MemeDetails from "./MemeDetails";
import { UserContext } from "../../contexts/UserContext";
import * as memeApi from "../../api/memeApi";

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useParams: () => ({ memeId: "1" }), 
    };
});

vi.mock("../../api/memeApi");

describe("MemeDetails", () => {
    const mockMeme = {
        objectId: "1",
        imageUrl: "https://example.com/meme.jpg",
        topText: "Top Text",
        bottomText: "Bottom Text",
        textSize: 20,
        topTextColor: "#FFFFFF",
        bottomTextColor: "#000000",
        ownerId: "user123",
    };

    const renderWithProviders = (ui, { user = null } = {}) => {
        return render(
            <UserContext.Provider value={{ ...user }}>
                <MemoryRouter initialEntries={["/memes/1"]}>
                    <Routes>
                        <Route path="/memes/:memeId" element={ui} />
                    </Routes>
                </MemoryRouter>
            </UserContext.Provider>
        );
    };

    it("renders meme details correctly", async () => {
        vi.spyOn(memeApi, "useMeme").mockReturnValue({
            meme: mockMeme,
            loading: false,
        });

        vi.spyOn(memeApi, "useDeleteMeme").mockReturnValue({
            deleteMeme: vi.fn(),
        });

        vi.spyOn(memeApi, "useLikeMeme").mockReturnValue({
            like: vi.fn(), 
        });

        renderWithProviders(<MemeDetails />);

        expect(screen.getByAltText("Meme")).toHaveAttribute("src", mockMeme.imageUrl);

        expect(screen.getByText(mockMeme.topText)).toBeInTheDocument();

        expect(screen.getByText(mockMeme.bottomText)).toBeInTheDocument();
    });
});
