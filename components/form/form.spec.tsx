import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { server } from "dh-marvel/test/server";

import userEvent from "@testing-library/user-event";
import Form from "dh-marvel/pages/checkout/[id].page";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let nextBtn: HTMLElement;

const Comics = {
  results: [
    {
      id: 82967,
      title: "Marvel Previews (2017)",
      description: "",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
        extension: "jpg",
      },
      prices: [
        {
          type: "printPrice",
          price: "0",
        },
        {
          type: "printPrice",
          price: "0",
        },
      ],
      characters: {
        items: [
          {
            name: "Hulk",
            resourceURI:
              "http://gateway.marvel.com/v1/public/characters/1009351",
          },
        ],
      },
    },
  ],
};

describe("Cita component", () => {
  beforeEach(() => {
    //@ts-ignore
    render(<Form dato={Comics} />);
    nextBtn = screen.getByRole("button", {
      name: /siguiente/i,
    });
  });

  describe("Testing default component render", () => {
    test("Should render correctly", () => {
      const personalDataElements = screen.getAllByText("Datos personales");

      expect(personalDataElements.length).toBeGreaterThan(0);

      personalDataElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });

      const addressElements = screen.getAllByText("Dirección de entrega");

      expect(addressElements.length).toBeGreaterThan(0);

      addressElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });

      const cardElements = screen.getAllByText("Datos del pago");

      expect(cardElements.length).toBeGreaterThan(0);

      cardElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });

      const title = screen.getByRole("heading", {
        name: "Marvel Previews (2017)",
      });

      expect(title).toBeInTheDocument();
    });
  });

  describe("Testing validations on first step", () => {
    test("Name should be required", async () => {
      const input = screen.getByRole("textbox", { name: /nombre/i });
      expect(input).toBeInTheDocument();

      await userEvent.clear(input);

      act(() => {
        userEvent.click(nextBtn);
      });

      await waitFor(() => {
        const errorMessage = screen.getByText("Name is required");
        expect(errorMessage).toBeInTheDocument();
      });
    });
    test("Lastname should be required", async () => {
      const input = screen.getByRole("textbox", { name: /apellido/i });
      expect(input).toBeInTheDocument();

      await userEvent.clear(input);

      act(() => {
        userEvent.click(nextBtn);
      });

      await waitFor(() => {
        const errorMessage = screen.getByText("Last name is required");
        expect(errorMessage).toBeInTheDocument();
      });
    });
    test("Email should be required", async () => {
      const input = screen.getByRole("textbox", { name: /e-mail/i });
      expect(input).toBeInTheDocument();

      await userEvent.clear(input);

      act(() => {
        userEvent.click(nextBtn);
      });

      await waitFor(() => {
        const errorMessage = screen.getByText("E-mail is required");
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe("Testing second step component render", () => {
    test("Should render correctly", async () => {
      act(() => {
        userEvent.click(nextBtn);
      });

      await waitFor(() => {
        const input = screen.getByRole("textbox", { name: /ciudad/i });
        expect(input).toBeInTheDocument();
      });
    });

    describe("Testing validations on second step", () => {
      test("Address should be required", async () => {
        act(() => {
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const input = screen.getByRole("textbox", {
            name: /dirección y número/i,
          });
          expect(input).toBeInTheDocument();
          userEvent.clear(input);
        });
        act(() => {
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const errorMessage = screen.getByText("Address is required");
          expect(errorMessage).toBeInTheDocument();
        });
      });

      test("City should be required", async () => {
        act(() => {
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const input = screen.getByRole("textbox", { name: /ciudad/i });
          expect(input).toBeInTheDocument();
          userEvent.clear(input);
        });
        act(() => {
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const errorMessage = screen.getByText("City is required");
          expect(errorMessage).toBeInTheDocument();
        });
      });

      test("State should be required", async () => {
        act(() => {
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const input = screen.getByRole("textbox", { name: /provincia/i });
          expect(input).toBeInTheDocument();
          userEvent.clear(input);
        });
        act(() => {
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const errorMessage = screen.getByText("State is required");
          expect(errorMessage).toBeInTheDocument();
        });
      });

      test("Zip code should be required", async () => {
        act(() => {
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const input = screen.getByRole("textbox", { name: /cod postal/i });
          expect(input).toBeInTheDocument();
          userEvent.clear(input);
        });
        act(() => {
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const errorMessage = screen.getByText("Zip code is required");
          expect(errorMessage).toBeInTheDocument();
        });
      });
    });
  });

  describe("Testing third step component render", () => {
    test("Should render correctly", async () => {
      act(() => {
        userEvent.click(nextBtn);
        userEvent.click(nextBtn);
      });

      await waitFor(() => {
        const btn = screen.getByRole("button", { name: /comprar/i });
        expect(btn).toBeInTheDocument();
      });
    });

    describe("Testing validations on third step", () => {
      test("Card name should be required", async () => {
        act(() => {
          userEvent.click(nextBtn);
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const input = screen.getByRole("textbox", {
            name: /nombre como aparece en la tarjeta/i,
          });
          expect(input).toBeInTheDocument();
          userEvent.clear(input);
        });
        act(() => {
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const errorMessage = screen.getByText("Card name is required");
          expect(errorMessage).toBeInTheDocument();
        });
      });

      test("Card number should be required", async () => {
        act(() => {
          userEvent.click(nextBtn);
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const input = screen.getByRole("textbox", {
            name: /número de tarjeta/i,
          });
          expect(input).toBeInTheDocument();
          userEvent.clear(input);
        });
        act(() => {
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const errorMessage = screen.getByText("Card number is required");
          expect(errorMessage).toBeInTheDocument();
        });
      });

      test("Expiration date should be required", async () => {
        act(() => {
          userEvent.click(nextBtn);
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const input = screen.getByRole("textbox", { name: "Exp MM/YY" });
          expect(input).toBeInTheDocument();
          userEvent.clear(input);
        });
        act(() => {
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const errorMessage = screen.getByText("Expiration date is required");
          expect(errorMessage).toBeInTheDocument();
        });
      });

      test("CVC should be required", async () => {
        act(() => {
          userEvent.click(nextBtn);
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const input = screen.getByLabelText("CVC");
          expect(input).toBeInTheDocument();
          userEvent.clear(input);
        });
        act(() => {
          userEvent.click(nextBtn);
        });

        await waitFor(() => {
          const errorMessage = screen.getByText("CVC is required");
          expect(errorMessage).toBeInTheDocument();
        });
      });
    });
  });
});
