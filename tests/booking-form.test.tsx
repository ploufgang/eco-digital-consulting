import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { BookingForm } from "@/components/booking-form";

describe("BookingForm", () => {
  it("bloque le passage à l’étape suivante tant que les champs requis sont vides", async () => {
    const user = userEvent.setup();
    render(<BookingForm calUrl={null} />);
    await user.click(screen.getByRole("button", { name: /continuer/i }));
    expect(await screen.findByText("Indiquez votre nom")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Faisons connaissance." })).toBeInTheDocument();
  });

  it("avance vers la qualification après une première étape valide", async () => {
    const user = userEvent.setup();
    render(<BookingForm calUrl={null} />);
    await user.type(screen.getByLabelText("Votre nom *"), "Alex Martin");
    await user.type(screen.getByLabelText("E-mail professionnel *"), "alex@example.com");
    await user.type(screen.getByLabelText("Organisation *"), "Atelier Exemple");
    await user.selectOptions(screen.getByLabelText("Taille de l’organisation *"), "pme");
    await user.click(screen.getByRole("button", { name: /continuer/i }));
    expect(await screen.findByRole("heading", { name: "Que souhaitez-vous améliorer ?" })).toBeInTheDocument();
  });
});
