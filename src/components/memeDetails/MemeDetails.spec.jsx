import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, vi, expect } from "vitest";
import MemeDetails from "./MemeDetails";
import { UserContext } from "../../contexts/UserContext";
import * as memeApi from "../../api/memeApi";


// Mock react-router
vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useParams: () => ({ memeId: "1" }), // Mock useParams to return a specific memeId
    };
});

// Mock API
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
                        <Route path="/catalog" element={<div>Catalog Page</div>} />
                    </Routes>
                </MemoryRouter>
            </UserContext.Provider>
        );
    };

    // it("renders meme details correctly", async () => {
    //     vi.spyOn(memeApi, "useMeme").mockReturnValue({
    //         meme: mockMeme,
    //         loading: false,
    //     });

    //     renderWithProviders(<MemeDetails />);

    //     expect(screen.getByAltText("Meme")).toHaveAttribute("src", mockMeme.imageUrl);
    //     expect(screen.getByText(mockMeme.topText)).toBeInTheDocument();
    //     expect(screen.getByText(mockMeme.bottomText)).toBeInTheDocument();
    // });

    // it("shows delete button for meme owner", async () => {
    //     vi.spyOn(memeApi, "useMeme").mockReturnValue({
    //         meme: mockMeme,
    //         loading: false,
    //     });

    //     renderWithProviders(<MemeDetails />, { user: { objectId: "user123" } });

    //     expect(screen.getByText("Delete")).toBeInTheDocument();
    // });

    // it("does not show delete button for non-owner", async () => {
    //     vi.spyOn(memeApi, "useMeme").mockReturnValue({
    //         meme: mockMeme,
    //         loading: false,
    //     });

    //     renderWithProviders(<MemeDetails />, { user: { objectId: "user456" } });

    //     expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    // });

    it("deletes meme and navigates to catalog", async () => {
        vi.spyOn(memeApi, "useMeme").mockReturnValue({
            meme: mockMeme,
            loading: false,
        });

        const deleteMemeMock = vi.spyOn(memeApi, "useDeleteMeme").mockReturnValue({
            deleteMeme: () => vi.fn().mockResolvedValue(),
        });

        renderWithProviders(<MemeDetails />, { user: { objectId: "user123" } }); // Ensure objectId matches mockMeme.ownerId

        // Use a custom matcher to find the "Delete" button
        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(deleteMemeMock).toHaveBeenCalledWith(mockMeme);
        });

        expect(screen.getByText("Meme Catalog")).toBeInTheDocument();
    });
});

// Първоначалното зареждане е бавно, защото зарежда всички компоненти - за оптимизация може да се използва lazy loading
// Подредба на импортите
// Не дублирай импорти
// При рутиране от страницата за логин към страницата за регистрация не се сменя стейта в навигацията и обратно
// Картинките на резолюция телефон са твърде малки
// Страниците за За Нас и КОнтакти са празни
// При запазване на се показват надписите.
// Logged in users – create records and request to the REST API, interaction with the records (via Likes, Dislikes, Comments, etc.) 
// Когато едитваш би било добре да има и бутон назад
// Едит не работи от първия път
// Нарочно ли не е пушнат package-lock.json
// Добавяне на env файлове за DEV и PROD - const baseUrl = 'https://parseapi.back4app.com/classes'
/* Избягване на повторения - извеждане на константи
    const headers = {
        'X-Parse-Revocable-Session': 1
    }
*/
// Консистентно използване на async/await или callbacks
// Използване на мемоизиращи функции за променливи и функции
// Да обсъдим употребата на usePersistedState заради чувствителна информация
// Изчистване на излишни логове в конзолата при тестове
// При страницирането, ако сме на страница 2 -> влезем на Меме -> back на browser -> се връщаме на 1 страница
// Добавяне на eslint правила или pritierc конфигурация за подобряване на качеството на кода
// Като структура, може да се добави папка pages, в която се намират компонентите свързани със съответната страница
// components може да съдържа компоненти споделени и използвани глобално
// Да се уеднаквят картинките, като размер