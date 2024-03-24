import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBarComponent from "./SearchBarComponent";

describe("Search Bar Component", () => {

    it("Search Bar mounted", () => {
        render(<SearchBarComponent placeholder="example" />)
        const input = screen.getByRole("textbox");
        const button = screen.getByRole("button");
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    })

    it("Trigger onSearch event with input value", () => {
        const handler = vi.fn(
            (v) => { expect(v).toBe("test") }
        );
        render(<SearchBarComponent placeholder="example" onSearch={handler} />)
        const input: HTMLInputElement = screen.getByRole("textbox");
        const button = screen.getByRole("button");
        fireEvent.change(input, {
            target: { value: "test" }
        });
        button.click();
        expect(handler).toBeCalled()
    })
})